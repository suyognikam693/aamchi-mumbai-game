CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT ,
    auth_provider VARCHAR(20) NOT NULL DEFAULT 'local',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    lat NUMERIC NOT NULL,
    lng NUMERIC NOT NULL,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
);