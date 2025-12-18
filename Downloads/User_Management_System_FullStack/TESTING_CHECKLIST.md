# Pre-Interview Testing Checklist

## ⏰ 30 Minutes Before Interview

### 1. Environment Check
- [ ] MySQL Server is running
- [ ] MySQL Workbench or Command Line is accessible
- [ ] Java JDK 17 is installed
- [ ] Maven is installed
- [ ] Node.js and npm are installed
- [ ] VS Code or preferred IDE is open

### 2. Database Setup
- [ ] Open MySQL and verify connection
- [ ] Database password is set in `application.properties`
- [ ] Run `database_setup.sql` (optional - for sample data)

### 3. Start Backend
```bash
cd backend-springboot
mvn clean install
mvn spring-boot:run
```
- [ ] Backend starts without errors
- [ ] Check console for "Started UserManagementApplication"
- [ ] Test endpoint: http://localhost:8080/api/users (should return empty array [])

### 4. Start Frontend
```bash
cd frontend-react
npm install
npm start
```
- [ ] Browser opens automatically to http://localhost:3000
- [ ] No console errors in browser Developer Tools
- [ ] UI loads completely

---

## 🧪 Functional Testing

### Test 1: Create User with Addresses
1. Fill in the form:
   - Username: `test_user`
   - Password: `Test@123`
   - Phone: `9876543210`
   - Status: `ACTIVE`

2. Add two addresses:
   - Address 1: `123 Main Street, Boston, MA 02101` (HOME)
   - Address 2: `456 Business Ave, Cambridge, MA 02139` (OFFICE)

3. Click "Create User"

**Expected Results:**
- [ ] Success message appears
- [ ] User appears in the table below
- [ ] User shows "2" in the Addresses column
- [ ] Form clears after submission

### Test 2: View User Details
- [ ] Check that user appears in table with correct information
- [ ] Status badge shows "ACTIVE" in green
- [ ] Registration date is today's date

### Test 3: Edit User
1. Click "Edit" button on the created user
2. Form populates with user data
3. Change phone to: `9999999999`
4. Change status to: `INACTIVE`
5. Click "Update User"

**Expected Results:**
- [ ] Success message appears
- [ ] Changes reflect in the table
- [ ] Status badge changes to "INACTIVE" in red

### Test 4: Add Address via Addresses Tab
1. Switch to "Addresses" tab
2. Select the created user from dropdown
3. Add address: `789 Park Road, Somerville, MA 02143` (HOME)
4. Click "Add Address"

**Expected Results:**
- [ ] Success message appears
- [ ] Address appears in the addresses table
- [ ] User's address count updates to 3

### Test 5: Edit Address
1. In Addresses tab, click "Edit" on any address
2. Change address text
3. Change address type
4. Click "Update Address"

**Expected Results:**
- [ ] Success message appears
- [ ] Changes reflect in the table

### Test 6: Delete Address
1. Click "Delete" on an address
2. Confirm deletion

**Expected Results:**
- [ ] Confirmation dialog appears
- [ ] Success message after confirmation
- [ ] Address removed from table

### Test 7: Delete User
1. Go back to "Users" tab
2. Click "Delete" on a user
3. Confirm deletion

**Expected Results:**
- [ ] Confirmation dialog appears
- [ ] Success message after confirmation
- [ ] User removed from table
- [ ] All user's addresses also deleted (cascade delete)

---

## 🎨 UI/UX Testing

### Responsive Design
- [ ] Desktop view (full width) - elements properly aligned
- [ ] Resize browser to tablet size - UI adjusts appropriately
- [ ] Resize to mobile size - UI stacks vertically
- [ ] No horizontal scrollbars at any size

### Navigation
- [ ] Click between Users and Addresses tabs
- [ ] Active tab is highlighted
- [ ] Content switches correctly

### Form Validation
1. Try to submit empty user form
   - [ ] Validation messages appear

2. Enter invalid phone (e.g., "123")
   - [ ] Error message: "Phone number must be 10 digits"

3. Try to create user with existing username
   - [ ] Error message: "Username already exists"

### Visual Check
- [ ] Colors and gradients render correctly
- [ ] Buttons have hover effects
- [ ] Table rows highlight on hover
- [ ] No layout issues or overlapping elements
- [ ] Loading states display when appropriate

---

## 🔍 Database Verification

### Check MySQL
```sql
USE user_management_db;

-- Verify tables exist
SHOW TABLES;

-- Check user data
SELECT * FROM user_master;

-- Check address data
SELECT * FROM user_addresses;

-- Verify relationship
SELECT u.user_name, a.full_address 
FROM user_master u 
LEFT JOIN user_addresses a ON u.user_id = a.user_id;
```

**Expected:**
- [ ] Both tables exist
- [ ] Data is properly stored
- [ ] Foreign key relationship works
- [ ] Cascade delete worked (no orphaned addresses)

---

## 🌐 API Testing (Optional)

### Using Browser or Postman

#### Get All Users
```
GET http://localhost:8080/api/users
```
- [ ] Returns JSON array of users

#### Get User by ID
```
GET http://localhost:8080/api/users/1
```
- [ ] Returns single user object

#### Create User via API
```
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "userName": "api_test_user",
  "userPassword": "password123",
  "userPhoneNumber": "5555555555",
  "status": "ACTIVE",
  "addresses": []
}
```
- [ ] Returns created user with ID

#### Get All Addresses
```
GET http://localhost:8080/api/addresses
```
- [ ] Returns JSON array of addresses

---

## 🚨 Error Handling Testing

### Test Backend Error Handling
1. Stop backend server
2. Try to create user in frontend
   - [ ] Error message displays
   - [ ] User-friendly error (connection error)

3. Restart backend

### Test Validation Errors
1. Try invalid data
   - [ ] Errors display in UI
   - [ ] User can correct and resubmit

---

## 📱 Cross-Browser Testing (If Time Permits)

- [ ] Chrome - All features work
- [ ] Firefox - All features work
- [ ] Edge - All features work
- [ ] Safari - All features work (if Mac available)

---

## ✅ Final Verification

### Before Interview Starts:
- [ ] Both backend and frontend are running
- [ ] At least one user exists with addresses
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] Database has data
- [ ] You can perform all CRUD operations successfully

### Have Ready:
- [ ] VS Code open with code
- [ ] MySQL Workbench open
- [ ] Browser with application open (localhost:3000)
- [ ] Backend running in terminal
- [ ] Frontend running in terminal
- [ ] README.md and INTERVIEW_GUIDE.md accessible

### Documentation Check:
- [ ] README.md explains the project
- [ ] QUICKSTART.md has clear instructions
- [ ] INTERVIEW_GUIDE.md prepared for reference
- [ ] Code is clean and commented where needed

---

## 🎯 Performance Check

- [ ] Page loads in under 2 seconds
- [ ] API responses are quick (< 500ms)
- [ ] No lag when switching tabs
- [ ] Forms submit smoothly
- [ ] Tables render quickly

---

## 💡 Common Issues & Solutions

### Issue: Port 8080 already in use
**Solution:**
```bash
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Issue: Port 3000 already in use
**Solution:**
- Kill the process or use different port
- React will prompt to use 3001

### Issue: Database connection error
**Solution:**
- Check MySQL is running
- Verify password in application.properties
- Create database manually if needed

### Issue: npm install fails
**Solution:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Maven build fails
**Solution:**
```bash
mvn clean
mvn clean install -U
```

---

## 📝 Notes During Testing

Write down any observations:

**What worked well:**
_____________________________________

**What needs attention:**
_____________________________________

**Questions that came up:**
_____________________________________

---

## ✨ You're Interview Ready When:

✅ Application runs without any errors
✅ All CRUD operations work perfectly
✅ UI is responsive and looks professional
✅ Database stores data correctly
✅ You can navigate and explain your code
✅ You're confident in demonstrating features

---

## 🎉 Ready to Impress!

Once all checkboxes are marked, you're ready to ace your interview!

**Remember:**
- Stay calm and confident
- Explain your thought process
- Be honest about what you know and don't know
- Show enthusiasm for the work
- Ask questions if you don't understand something they ask

**Good luck! You've got this! 🚀**
