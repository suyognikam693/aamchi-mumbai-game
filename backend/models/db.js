import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool(
    process.env.DATABASE_URL 
    ? { connectionString : process.env.DATABASE_URL}
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'aamchi_mumbai',
    }
);

pool.on('error',(err) =>{
    console.error("Unexpected pg pool error",err);
});

export default pool;