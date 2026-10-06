const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dns = require("dns").promises;
const net = require("net");

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

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RK Welding Backend is running",
  });
});

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

app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/works", workRoutes);
app.use("/api/work-images", workImageRoutes);
app.use("/api/work-videos", workVideoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`RK Welding Backend running on port ${PORT}`);
});