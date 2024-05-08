const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const axios = require("axios");

const httpPort = 4242;

const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config({ path: ".env.production" });
}

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

const mongoUri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas", error);
  }
}

connectToDatabase();

const server = http.createServer(app);

app.get("/action-info", async (req, res) => {
  try {
    let fields = await client
      .db("structize")
      .collection("actions")
      .find({})
      .toArray();

    res.send({ message: "Success", fields });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

app.post("/configure-action", async (req, res) => {
  try {
    const { url, triggerInput, triggerValue } = req.body;

    const collection = await client.db("structize").collection("actions");

    let oldValues = collection.find({}).toArray();

    const filter = { ...oldValues[0] };

    const update = {
      $set: {
        url,
        triggerInput,
        triggerValue,
      },
    };

    const result = await collection.updateOne(filter, update);

    console.log(result);

    res.send({
      message: "Successfully modified action",
      modified: Boolean(result.modifiedCount),
    });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

app.post("/trigger-workflow", async (req, res) => {
  try {
    const { input } = req.body;

    let fields = await client
      .db("structize")
      .collection("actions")
      .find({})
      .toArray();

    const { url, triggerInput, triggerValue } = fields[0];

    axios
      .get(url, {
        params: {
          triggerInput: input,
          triggerValue,
          actionInput: triggerInput,
        },
      })
      .then((response) => {
        console.log("Response: ", response.data);

        res.send({
          message: "Success",
          apiResponse: response.data,
          sentData: {
            url,
            triggerInput,
            triggerValue,
            inputFromTrigger: input,
          },
        });
      });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

server.listen(httpPort, () =>
  console.log(`App listening on port ${httpPort}!`)
);
