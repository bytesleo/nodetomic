---
title: Installation
parent: Getting Started
has_children: false
nav_order: 1
---

# Installation

## Requirements

- [Nodejs](https://nodejs.org) latest (minimum version 6.x.x)
- [MongoDB](https://www.mongodb.com) latest (minimum version 3.x.x)
- [Redis](https://redis.io)  >= latest (minimum version 3.x.x)

## Clone repository

```bash
git clone https://github.com/kevoj/nodetomic
cd nodetomic
yarn
```

Then, you will need to create a **.env** file in the root of the project, you can check the [guide here](https://kevoj.github.io/nodetomic/environments)

### Example .env file:

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

Once the .env is configured, you can start the project

```bash
yarn start
```

![image](https://user-images.githubusercontent.com/2652129/128099115-68acdd08-22f4-41c8-b2f2-35d320db9a14.png)

To see more scripts you can check the [guide here](https://kevoj.github.io/nodetomic/scripts)