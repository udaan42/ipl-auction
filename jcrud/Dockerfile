FROM gradle:6.8.2-jdk8 AS build

# copy source to build
COPY . /home/gradle/src
WORKDIR /home/gradle/src

# build java application
RUN gradle build --no-daemon

FROM openjdk:8-jre-slim

EXPOSE 8080

RUN mkdir /app

# copy jar from build context
COPY --from=build /home/gradle/src/build/libs/*.jar /app/jcrud.jar

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-jar","/app/jcrud.jar"]
