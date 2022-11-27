import express from "express";
import fetch from "node-fetch";
import { API_Key } from "./sources/keys.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.end("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const city = req.body.cityName;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`
    );
    const data = await response.json();
    if (response.ok) {
      res.json({ weatherText: `${data.name} , ${data.main.temp}°F` });
    } else {
      res.status(404).json({ weatherText: "City is not found!" });
    }
  } catch (error) {
    res.status(500).end("Error in API");
  }
});

export default app;
