# 🚀 Quick Start Guide

## Step-by-Step Instructions to Run the Application

### Step 1: Database Setup
1. Open MySQL Workbench or MySQL Command Line
2. The database will be created automatically when you start the backend
3. Just make sure MySQL is running!

### Step 2: Configure Database Password
1. Open `backend-springboot/src/main/resources/application.properties`
2. Update the password:
   ```properties
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

### Step 3: Start Backend
Open a terminal and run:
```bash
cd backend-springboot
mvn spring-boot:run
```

Wait for this message: `Started UserManagementApplication`

### Step 4: Start Frontend
Open a NEW terminal and run:
```bash
cd frontend-react
npm install
npm start
```

The browser will automatically open to `http://localhost:3000`

### Step 5: Test the Application
1. Create a user with the form
2. Add addresses to the user
3. View all users in the table
4. Try Edit and Delete operations

## ✅ Verification Checklist
- [ ] MySQL is running
- [ ] Backend started successfully (port 8080)
- [ ] Frontend opened in browser (port 3000)
- [ ] Can create users
- [ ] Can add addresses
- [ ] Can edit and delete records

## 🎯 For Your Interview

### Before the Interview:
1. ✅ Test all CRUD operations
2. ✅ Have both backend and frontend running
3. ✅ Prepare to explain:
   - Database design
   - API endpoints
   - React component structure
   - How you handle validation

### During the Demo:
1. Show the UI and responsive design
2. Demonstrate creating a user with multiple addresses
3. Show edit and delete operations
4. Explain the code structure if asked
5. Be ready to make changes they request

### Common Changes They Might Ask:
1. Add a new field (e.g., email)
2. Add search functionality
3. Implement sorting
4. Add pagination
5. Change validation rules

## 📱 Testing on Mobile
- Open `http://YOUR_IP_ADDRESS:3000` on your phone
- The UI is fully responsive!

## 🆘 If Something Goes Wrong

### Backend won't start:
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080
# Kill the process using that port
```

### Frontend won't start:
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Database connection error:
- Check MySQL is running
- Verify username (default: root)
- Verify password in application.properties

## 🌟 Good Luck!
You've got a complete, professional application ready!
