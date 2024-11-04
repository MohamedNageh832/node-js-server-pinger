import "dotenv/config";
import express from "express";
import cron from "node-cron";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log("Binger is listening");
});

app.get("/ping", (req, res) => {
  res.json({ status: "ok", message: "pong" });
});

const PING_DURATION_IN_MILLIS = process.env.PING_DURATION_IN_MILLIS || 300000; // 5 mins
const ENDPOINTS_TO_BING = process.env.ENDPOINTS_TO_BING.split(",");

setInterval(async () => {
  ENDPOINTS_TO_BING.forEach(async (endpoint) => {
    try {
      await fetch(endpoint);
      console.log("Pinged Server: " + endpoint);
    } catch (error) {
      console.log("Error pinging Server: ", error);
    }
  });
}, PING_DURATION_IN_MILLIS);
