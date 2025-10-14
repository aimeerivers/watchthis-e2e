#!/bin/bash
set -e

echo "🔧 Initializing PostgreSQL database for user-service..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create database
    CREATE DATABASE watchthis_user WITH OWNER watchthis;

    \c watchthis_user;

    -- Create users table if it doesn't exist
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Insert admin user (password is "AdminPassword1" hashed with bcrypt)
    INSERT INTO users (username, password) 
    VALUES ('admin', '\$2b\$10\$tUPahbdMPSHDuhlUR/mi1eRxASjBZuqI1g2QTzmDmo/A0qBctPRPS')
    ON CONFLICT (username) DO NOTHING;

    -- Verify the user was created
    SELECT COUNT(*) as admin_user_count FROM users WHERE username = 'admin';
EOSQL

echo "✅ Database initialized successfully for user-service with admin user"
