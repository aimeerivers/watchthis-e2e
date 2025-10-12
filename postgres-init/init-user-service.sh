#!/bin/bash
set -e

echo "🔧 Initializing PostgreSQL database for user-service..."

# Create admin user in the user-service database
# The password hash corresponds to the same password as in the MongoDB init script
# $2b$10$Y3TyKRUr3W8u/dCw2826fu.v6xMWy/XAd/AA608USjnFO/IuQ.xm2 (bcrypt hash)

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
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
