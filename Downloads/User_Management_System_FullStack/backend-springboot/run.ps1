# Spring Boot Startup Script for PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Starting Spring Boot Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if JAR exists
$jarPath = "target\usermanagement-0.0.1-SNAPSHOT.jar"

if (Test-Path $jarPath) {
    Write-Host "Found JAR file. Starting application..." -ForegroundColor Green
    Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    java -jar $jarPath
} else {
    Write-Host "JAR file not found. We need to build it first." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Building with Maven Wrapper..." -ForegroundColor Cyan
    .\mvnw.cmd clean package -DskipTests
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Build successful! Starting application..." -ForegroundColor Green
        Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Yellow
        Write-Host ""
        java -jar $jarPath
    } else {
        Write-Host "Build failed! Please check the error messages above." -ForegroundColor Red
        pause
    }
}
