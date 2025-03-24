#!/bin/bash

# Change to the API directory
cd BSLTours.API

# Set environment variable to force port 5001
export ASPNETCORE_URLS="http://0.0.0.0:5001"

# Run the .NET Core API
dotnet run