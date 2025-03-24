#!/bin/bash
cd BSLTours.API && nohup dotnet run > ../dotnet-api.log 2>&1 &
echo "API started, check dotnet-api.log for details"