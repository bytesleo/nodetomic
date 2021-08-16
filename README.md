# NODETOMIC

Minimalist boilerplate for **nodejs**, designed for vertical and horizontal scalability.

## Technologies

- Express
- Redis 6
- MongoDB 4
- Swagger 3
- Webpack 5
- Babel 7
- Socket 4
- Eslint
- Prettier
- Jest

## Installation

```bash
git clone https://github.com/kevoj/nodetomic
cd nodetomic
yarn
```

Then, you will need to create a .env file in the root of the project

```bash
PROJECT_MODE=development
PROJECT_NAME=example-name
SERVER_HOSTNAME=localhost
SERVER_PORT=8000
SERVER_WEBSOCKET_PORT=8001
SWAGGER_HOSTNAME=localhost
SWAGGER_API_DOCS=true
JWT_SECRET_KEY=shhhh
MONGODB_HOSTNAME=127.0.0.1
MONGODB_PORT=27017
MONGODB_DATABASE=example-dev
MONGODB_USERNAME=
MONGODB_PASSWORD=
REDIS_HOSTNAME=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```
## Scripts

### start

Start the project in development mode with the .env file that is in the root

```bash
yarn start
```

### test

Run the unit tests

```bash
yarn test
```

### build

Compile the project

```bash
yarn build
```

## Docs

[Guide](https://kevoj.github.io/nodetomic)

## API docs

![image](https://user-images.githubusercontent.com/2652129/128109277-2a7bed2d-f6e7-4fe8-8e67-215fbf60f186.png)

## Scalability

### Starting point

![nodetomic_1](https://user-images.githubusercontent.com/2652129/128117943-ba569149-8f3c-4252-9231-9e16936167a2.png)

### cluster mode **(NO SHARED STATE)**

![nodetomic_2](https://user-images.githubusercontent.com/2652129/128117945-cd4abb81-7c36-4cc3-8de8-0f8b809c6988.png)

### Add Redis to shared state

![nodetomic_3](https://user-images.githubusercontent.com/2652129/128117950-b576e53a-d14b-4b7c-96cc-c317958c1bd3.png)

### Added multiple servers and pm2 load balancing

![nodetomic_4](https://user-images.githubusercontent.com/2652129/128117954-be4c1813-5222-474c-bac1-40ffd6aace60.png)

### Added database and load balancer

![nodetomic_5](https://user-images.githubusercontent.com/2652129/128117959-e2893fb2-7588-4fb0-8625-b237be20dad2.png)

### Added redis cluster and mongodb sharded clusters

![nodetomic_6](https://user-images.githubusercontent.com/2652129/128117966-7bbc6054-97a7-4ae4-bfc1-71071c41fdd7.png)

### Conclusion

![nodetomic_7](https://user-images.githubusercontent.com/2652129/128117968-de8d3d3f-25af-4b5f-bfab-cac9d9e9dac9.png)
