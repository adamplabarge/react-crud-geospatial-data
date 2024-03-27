# Docker Compose React, Nodejs and MySQL CRID with Data Visualization

## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```

For more detail, please visit:
> [Docker Compose React + Node.js + MySQL example](https://www.app.com/docker-compose-react-nodejs-mysql/)

Related Posts:
> [React + Node.js Express + MySQL](https://app.com/react-node-express-mysql/)

> [React + Redux + Node.js Express + MySQL](https://www.app.com/react-redux-mysql-crud/)

> [React + Node.js Express: User Authentication with JWT example](https://www.app.com/react-express-authentication-jwt/)

Integration (run back-end & front-end on same server/port)
> [Integrate React with Node.js Restful Services](https://app.com/integrate-react-express-same-server-port/)
