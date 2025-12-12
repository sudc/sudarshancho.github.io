@echo off
echo Starting TripSaver Local Server...
echo.
echo Opening browser at http://localhost:8000/standalone-index.html
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
start http://localhost:8000/standalone-index.html
python -m http.server 8000

pause
