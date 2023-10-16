CREATE TABLE IF NOT EXISTS users
(
    id BIGSERIAL NOT NULL, 
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL, 
    password VARCHAR(200) NOT NULL, 
    PRIMARY KEY (id),
    UNIQUE (email)
);
