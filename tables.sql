CREATE TABLE urls (
    id VARCHAR(32) PRIMARY KEY,
    url TEXT,
    created BIGINT
); 

CREATE TABLE clicks (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    country VARCHAR(3),
    timestamp BIGINT,
    link VARCHAR(32),
    FOREIGN KEY (link) REFERENCES urls(id) ON DELETE CASCADE
);

CREATE TABLE sessions (
    id TEXT,
    expiresAT BIGINT
);