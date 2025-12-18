
# Spring Boot User Management Application

## Features
- RESTful API for User and Address management
- MySQL database integration
- JPA/Hibernate ORM
- Data validation
- CORS enabled for frontend integration
- Auto-generated timestamps

## Tech Stack
- Java 17
- Spring Boot 3.2.0
- MySQL 8.0
- JPA / Hibernate
- Maven

## Running the Application
```bash
mvn clean install
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Documentation

### User Management

#### Create User
```
POST /api/users
Content-Type: application/json

{
  "userName": "john_doe",
  "userPassword": "password123",
  "userPhoneNumber": "1234567890",
  "status": "ACTIVE",
  "addresses": [
    {
      "fullAddress": "123 Main St, City, State, ZIP",
      "addressType": "HOME"
    }
  ]
}
```

#### Get All Users
```
GET /api/users
```

#### Get User by ID
```
GET /api/users/{id}
```

#### Update User
```
PUT /api/users/{id}
```

#### Delete User
```
DELETE /api/users/{id}
```

### Address Management

#### Create Address
```
POST /api/addresses
```

#### Get All Addresses
```
GET /api/addresses
```

#### Get Addresses by User ID
```
GET /api/addresses/user/{userId}
```

#### Update Address
```
PUT /api/addresses/{id}
```

#### Delete Address
```
DELETE /api/addresses/{id}
```

## Configuration
Update database credentials in `application.properties`

