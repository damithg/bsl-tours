#!/bin/bash

# Change to the API directory
cd BSLTours.API

# Run the .NET Core API on port 5001 instead of 5000 to avoid conflict
dotnet run --urls="http://0.0.0.0:5001"