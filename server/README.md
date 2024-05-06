# Node.js Server

To run this server


Create a MongoDB Atlas account, and copy the secret URI. Add the URI to /server/.env.local with the name **MONGO_URI**.

Then, run these in the command line or shell:

```
cd server
npm install
node app.js or nodemon app.js
```

## Build using Docker

To build using docker:

```
docker build -t <nodejs-image-name> .

docker run <nodejs-image-name>
```

## Description

The server helps configure and run a workflow process end to end. 

### Endpoints:

### **GET /action-info:**

Fetches workflow information to send to the client, to be viewed or later updated.

```
return {
  url: String,
  triggerInput: String,
  triggerValue: String
}
```

### **POST /configure-action:**

```
body = {
  url: String,
  triggerInput: String,
  triggerValue: String
}


``` 
Updates these parameters in the workflow.

```
return {
  modified: Boolean
}
```

### **POST /trigger-workflow:**

```
body = {
  input: String
}

```

Responsible for triggering the workflow. The endpoint is called from an external source, with some input to be passed to the action.
Takes the input from the trigger of the workflow, and passes it to an API GET request to the url specified in the **url** workflow field for the action.

```
return {
  apiResponse: Object,
  sentData: {
    url,
    triggerInput,
    triggerValue,
    inputFromTrigger: input,
  }
}
```






