const express = require("express");
const app = express();
require('dotenv').config()
const cors = require('cors')
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51MTfvoSIO9jwyVmqrRp5fXy5CuMjrdavZYvpx8CWyjChluxapXyLhyfm2WkSA3KHpgcQUxiJiHpTN0bws6ZRoMVS00E8dEUa36');
app.use(express.static("public"));
app.use(express.json());
app.use(cors())

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
app.get('/',(req,res)=>{
    return res.send('Hello from the server');
})
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(process.env.PORT||4242, () => console.log("Node server listening on port 4242!"));