const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dns = require("dns").promises;
const net = require("net");
const mysql = require("mysql2/promise");

const db = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const workRoutes = require("./routes/workRoutes");
const workImageRoutes = require("./routes/workImageRoutes");
const workVideoRoutes = require("./routes/workVideoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// =========================
// ROOT
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RK Welding Backend is running",
  });
});


// =========================
// DATABASE TEST
// =========================

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    res.json({
      success: true,
      message: "Database connected successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.code,
      errorNumber: error.errno,
      syscall: error.syscall,
    });
  }
});


// =========================
// NETWORK TEST
// =========================

app.get("/network-test", async (req, res) => {
  const host = process.env.DB_HOST;
  const port = Number(process.env.DB_PORT);

  try {
    const addresses = await dns.lookup(host, { all: true });

    const results = [];

    for (const address of addresses) {
      const result = await new Promise((resolve) => {
        const socket = new net.Socket();

        const timer = setTimeout(() => {
          socket.destroy();

          resolve({
            address: address.address,
            family: address.family,
            result: "TIMEOUT",
          });
        }, 10000);

        socket.connect({
          host: address.address,
          port,
          family: address.family,
        });

        socket.on("connect", () => {
          clearTimeout(timer);
          socket.destroy();

          resolve({
            address: address.address,
            family: address.family,
            result: "CONNECTED",
          });
        });

        socket.on("error", (error) => {
          clearTimeout(timer);
          socket.destroy();

          resolve({
            address: address.address,
            family: address.family,
            result: error.code || error.message,
          });
        });
      });

      results.push(result);
    }

    res.json({
      success: true,
      host,
      port,
      addresses,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.code || error.message,
    });
  }
});


// =========================
// MYSQL DIRECT TEST
// =========================

app.get("/mysql-test", async (req, res) => {
  const config = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
      rejectUnauthorized: false,
    },

    connectTimeout: 30000,
  };

  let connection;

  try {
    console.log("MYSQL TEST: Starting connection...");

    connection = await mysql.createConnection(config);

    console.log("MYSQL TEST: Connection established");

    const [rows] = await connection.query("SELECT 1 AS result");

    console.log("MYSQL TEST: Query successful");

    res.json({
      success: true,
      stage: "query_success",
      data: rows,
    });
  } catch (error) {
    console.error("MYSQL TEST ERROR:", error);

    res.status(500).json({
      success: false,
      stage: "mysql_connection_or_query",
      error: error.code,
      message: error.message,
      errno: error.errno,
      syscall: error.syscall,
    });
  } finally {
    if (connection) {
      await connection.end().catch(() => {});
    }
  }
});


// =========================
// API ROUTES
// =========================

app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/works", workRoutes);
app.use("/api/work-images", workImageRoutes);
app.use("/api/work-videos", workVideoRoutes);


// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`RK Welding Backend running on port ${PORT}`);
});