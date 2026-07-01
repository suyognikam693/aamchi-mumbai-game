import pool from "../models/db.js";
import { uploadToCloudinary } from "../services/storage.js";

export const createPost = async(req, res) =>{
    try {
        const {lat,long} = req.body;
        const image_url = await uploadToCloudinary(req.file.buffer);

        const result = await pool.query(
                `INSERT INTO posts (image_url,lat,lng,user_id)
                VALUES ($1,$2,$3,$4) RETURNING *`,
                [image_url,lat,long,req.user.id]
        );

        res.json({success:true,post:result.rows[0]});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Upload failed"});
    }
};

export const getPost = async (req,res) =>{
    try {
        const {index} = req.params;
        const result = await pool.query(
            `SELECT * FROM posts ORDER BY created_at DESC LIMIT 1 OFFSET $1`,
            [index]
        );
        if(!result.rows.length) return res.json({finished : true});
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Failed to fetch post"});
    }
};