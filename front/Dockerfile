FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV CI=true

#RUN npm test

# build

FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

RUN npm run build

# serve

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "-l", "3000", "build"]