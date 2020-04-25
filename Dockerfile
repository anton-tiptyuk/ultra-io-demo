FROM node:10
WORKDIR /usr/src/app
RUN npm i -g typescript ts-node
COPY . .

RUN npm install
