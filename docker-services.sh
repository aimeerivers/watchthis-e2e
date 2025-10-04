#!/bin/bash

# WatchThis E2E Docker Management Script

set -e

case "$1" in
  "up")
    echo "🚀 Starting WatchThis services..."
    docker-compose up -d
    echo "⏳ Waiting for services to be healthy..."
    sleep 10
    docker-compose ps
    ;;
    
  "down")
    echo "🛑 Stopping WatchThis services..."
    docker-compose down
    ;;
    
  "restart")
    echo "🔄 Restarting WatchThis services..."
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
    docker system prune -f
    ;;
    
  "build")
    echo "🔨 Building services..."
    docker-compose build --no-cache
    ;;
    
  *)
    echo "WatchThis E2E Docker Management"
    echo ""
    echo "Usage: $0 {up|down|restart|logs|status|clean|build}"
    echo ""
    echo "Commands:"
    echo "  up       - Start all services"
    echo "  down     - Stop all services"
    echo "  restart  - Restart all services"
    echo "  logs     - View logs (optionally specify service name)"
    echo "  status   - Show service status and health check URLs"
    echo "  clean    - Stop services and remove volumes"
    echo "  build    - Rebuild all services"
    echo ""
    echo "Examples:"
    echo "  $0 up"
    echo "  $0 logs watchthis-user-service"
    echo "  $0 status"
    exit 1
    ;;
esac