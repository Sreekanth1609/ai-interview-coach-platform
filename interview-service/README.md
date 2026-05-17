# Interview Service - AI Interview Coach Platform

The Interview Service powers the AI-driven mock interview engine for the AI-Powered Interview Coach Platform.

It is responsible for:

* AI Interview Question Generation
* AI Evaluation & Feedback
* Resume-Based Interview Generation
* Interview History
* Analytics Data
* MongoDB Persistence

---

# Tech Stack

* Java 21
* Spring Boot
* Spring Security
* MongoDB
* Groq AI API
* Spring WebFlux
* Apache PDFBox
* Gradle
* Docker

---

# Features

* AI-generated interview questions
* AI-based interview evaluation
* Resume PDF upload support
* Resume text extraction
* AI-generated resume-based questions
* Interview history tracking
* Analytics support
* JWT-secured APIs
* Dockerized microservice architecture

---

# Architecture

```text
Frontend UI
      ↓
API Gateway
      ↓
Interview Service
      ↓
---------------------------------
|                               |
MongoDB                    Groq AI API
```

---

# Project Structure

---

# Core Features

## 1. AI Interview Question Generation

Users can create mock interviews based on:

* Role
* Experience
* Tech Stack
* Difficulty Level
* Number of Questions

The service generates AI-powered interview questions using Groq AI.

---

## 2. AI Interview Evaluation

After completing the interview:

* Answers are submitted
* AI evaluates responses
* Score is generated
* Strengths are identified
* Improvements are suggested
* Final feedback is provided

---

## 3. Resume-Based Interview Generation

Users can upload PDF resumes.

The service:

1. Extracts text from PDF
2. Sends resume data to AI
3. Generates interview questions based on resume experience

---

# API Endpoints

---

## Create Interview

### Endpoint

```http
POST /api/interviews
```

### Request Body

```json
{
  "role": "Java Backend Developer",
  "experience": "1-3 Years",
  "techStack": "Java, Spring Boot, MongoDB",
  "difficulty": "Medium",
  "numberOfQuestions": 5
}
```

---

## Get Interview By ID

### Endpoint

```http
GET /api/interviews/{id}
```

---

## Submit Interview

### Endpoint

```http
POST /api/interviews/{id}/submit
```

### Request Body

```json
{
  "answers": [
    "Answer 1",
    "Answer 2"
  ]
}
```

---

## Get User Interview History

### Endpoint

```http
GET /api/interviews/user
```

---

## Resume Upload

### Endpoint

```http
POST /api/resume/upload
```

### Form Data

```text
file: resume.pdf
```

---

# application.properties

Create:

```text
src/main/resources/application.properties
```

Add:

```properties
spring.application.name=interview-service
server.port=8082

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/interviewcoach

# Groq API Key
GROQ_API_KEY=your-groq-api-key
```

---

# AI Integration

## Groq Model Used

```text
llama-3.1-8b-instant
```

---

# Example AI Evaluation Response

```json
{
  "score": 82,
  "strengths": [
    "Strong Spring Boot fundamentals"
  ],
  "improvements": [
    "Need deeper Kafka knowledge"
  ],
  "feedback": "Good backend understanding overall"
}
```

---

# PDF Resume Processing

The service uses:

```text
Apache PDFBox
```

for extracting text from uploaded PDF resumes.

---

# Build & Run Locally

## Step 1 - Clone Repository

```bash
git clone <your-repository-url>
```

---

## Step 2 - Navigate to Interview Service

```bash
cd interview-service
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

# Running Service

The Interview Service runs on:

```text
http://localhost:8082
```

---

# Docker Support

## Build Docker Image

```bash
docker build -t interview-service .
```

---

## Run Docker Container

```bash
docker run -p 8082:8082 interview-service
```

---

# Dockerfile

```dockerfile
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY build/libs/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

# Important Gradle Dependencies

## MongoDB

```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
```

---

## WebFlux

```gradle
implementation 'org.springframework.boot:spring-boot-starter-webflux'
```

---

## PDFBox

```gradle
implementation 'org.apache.pdfbox:pdfbox:3.0.2'
```

---

## Spring Security

```gradle
implementation 'org.springframework.boot:spring-boot-starter-security'
```

---

# Interview Flow

```text
1. User Creates Interview
        ↓
2. AI Generates Questions
        ↓
3. User Answers Questions
        ↓
4. Answers Submitted
        ↓
5. AI Evaluates Answers
        ↓
6. Score & Feedback Generated
        ↓
7. Results Stored in MongoDB
```

---

# Resume Upload Flow

```text
1. User Uploads Resume PDF
        ↓
2. PDF Text Extracted
        ↓
3. Resume Sent to AI
        ↓
4. AI Generates Questions
        ↓
5. Questions Returned to Frontend
```

---

# Error Handling

The service handles:

* Invalid Interview IDs
* Empty Resume Uploads
* Groq API Failures
* Rate Limiting Errors
* JSON Parsing Failures
* MongoDB Errors

---

# Future Improvements

* Voice Interviews
* Real-Time Coding Interviews
* Redis Caching
* Kafka Integration
* AI Speech Evaluation
* Distributed Tracing
* Kubernetes Deployment
* CI/CD using Jenkins

---
