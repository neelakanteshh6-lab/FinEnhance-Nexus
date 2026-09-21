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

CREATE TABLE IF NOT EXISTS sub_sectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sector_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (sector_id) REFERENCES sectors(id),
    UNIQUE(sector_id, name)
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
('Financial Services'),
('Information Technology'),
('Healthcare'),
('Consumer'),
('Energy'),
('Automobiles'),
('Industrials'),
('Metals & Mining'),
('Chemicals'),
('Real Estate'),
('Telecommunications & Media'),
('Transportation & Logistics');

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Banking'
FROM sectors
WHERE name = 'Financial Services';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'NBFC'
FROM sectors
WHERE name = 'Financial Services';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Insurance'
FROM sectors
WHERE name = 'Financial Services';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Asset Management'
FROM sectors
WHERE name = 'Financial Services';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Stock Broking'
FROM sectors
WHERE name = 'Financial Services';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'FinTech'
FROM sectors
WHERE name = 'Financial Services';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'IT Services'
FROM sectors
WHERE name = 'Information Technology';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Software Products'
FROM sectors
WHERE name = 'Information Technology';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'IT Consulting'
FROM sectors
WHERE name = 'Information Technology';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Engineering & R&D'
FROM sectors
WHERE name = 'Information Technology';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'IT Infrastructure'
FROM sectors
WHERE name = 'Information Technology';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Pharmaceuticals'
FROM sectors
WHERE name = 'Healthcare';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Hospitals'
FROM sectors
WHERE name = 'Healthcare';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Diagnostics'
FROM sectors
WHERE name = 'Healthcare';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Biotechnology'
FROM sectors
WHERE name = 'Healthcare';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Medical Equipment'
FROM sectors
WHERE name = 'Healthcare';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'FMCG'
FROM sectors
WHERE name = 'Consumer';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Consumer Durables'
FROM sectors
WHERE name = 'Consumer';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Retail'
FROM sectors
WHERE name = 'Consumer';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Food & Beverages'
FROM sectors
WHERE name = 'Consumer';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Personal Care'
FROM sectors
WHERE name = 'Consumer';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Oil & Gas'
FROM sectors
WHERE name = 'Energy';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Power'
FROM sectors
WHERE name = 'Energy';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Renewable Energy'
FROM sectors
WHERE name = 'Energy';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Power Equipment'
FROM sectors
WHERE name = 'Energy';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Gas Distribution'
FROM sectors
WHERE name = 'Energy';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Passenger Vehicles'
FROM sectors
WHERE name = 'Automobiles';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Commercial Vehicles'
FROM sectors
WHERE name = 'Automobiles';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Two Wheelers'
FROM sectors
WHERE name = 'Automobiles';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Auto Components'
FROM sectors
WHERE name = 'Automobiles';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Electric Vehicles'
FROM sectors
WHERE name = 'Automobiles';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Capital Goods'
FROM sectors
WHERE name = 'Industrials';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Engineering'
FROM sectors
WHERE name = 'Industrials';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Construction'
FROM sectors
WHERE name = 'Industrials';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Infrastructure'
FROM sectors
WHERE name = 'Industrials';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Industrial Manufacturing'
FROM sectors
WHERE name = 'Industrials';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Steel'
FROM sectors
WHERE name = 'Metals & Mining';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Aluminium'
FROM sectors
WHERE name = 'Metals & Mining';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Copper'
FROM sectors
WHERE name = 'Metals & Mining';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Mining'
FROM sectors
WHERE name = 'Metals & Mining';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Metal Products'
FROM sectors
WHERE name = 'Metals & Mining';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Specialty Chemicals'
FROM sectors
WHERE name = 'Chemicals';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Commodity Chemicals'
FROM sectors
WHERE name = 'Chemicals';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Agrochemicals'
FROM sectors
WHERE name = 'Chemicals';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Fertilizers'
FROM sectors
WHERE name = 'Chemicals';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Petrochemicals'
FROM sectors
WHERE name = 'Chemicals';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Residential'
FROM sectors
WHERE name = 'Real Estate';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Commercial'
FROM sectors
WHERE name = 'Real Estate';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'REITs'
FROM sectors
WHERE name = 'Real Estate';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Real Estate Services'
FROM sectors
WHERE name = 'Real Estate';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Telecommunications'
FROM sectors
WHERE name = 'Telecommunications & Media';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Media'
FROM sectors
WHERE name = 'Telecommunications & Media';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Entertainment'
FROM sectors
WHERE name = 'Telecommunications & Media';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Digital Services'
FROM sectors
WHERE name = 'Telecommunications & Media';


INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Railways'
FROM sectors
WHERE name = 'Transportation & Logistics';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Aviation'
FROM sectors
WHERE name = 'Transportation & Logistics';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Shipping'
FROM sectors
WHERE name = 'Transportation & Logistics';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Logistics'
FROM sectors
WHERE name = 'Transportation & Logistics';

INSERT OR IGNORE INTO sub_sectors (sector_id, name)
SELECT id, 'Transportation Services'
FROM sectors
WHERE name = 'Transportation & Logistics';