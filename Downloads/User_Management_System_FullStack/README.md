# User Management System - Full Stack Application

## 🎯 Project Overview
A comprehensive full-stack web application for managing users and their addresses with complete CRUD operations.

### Technology Stack
- **Backend**: Java Spring Boot 3.2.0
- **Frontend**: React 18.2.0
- **Database**: MySQL
- **Build Tools**: Maven (Backend), npm (Frontend)

## 📋 Features
- ✅ Complete CRUD operations for Users
- ✅ Complete CRUD operations for Addresses
- ✅ One-to-Many relationship (One User → Multiple Addresses)
- ✅ Responsive UI design
- ✅ Form validation
- ✅ Error handling
- ✅ RESTful API architecture

## 🗄️ Database Schema

### UserMaster Table
- `user_id` (Primary Key, Auto Increment)
- `user_name` (Unique, Not Null)
- `user_password` (Not Null)
- `user_phone_number` (10 digits, Not Null)
- `date_of_registration` (Auto-generated)
- `status` (ACTIVE/INACTIVE/SUSPENDED)

### UserAddresses Table
- `address_id` (Primary Key, Auto Increment)
- `user_id` (Foreign Key → UserMaster)
- `full_address` (TEXT, Not Null)
- `address_type` (HOME/OFFICE/OTHER)

## 🚀 Setup Instructions

### Prerequisites
1. **Java JDK 17** or higher
2. **Maven 3.6+**
3. **Node.js 16+** and npm
4. **MySQL 8.0+**

### Database Setup

1. Install MySQL and start the MySQL service

2. Create database (automatically created by application):
```sql
-- The application will create this automatically with spring.jpa.hibernate.ddl-auto=update
-- Database name: user_management_db
```

3. Update database credentials in `backend-springboot/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend-springboot
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 🌐 API Endpoints

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `GET /api/users/status/{status}` - Get users by status

### Address Endpoints
- `GET /api/addresses` - Get all addresses
- `GET /api/addresses/{id}` - Get address by ID
- `GET /api/addresses/user/{userId}` - Get addresses by user ID
- `POST /api/addresses` - Create new address
- `PUT /api/addresses/{id}` - Update address
- `DELETE /api/addresses/{id}` - Delete address

## 📱 Using the Application

### Creating a User
1. Open the application at `http://localhost:3000`
2. Fill in the user form with:
   - Username (unique)
   - Password
   - Phone Number (10 digits)
   - Status (ACTIVE/INACTIVE/SUSPENDED)
3. Optionally add addresses
4. Click "Create User"

### Managing Addresses
1. Switch to the "Addresses" tab
2. Select a user from the dropdown
3. Enter full address and address type
4. Click "Add Address"

### Editing and Deleting
- Click "Edit" button to modify records
- Click "Delete" button to remove records

## 🌍 Deployment

### Option 1: Deploy on AWS

#### Backend (AWS Elastic Beanstalk)
1. Create JAR file:
```bash
cd backend-springboot
mvn clean package
```

2. Deploy the JAR from `target/usermanagement-0.0.1-SNAPSHOT.jar` to Elastic Beanstalk

3. Configure environment variables for database connection

#### Frontend (AWS S3 + CloudFront)
1. Build production version:
```bash
cd frontend-react
npm run build
```

2. Upload `build` folder contents to S3 bucket
3. Configure CloudFront distribution

### Option 2: Deploy on Heroku

#### Backend
1. Create `Procfile`:
```
web: java -jar target/usermanagement-0.0.1-SNAPSHOT.jar
```

2. Deploy:
```bash
git init
heroku create your-app-name
git add .
git commit -m "Initial commit"
git push heroku main
```

#### Frontend
1. Update API URL in `src/services/api.js`
2. Build and deploy to Netlify or Vercel

### Option 3: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Security Considerations

### Important for Production:
1. **Password Encryption**: Implement BCrypt password hashing
2. **JWT Authentication**: Add Spring Security with JWT
3. **CORS Configuration**: Restrict origins in production
4. **Input Validation**: Already implemented with Jakarta Validation
5. **SQL Injection Prevention**: Using JPA prevents SQL injection
6. **HTTPS**: Use SSL certificates in production

## 🎨 UI Features
- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Modern gradient theme
- ✅ Form validation with error messages
- ✅ Success/Error alerts
- ✅ Smooth transitions and animations
- ✅ User-friendly interface

## 🧪 Testing the Application

### Manual Testing Checklist:
1. ✅ Create a new user with addresses
2. ✅ View all users in the table
3. ✅ Edit user information
4. ✅ Delete a user
5. ✅ Add address for existing user
6. ✅ Edit address
7. ✅ Delete address
8. ✅ Test form validation
9. ✅ Test responsive design on different screen sizes

## 📊 Interview Preparation Tips

### Key Points to Demonstrate:

1. **Architecture Understanding**
   - Explain MVC pattern
   - Describe REST API design
   - Explain database relationships

2. **Code Quality**
   - Clean code structure
   - Proper naming conventions
   - Error handling
   - Validation

3. **Features to Highlight**
   - CRUD operations
   - Responsive design
   - Form validation
   - User experience

4. **Potential Improvements You Can Discuss**
   - Password encryption (BCrypt)
   - JWT authentication
   - Pagination for large datasets
   - Search and filter functionality
   - File upload for user profiles
   - Email notifications
   - Audit logging

### Questions You Might Be Asked:

1. **Why did you choose these technologies?**
   - Spring Boot: Industry standard, rapid development
   - React: Component-based, efficient rendering
   - MySQL: Reliable, widely used RDBMS

2. **How would you secure this application?**
   - Implement Spring Security
   - Add JWT tokens
   - Encrypt passwords with BCrypt
   - Use HTTPS
   - Implement rate limiting

3. **How would you handle large amounts of data?**
   - Implement pagination
   - Add database indexing
   - Use caching (Redis)
   - Optimize queries

4. **How would you make this production-ready?**
   - Add comprehensive logging
   - Implement monitoring
   - Add unit and integration tests
   - Set up CI/CD pipeline
   - Configure proper error pages

## 📝 Notes
- Backend runs on port 8080
- Frontend runs on port 3000
- Database: user_management_db
- All APIs use JSON format
- CORS is enabled for development

## 🆘 Troubleshooting

### Backend Issues:
- **Port 8080 already in use**: Kill the process or change port in application.properties
- **Database connection error**: Check MySQL is running and credentials are correct
- **Build errors**: Ensure Java 17+ and Maven are properly installed

### Frontend Issues:
- **npm install fails**: Try `npm cache clean --force` then reinstall
- **API calls fail**: Ensure backend is running on port 8080
- **Port 3000 in use**: Stop other React applications or use different port

## 📧 Contact
Good luck with your interview! 🎯

---
**Created for PCT Interview - December 2025**
