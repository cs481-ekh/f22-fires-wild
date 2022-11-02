FROM node:16.17.0-alpine
WORKDIR /app/frontend

COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add react-scripts
COPY . ./
EXPOSE 3000