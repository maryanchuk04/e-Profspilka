Write-Host "--------------------------------------------"
Write-Host "🔥🔥🔥 Started deployment e - profspilka 🔥🔥🔥"
Write-Host ""
# Stop and remove all Docker containers
docker-compose down

# Restore changes in the current directory
git restore .

# Pull latest changes from the Git repository
git pull

# Build Docker images defined in the docker-compose.yml file
docker-compose build

# Start all Docker containers in detached mode
docker-compose up -d

Write-Host ""
Write-Host "--------------------------------------------"

Write-Host "🔥🔥🔥 Finished deployment 🔥🔥🔥"