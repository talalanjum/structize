# Next.js frontend app

## Next.js app

To start the frontend app,

Firstly, make sure to create an /app/.env.local file, and define a variable **PUBLIC_NEXT_SERVER_URL=http://hostname:port**

Then, run these in the command line or shell:

```
cd app
npm install
npm run dev
```

## Build using Docker

To build using docker:

```
docker build -t <nextjs-image-name> .

docker run <nextjs-image-name>
```

## Description:

This app consists of two main components:

### **Home Component**

This is the wrapper component for the app. Contains information regarding the action by fetching the action data from the server. Also wraps the `<Action>` component

### **Action Component**

This component is for configuring the action. Contains fields for defining and updating inputs for the action, and the URL for the POST request sent when the workflow is triggered.
