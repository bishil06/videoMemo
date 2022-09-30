FROM node:16-alpine as builder
WORKDIR /usr/app

COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

ENV MONGO_ID=<MONGO_ID> \ 
    MONGO_PASSWD=<MONGO_PASSWD> \ 
    MONGO_URL=<MONGO_URL> \ 
    MONGO_PORT=<MONGO_PORT> \ 
    DB_NAME=<DB_NAME> \ 
    COLLECTION_NAME=<COLLECTION_NAME> \ 
    PORT=8080

CMD [ "npm", "start"]