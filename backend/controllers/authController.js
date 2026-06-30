import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../models/db.js';

function signToken(user){
    return jwt.sign(
        {id:user.id,email:user.email,name:user.name,role:'user'},
        process.env.JWT_SECRET,
        { expiresIn:process.env.JWT_EXPIRES_IN || '7d'}
    );
}

export async function register(req,res){
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({error:'Name, email and password are required'});
        }
        if(password.length < 6){
            return res.status(400).json({error:'Password must be at least 6 characters long'});
        }
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
        if(existing.rows.length > 0){
            return res.status(409).json({error: 'Saale email is already in use'});
        }
        const passwordHash = await bcrypt.hash(password,10);
        const result = await pool.query(
            'INSERT INTO users (name,email, password_hash) VALUES ($1,$2,$3) RETURNING id, name, email, created_at',
            [name, email.toLowerCase(),passwordHash]
        );
        const user = result.rows[0];
        const token = signToken(user);
        res.status(201).json({token,user});
    } catch (err) {
        console.error(err);
        res.status(500).json({error:'IDK maybe something failed'});
    }
}

export async function login(req,res){
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:'email and password are required'});
        }
        const result = await pool.query('SELECT * FROM users WHERE email = $1',[email.toLowerCase()]);
        const user = result.rows[0];
        if(!user) return res.status(401).json({error:'Invalid email or password'});

        const valid = await bcrypt.compare(password,user.password_hash);
        if(!valid) return res.status(401).json({error:'Invalid email or password'});

        const token = signToken(user);
        res.json({
            token,
            user:{id: user.id, name: user.name, email: user.email, created_at: user.created_at},
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Login Failed'});
    }
}

export async function me(req,res){
    try {
        const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.id]);
        if(!result.rows[0]) return res.status(404).json({error: 'User not found'});
        res.json({user: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({error:'Failed to fetch profile'});
    }
}