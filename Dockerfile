FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

RUN npm install

# Copy the current directory contents into the container at /app
COPY . /app

EXPOSE 3000

CMD nest start