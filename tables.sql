-- Step 1: Create a new database user with specified credentials
CREATE USER 'VITE_DATABASE_USER'@'localhost' IDENTIFIED BY 'VITE_DATABASE_PASSWORD';

-- Step 2: Grant full access to the specified database for the new user
GRANT ALL PRIVILEGES ON VITE_DATABASE_NAME.* TO 'VITE_DATABASE_USER'@'localhost';

-- Step 3: Apply the privilege changes
FLUSH PRIVILEGES;

-- Step 4: Command to log in as the newly created user (example usage)
-- (mysql -u VITE_DATABASE_USER -p)

-- Step 5: Create the database if it doesn't exist already
CREATE DATABASE IF NOT EXISTS VITE_DATABASE_NAME;

-- Step 6: Switch to the newly created database
USE VITE_DATABASE_NAME;

-- Step 7: Create the 'urls' table to store URL data
CREATE TABLE urls (
    id VARCHAR(32) PRIMARY KEY,
    url TEXT,
    created BIGINT
);

-- Step 8: Create the 'clicks' table to track click events
CREATE TABLE clicks (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    country VARCHAR(3),
    timestamp BIGINT,
    link VARCHAR(32),
    FOREIGN KEY (link) REFERENCES urls(id) ON DELETE CASCADE
);

-- Step 9: Create the 'sessions' table to manage session data
CREATE TABLE sessions (
    id TEXT,
    expiresAT BIGINT
);
