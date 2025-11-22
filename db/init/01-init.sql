-- Panodle v2 Database Initialization

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for difficulty levels
CREATE TYPE difficulty_level AS ENUM ('Green', 'Blue', 'Black', 'Double Black');

-- Runs table - stores all ski run information
CREATE TABLE IF NOT EXISTS runs (
    name TEXT PRIMARY KEY,
    lift TEXT NOT NULL,
    zone TEXT NOT NULL,
    difficulty difficulty_level NOT NULL,
    features TEXT[],
    length INTEGER NOT NULL,
    starting_elevation INTEGER NOT NULL,
    ending_elevation INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_runs_zone ON runs(zone);
CREATE INDEX IF NOT EXISTS idx_runs_difficulty ON runs(difficulty);
CREATE INDEX IF NOT EXISTS idx_runs_lift ON runs(lift);

-- Health check table
CREATE TABLE IF NOT EXISTS app_health (
    id SERIAL PRIMARY KEY,
    app_name VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Insert initial health record
INSERT INTO app_health (app_name, version, status)
VALUES ('Panodle', '2.0.0', 'Coming Soon')
ON CONFLICT DO NOTHING;

-- Create index
CREATE INDEX IF NOT EXISTS idx_app_health_status ON app_health(status);

-- Comments
COMMENT ON TABLE runs IS 'Ski run data from Panorama Mountain Resort';
COMMENT ON TABLE app_health IS 'Basic health check table for infrastructure testing';
