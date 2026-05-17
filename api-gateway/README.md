# User Service - AI Interview Coach Platform

The User Service is responsible for handling authentication and authorization in the AI-Powered Interview Coach Platform.

It provides:

* User Registration
* User Login
* JWT Token Generation
* Secure Authentication
* Password Encryption

---

# Tech Stack

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* MongoDB
* Gradle
* Docker
* Lombok

---

# Features

* Secure JWT-based authentication
* BCrypt password encryption
* REST APIs for login and registration
* MongoDB integration
* Stateless authentication using Spring Security
* Dockerized microservice architecture

---

# Project Structure

```text
user-service/
│
├── src/main/java/com/interviewcoach/user_service/
│   │
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   ├── security/
│   ├── config/
│   └── UserServiceApplication.java
│
├── src/main/resources/
│   └── application.properties
│
├── Dockerfile
├── build.gradle
└── README.md
```

---

# API Endpoints

## Register User

### Endpoint

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Sreekanth",
  "email": "user@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "token": "jwt-token"
}
```

---

## Login User

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "token": "jwt-token"
}
```



# Security Configuration

The service uses:

* Spring Security
* JWT Filter
* Stateless Authentication
* BCrypt Password Encoder

---

# Build & Run Locally

## Step 1 - Clone Repository

```bash
git clone <your-repository-url>
```

---

## Step 2 - Navigate to User Service

```bash
cd user-service
```

---

## Step 3 - Build Project

```bash
./gradlew build
```

---

## Step 4 - Run Application

```bash
./gradlew bootRun
```

---

# Running with Docker

## Build Docker Image

```bash
docker build -t user-service .
```

---

## Run Docker Container

```bash
docker run -p 8081:8081 user-service
```

---

# Dockerfile

```dockerfile
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY build/libs/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

# Authentication Flow

```text
1. User Registers / Logs In
        ↓
2. JWT Token Generated
        ↓
3. Frontend Stores Token
        ↓
4. Token Sent in Authorization Header
        ↓
5. Spring Security Validates Token
```

---

# Testing APIs

You can test APIs using:

* Postman
* Swagger
* Thunder Client

---

# Sample Authorization Header

```http
Authorization: Bearer your-jwt-token
```

---

# Future Improvements

* Refresh Tokens
* OAuth2 Login
* Role-Based Access Control (RBAC)
* Email Verification
* Forgot Password Flow
* Rate Limiting

---