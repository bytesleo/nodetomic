.env

### Dev

```bash
NAME=node-cool-boilerplate
MODE=development
HOST=localhost
PORT=8000
WS=8001
URI_DB=mongodb://127.0.0.1:27017/node-cool-boilerplate-dev
URI_REDIS=redis://:@127.0.0.1:6379/0
URI_WS_REDIS=redis://127.0.0.1:6379/1
JWT_SECRET=shhhh
```

### Test

```bash
NAME=node-cool-boilerplate
MODE=test
HOST=localhost
PORT=8000
WS=8001
URI_DB=mongodb://user_test:3dF9zDWYrVYsUveG@localhost:27014/telolavo-test
URI_REDIS=redis://:QbZ948wBGVpUwurF@127.0.0.1:6379/0
URI_WS_REDIS=redis://:QbZ948wBGVpUwurF@127.0.0.1:6379/1
JWT_SECRET=KYTzTm5U7LKSh4ma
```

### Prod

```bash
NAME=node-cool-boilerplate
MODE=production
HOST=localhost
PORT=8000
WS=8001
URI_DB=mongodb://user_test:9M27WKgRNbvqfxYT@localhost:27014/telolavo-prod
URI_REDIS=redis://:FgkTHsjEEPG4w77p@127.0.0.1:6379/0
URI_WS_REDIS=redis://:FgkTHsjEEPG4w77p@127.0.0.1:6379/1
JWT_SECRET=ZTnpNMuAUFh2P9vw
```
