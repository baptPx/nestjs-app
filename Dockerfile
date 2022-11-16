FROM node:18

# Set the working directory to /app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --force

# Copy the current directory contents into the container at /app
COPY src src

RUN npm run build
EXPOSE 3000

CMD ["node", "dist/main.js"]