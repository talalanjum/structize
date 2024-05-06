# Basic Workflow app


This application consists of two main parts:

1) Frontend app built with Next.js [README.md](app/README.md)
2) Server built with Node.js [README.md](server/README.md)


These are hosted over AWS, and uses Github actions to push both apps to their respective ECS services by containerizing using Docker.


## Next.js app
To start the frontend app,

Firstly, make sure to create an /app/.env.local file, and define a variable **PUBLIC_NEXT_SERVER_URL=http://hostname:port**

Then run these in the command line or shell:

```
cd app
npm install
npm run dev
```

## Node.js server
To start the backend app,

Create a MongoDB Atlas account, and copy the secret URI. Add the URI to /server/.env.local with the name **MONGO_URI**.

Then, run these in the command line or shell:

```
cd server
npm install
node app.js or nodemon app.js
```

## Build using Docker

To build both apps using docker:

```
docker build -t <nextjs-image-name> ./app
docker build -t <nodejs-image-name> ./server

docker run <nextjs-image-name>
docker run <nodejs-image-name>
```
