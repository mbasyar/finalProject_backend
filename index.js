const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// routes
const register = require("./routes/registerRoute");
const login = require("./routes/loginRoute");
const productsRoute = require("./routes/productsRoute");
const stripe = require("./routes/stripe");
const users = require("./routes/usersRoute");
const orders = require("./routes/ordersRoute");

const products = require("./products");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/users", users);
app.use("/api/orders", orders);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, console.log(`Server running on port ${port}`));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Berhasil terhubung ke MongoDB"))
  .catch((error) => console.log("Gagal terhubung ke MongoDB:", error.message));
