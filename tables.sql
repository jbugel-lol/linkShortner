CREATE TABLE urls (
    id TEXT,
    url TEXT,
    clicks int DEFAULT 0
); 

CREATE TABLE sessions (
    id TEXT,
    expiresAT BIGINT
);