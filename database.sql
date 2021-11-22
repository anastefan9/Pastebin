CREATE DATABASE pastebindatabase;

CREATE TABLE pastebintable(
    id SERIAL PRIMARY KEY,
    pasteTitle TEXT,
    pasteInput TEXT,
    created_at TIMESTAMP DEFAULT (NOW()) 
);
