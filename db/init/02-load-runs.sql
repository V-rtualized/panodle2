-- Load ski run data from CSV

-- Create temporary table for CSV import
CREATE TEMP TABLE runs_import (
    name TEXT,
    lift TEXT,
    zone TEXT,
    difficulty TEXT,
    features TEXT,
    length INTEGER,
    starting_elevation INTEGER,
    ending_elevation INTEGER
);

-- Copy CSV data into temporary table
COPY runs_import(name, lift, zone, difficulty, features, length, starting_elevation, ending_elevation)
FROM '/docker-entrypoint-initdb.d/data/runs.csv'
DELIMITER ','
CSV HEADER;

-- Insert or update runs from temporary table
INSERT INTO runs (name, lift, zone, difficulty, features, length, starting_elevation, ending_elevation)
SELECT
    name,
    lift,
    zone,
    difficulty::difficulty_level,
    CASE
        WHEN features IS NULL OR features = '' THEN '{}'::TEXT[]
        ELSE string_to_array(features, ', ')
    END,
    length,
    starting_elevation,
    ending_elevation
FROM runs_import
ON CONFLICT (name) DO UPDATE SET
    lift = EXCLUDED.lift,
    zone = EXCLUDED.zone,
    difficulty = EXCLUDED.difficulty,
    features = EXCLUDED.features,
    length = EXCLUDED.length,
    starting_elevation = EXCLUDED.starting_elevation,
    ending_elevation = EXCLUDED.ending_elevation,
    updated_at = NOW();

-- Clean up
DROP TABLE runs_import;
