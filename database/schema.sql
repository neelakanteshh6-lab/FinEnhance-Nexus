CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_sectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (sector_id) REFERENCES sectors(id),
    UNIQUE(user_id, sector_id)
);

INSERT OR IGNORE INTO sectors (name) VALUES
('Banking'),
('Financial Services'),
('Insurance'),
('Information Technology'),
('Software & Services'),
('Pharmaceuticals'),
('Healthcare'),
('Automobiles'),
('Auto Components'),
('Oil & Gas'),
('Power'),
('Renewable Energy'),
('Metals & Mining'),
('Chemicals'),
('Petrochemicals'),
('Construction'),
('Infrastructure'),
('Real Estate'),
('Cement'),
('Consumer Durables'),
('Fast Moving Consumer Goods'),
('Retail'),
('Telecommunications'),
('Media & Entertainment'),
('Textiles'),
('Logistics'),
('Transportation'),
('Aviation'),
('Railways'),
('Defence'),
('Aerospace'),
('Capital Goods'),
('Engineering'),
('Electrical Equipment'),
('Electronics'),
('Food & Beverages'),
('Agriculture'),
('Fertilizers'),
('Paper & Packaging'),
('Hospitality'),
('Travel & Tourism'),
('Education'),
('Internet & E-Commerce'),
('Technology Hardware'),
('Industrial Manufacturing'),
('Trading'),
('Diversified'),
('Utilities');