const express = require("express");
const Datastore = require("nedb");

const app = express();
app.listen(5000, () => console.log("listening at 5000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (error, data) => {
    if (error) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log("I got a post requset");

  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
