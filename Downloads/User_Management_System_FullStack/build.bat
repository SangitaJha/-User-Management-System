@echo off
echo ========================================
echo  User Management System - Build Script
echo ========================================
echo.

echo [1/3] Building Backend...
cd backend-springboot
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo Backend build failed!
    exit /b %errorlevel%
)
echo Backend build successful!
echo.

echo [2/3] Building Frontend...
cd ..\frontend-react
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependencies installation failed!
    exit /b %errorlevel%
)
call npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    exit /b %errorlevel%
)
echo Frontend build successful!
echo.

echo [3/3] Build Complete!
echo.
echo Backend JAR: backend-springboot\target\usermanagement-0.0.1-SNAPSHOT.jar
echo Frontend Build: frontend-react\build\
echo.
echo ========================================
echo  Ready for Deployment!
echo ========================================
cd ..
