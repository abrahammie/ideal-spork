FROM node:carbon
COPY package.json /app/package.json
WORKDIR /app/
RUN npm install
COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]
