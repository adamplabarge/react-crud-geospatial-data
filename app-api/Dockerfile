FROM node:14

WORKDIR /app-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
