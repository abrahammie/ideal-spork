FROM node:carbon
COPY client/package.json /appTest/package.json
WORKDIR /appTest/
RUN npm install
COPY client/ ./

# switch copy when tasks tests are ready
#COPY . ./

RUN npm test
