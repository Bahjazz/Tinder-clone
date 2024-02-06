import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import cors from "cors";
// app config
const app = express();
const port = process.env.PORT || 8001;

// middlewares
app.use(express.json());
app.use(cors());

// Db config
const connection_url =
  "mongodb+srv://admin:lvxnVWZu97mjHRyj@cluster0.etii9o0.mongodb.net/";
mongoose.connect(connection_url, {});
// API endpoint

app.get("/", (req, res) => {
  res.status(200).send("Helo world");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`));
