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

## API docs

![image](https://user-images.githubusercontent.com/2652129/128109277-2a7bed2d-f6e7-4fe8-8e67-215fbf60f186.png)

## Installation

[Guide](https://kevoj.github.io/nodetomic/getting-started/installation.html)

## Docs

[Guide](https://kevoj.github.io/nodetomic)
