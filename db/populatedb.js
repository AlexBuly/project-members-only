require("dotenv").config({ override: true });
const pool = require("./pool");

async function populate() {
    try {
        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS Users (
                    id SERIAL PRIMARY KEY,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    username VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    member BOOLEAN DEFAULT FALSE,
                    admin BOOLEAN DEFAULT FALSE
                );
            `
        );
        await pool.query (
            `
                CREATE TABLE Messages (
                    msg_id SERIAL PRIMARY KEY,
                    title VARCHAR(255),
                    text VARCHAR(255),
                    user_id INT,
                    FOREIGN KEY (user_id) REFERENCES Users(id),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    author TEXT
                );
            `
        );
    } catch (err) {
        console.error("Error populating DB:", err);
    } finally {
        await pool.end();
        console.log("Database populated successfully!");
    }
}

populate();