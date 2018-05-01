FROM node:carbon
COPY package.json /app/package.json
WORKDIR /app/
RUN npm install
COPY . ./
EXPOSE 3001
CMD [ "npm", "start" ]
