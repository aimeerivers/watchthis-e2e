#!/bin/bash
set -e

echo "🔧 Initializing PostgreSQL database for sharing-service..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create database
    CREATE DATABASE watchthis_sharing WITH OWNER watchthis;
EOSQL

echo "✅ Database initialized successfully for sharing-service"