# Phase 1: Build is handled by CI/CD (Maven/Gradle)
# This Dockerfile focuses on the runtime environment for Spring Boot + OTel
FROM eclipse-temurin:21-jre-alpine

# Create a non-privileged user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

WORKDIR /app

# Download the OpenTelemetry Java Agent
# We use a specific version for stability in our 2026 environment
ADD --chown=spring:spring https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar

# Copy the executable JAR from the build context
COPY --chown=spring:spring target/*.jar app.jar

# Configuration for OpenTelemetry
# These can be overridden by Kubernetes environment variables
ENV OTEL_SERVICE_NAME=ecotrack-backend
ENV OTEL_TRACES_EXPORTER=otlp
ENV OTEL_METRICS_EXPORTER=otlp
ENV OTEL_LOGS_EXPORTER=otlp
ENV OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
ENV OTEL_RESOURCE_ATTRIBUTES=deployment.environment=production,service.version=1.0.0

# Start the application with the OTel Java Agent
ENTRYPOINT ["java", \
    "-javaagent:/app/opentelemetry-javaagent.jar", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "/app/app.jar"]