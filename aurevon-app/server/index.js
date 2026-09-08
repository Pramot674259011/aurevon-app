import express from "express";
import cors from "cors";
import { getPieces, createReservation } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Aurevon API is running" });
});

app.get("/api/pieces", (req, res) => {
  try {
    const pieces = getPieces();
    res.json(pieces);
  } catch (error) {
    console.error("Failed to fetch pieces:", error);
    res.status(500).json({ error: "Unable to load pieces from database" });
  }
});

app.post("/api/reservations", (req, res) => {
  const {
    piece,
    date,
    time,
    guests,
    name,
    email,
    deposit,
    conditionReport,
    provenance,
  } = req.body || {};

  if (!piece || !date || !time || !name || !email) {
    return res
      .status(400)
      .json({ error: "Missing required reservation fields" });
  }

  try {
    const reservation = createReservation({
      piece,
      date,
      time,
      guests,
      name,
      email,
      deposit,
      conditionReport,
      provenance,
    });

    return res.status(201).json({ success: true, reservation });
  } catch (error) {
    console.error("Failed to create reservation:", error);
    return res.status(500).json({ error: "Unable to save reservation" });
  }
});

app.listen(PORT, () => {
  console.log(`Aurevon database server running on http://localhost:${PORT}`);
});
