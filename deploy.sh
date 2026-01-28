#!/bin/bash
echo "🚀 Booting EcoTrack Build..."
./mvnw package -Pprod verify jib:dockerBuild
docker-compose -f src/main/docker/app.yml up -d --force-recreate --remove-orphans
echo "✅ App is live on port 9080"