FROM eclipse-temurin:25-jdk

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl make \
    && rm -rf /var/lib/apt/lists/*
