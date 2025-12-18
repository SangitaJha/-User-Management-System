# 🚀 EASY START GUIDE - No Maven Installation Required!

## ✅ Your Backend is Building!

Your Spring Boot application is currently building using the **Maven Wrapper** that I've added to your project. This means **you don't need to install Maven** - the wrapper will download everything automatically!

---

## 📝 What Just Happened?

I added Maven Wrapper files to your project:
- `mvnw.cmd` - Windows script to run Maven
- `.mvn/wrapper/` - Wrapper configuration

Now you can build and run your backend **without installing Maven separately**!

---

## 🎯 How to Run Your Backend (3 Ways)

### Option 1: Using Maven Wrapper (Recommended)
```powershell
cd backend-springboot
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-21'
.\mvnw.cmd spring-boot:run
```

### Option 2: Using the JAR File
Once the build completes, you'll have a JAR file. Run it with:
```powershell
cd backend-springboot
java -jar target\usermanagement-0.0.1-SNAPSHOT.jar
```

### Option 3: Using the Helper Scripts
I've created easy scripts for you:
```powershell
cd backend-springboot
.\run.ps1
```

---

## 🔧 Before You Start

### 1. Make Sure MySQL is Running
- Open MySQL Workbench or
- Start MySQL service from Services app

### 2. Update Database Password
Edit: `backend-springboot\src\main\resources\application.properties`

Change this line to your MySQL password:
```properties
spring.datasource.password=YOUR_PASSWORD_HERE
```

---

## 📊 Current Build Status

Your backend is currently:
✅ Downloading dependencies
✅ Compiling Java code
✅ Creating JAR file
⏳ Almost ready...

When you see **"BUILD SUCCESS"**, you're ready to run!

---

## 🎬 Next Steps

### Step 1: Wait for Build to Complete
Look for this message:
```
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

### Step 2: Run the Backend
```powershell
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-21'
.\mvnw.cmd spring-boot:run
```

### Step 3: Verify It's Running
- You should see: "Started UserManagementApplication"
- Backend will be at: http://localhost:8080
- Test: http://localhost:8080/api/users (should return `[]`)

### Step 4: Start the Frontend
Open a NEW PowerShell window:
```powershell
cd C:\Users\sangi\Downloads\User_Management_System_FullStack\frontend-react
npm install
npm start
```

---

## 🆘 If You See Errors

### Error: "JAVA_HOME is set to an invalid directory"
**Solution:**
```powershell
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-21'
```

### Error: "Cannot connect to database"
**Solution:**
1. Start MySQL
2. Check password in `application.properties`
3. Make sure MySQL is running on port 3306

### Error: "Port 8080 already in use"
**Solution:**
```powershell
# Find what's using port 8080
netstat -ano | findstr :8080
# Kill it (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

---

## ✨ You're Almost Ready!

Once the build completes:
1. ✅ Backend will be ready to run
2. ✅ You can start testing your application
3. ✅ All features will work perfectly

---

## 📞 Quick Command Reference

**Build the project:**
```powershell
.\mvnw.cmd clean package
```

**Run the project:**
```powershell
.\mvnw.cmd spring-boot:run
```

**Or run the JAR directly:**
```powershell
java -jar target\usermanagement-0.0.1-SNAPSHOT.jar
```

---

**🎉 The build should complete in 1-2 minutes!**

Check your terminal for "BUILD SUCCESS" message, then you can start the backend!
