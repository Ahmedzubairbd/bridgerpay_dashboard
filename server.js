require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (specifically allow only what's needed)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/bridgerpay-dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "bridgerpay-dashboard.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

// DB Config
const db = require("./config/database");

// Connect to MongoDB
mongoose
  .connect(db.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Route files
const auth = require("./routes/auth");
const user = require("./routes/user");
const transaction = require("./routes/transaction");

// Mount routers
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/transactions", transaction);

const port = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = app;
