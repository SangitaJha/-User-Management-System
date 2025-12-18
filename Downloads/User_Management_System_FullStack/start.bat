@echo off
echo ========================================
echo  User Management System - Start Script
echo ========================================
echo.
echo This will start both Backend and Frontend
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Make sure MySQL is running!
echo.
pause

echo Starting Backend...
start cmd /k "cd backend-springboot && mvn spring-boot:run"

echo Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo Starting Frontend...
start cmd /k "cd frontend-react && npm start"

echo.
echo ========================================
echo  Application Started!
echo ========================================
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit (servers will continue running)
pause > nul
