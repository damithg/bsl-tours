#!/bin/bash

echo "Starting .NET API in the background..."
cd BSLTours.API && dotnet run > dotnet-api.log 2>&1 &
DOTNET_PID=$!
echo "API PID: $DOTNET_PID"

echo "Waiting for API to start up..."
sleep 5

echo "Testing API endpoints..."
echo "GET /api/tour-packages"
curl -s http://localhost:5001/api/tour-packages | head -n 20
echo

echo "GET /api/tour-packages/featured"
curl -s http://localhost:5001/api/tour-packages/featured | head -n 20
echo

echo "GET /api/destinations"
curl -s http://localhost:5001/api/destinations | head -n 20
echo

echo "Stopping API..."
kill $DOTNET_PID
echo "Done."