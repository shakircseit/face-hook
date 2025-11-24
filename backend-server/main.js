const jsonServer = require("json-server");
const customRouter = require("./router");
const express = require("express");
const checkAuth = require("./middleware/checkAuth");
require("dotenv").config();
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("./database/db.json");

// ✅ Correct CORS setup — only once and before routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// Bind the router db to the app
app.db = router.db;

app.use(express.json());

// Custom middlewares
app.use(checkAuth);
app.use("/", customRouter);
app.use(router);

// Error handler
app.use((err, req, res, _next) => {
  res.status(500).json({
    error: err.message,
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
  console.log("http://localhost:3000");
});

module.exports = app;
