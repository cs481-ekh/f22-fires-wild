FROM node:16.17.0-alpine
WORKDIR /app/frontend

COPY package.json yarn.lock ./
RUN yarn install
#RUN yarn add react-scripts@3.4.1 -g 
COPY . ./
EXPOSE 3000