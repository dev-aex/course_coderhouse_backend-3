#La imagen base:
  FROM node:16.20.0

  WORKDIR /app
  
  COPY package*.json ./
  
  RUN npm install
  
  COPY . .

  EXPOSE 9090
  
  CMD [ "npm", "start"]