const express = require("express");
const cors = require("cors");
require("dotenv").config
const stripe = require("stripe")(process.env.STRIPE-KEY);
// ...

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// http://127.0.0.1:5001/fir-d42bc/us-central1/api

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment requested recieved for this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//http://127.0.0.1:5001/fir-d42bc/us-central1/api

app.listen(8080,(err)=>{
    if(err) throw err
    console.log("app is running on por 8080.")
  })