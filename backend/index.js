const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRoute = require("./Routes/AuthRoute.js");
const ProductsRoute = require("./Routes/ProductsRoute.js");

require("dotenv").config();
const PORT = process.env.PORT || 8080;

require("./Models/db");

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRoute);
app.use("/products", ProductsRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
