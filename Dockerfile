FROM node:carbon

COPY client/package.json /appTest/package.json
WORKDIR /appTest/
RUN npm install

COPY ./client ./

RUN npm test
