#!/bin/bash
cd BSLTours.API && ASPNETCORE_URLS="http://0.0.0.0:5001" nohup dotnet run > ../dotnet-api.log 2>&1 &
echo "API started, check dotnet-api.log for details"