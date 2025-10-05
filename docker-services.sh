#!/bin/bash

# WatchThis E2E Docker Management Script

set -e

case "$1" in
  "up")
    echo "🚀 Starting WatchThis services (using published images)..."
    docker-compose up -d
    echo "⏳ Waiting for services to be healthy..."
    sleep 10
    docker-compose ps
    ;;

  "dev")
    echo "🚀 Starting WatchThis services (using local builds)..."
    docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d
    echo "⏳ Waiting for services to be healthy..."
    sleep 10
    docker-compose ps
    ;;
    
  "down")
    echo "🛑 Stopping WatchThis services..."
    docker-compose down
    docker-compose -f docker-compose.yml -f docker-compose.local.yml down 2>/dev/null || true
    ;;
    
  "restart")
    echo "🔄 Restarting WatchThis services (using published images)..."
    docker-compose down
    docker-compose up -d
    ;;
    
  "logs")
    if [ -z "$2" ]; then
      docker-compose logs -f
    else
      docker-compose logs -f "$2"
    fi
    ;;
    
  "status")
    echo "📊 Service Status:"
    docker-compose ps
    echo ""
    echo "🏥 Health Checks:"
    echo "Home Service: http://localhost:7279/health"
    echo "User Service: http://localhost:8583/health"
    ;;
    
  "clean")
    echo "🧹 Cleaning up everything (including volumes)..."
    docker-compose down -v
    docker-compose -f docker-compose.yml -f docker-compose.local.yml down -v 2>/dev/null || true
    docker system prune -f
    ;;

  "pull")
    echo "📥 Pulling latest images from GHCR..."
    docker pull ghcr.io/aimeerivers/watchthis-home-service:latest
    docker pull ghcr.io/aimeerivers/watchthis-user-service:latest
    echo "✅ Images updated successfully!"
    ;;

  "build")
    echo "🔨 Building services locally..."
    docker-compose -f docker-compose.yml -f docker-compose.local.yml build --no-cache
    ;;
    
  *)
    echo "WatchThis E2E Docker Management"
    echo ""
    echo "Usage: $0 {up|dev|down|restart|logs|status|clean|pull|build}"
    echo ""
    echo "Published Image Commands (Default):"
    echo "  up           - Start services using published GHCR images"
    echo "  pull         - Pull latest images from GHCR"
    echo ""
    echo "Local Development Commands:"
    echo "  dev          - Start services using local builds"
    echo "  build        - Build services from local source code"
    echo ""
    echo "General Commands:"
    echo "  down         - Stop all services"
    echo "  restart      - Restart services (using published images)"
    echo "  logs         - View logs (optionally specify service name)"
    echo "  status       - Show service status and health check URLs"
    echo "  clean        - Stop services and remove volumes"
    echo ""
    echo "Examples:"
    echo "  $0 up                              # Use published images"
    echo "  $0 dev                             # Use local builds"
    echo "  $0 pull                            # Update to latest images"
    echo "  $0 logs watchthis-user-service     # View specific service logs"
    echo "  $0 status                          # Check service health"
    exit 1
    ;;
esac