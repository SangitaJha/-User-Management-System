@echo off
echo ========================================
echo  Starting Spring Boot Backend Server
echo ========================================
echo.

cd "%~dp0"

echo Checking Java installation...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java JDK 17 or higher
    pause
    exit /b 1
)
echo.

echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.

java -jar "%~dp0target\usermanagement-0.0.1-SNAPSHOT.jar"

if %errorlevel% neq 0 (
    echo.
    echo JAR file not found. Building the project first...
    echo.
    call "%~dp0mvnw.cmd" clean package -DskipTests
    if %errorlevel% neq 0 (
        echo Build failed!
        pause
        exit /b 1
    )
    echo.
    echo Build successful! Starting the application...
    java -jar "%~dp0target\usermanagement-0.0.1-SNAPSHOT.jar"
)

pause
