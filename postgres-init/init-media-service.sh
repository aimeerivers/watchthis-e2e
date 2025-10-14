#!/bin/bash
set -e

echo "🔧 Initializing PostgreSQL database for media-service..."


# Create database for the media-service

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create database
    CREATE DATABASE watchthis_media WITH OWNER watchthis;
EOSQL

echo "✅ Database initialized successfully for media-service"
