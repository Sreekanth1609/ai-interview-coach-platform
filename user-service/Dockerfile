# Use lightweight Java 21 image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy jar file
COPY build/libs/*.jar app.jar

# Expose application port
EXPOSE 8081

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]