import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "aurevon.json");

const seedPieces = [
  {
    id: 1,
    title: "Quiet Tide",
    artist: "M. Sorenson",
    price: "$4,200",
    image: "https://picsum.photos/seed/aurevon-tide/600/750",
  },
  {
    id: 2,
    title: "Ash & Ember",
    artist: "R. Okafor",
    price: "$6,800",
    image: "https://picsum.photos/seed/aurevon-ember/600/750",
  },
  {
    id: 3,
    title: "Standing Water",
    artist: "L. Vance",
    price: "$3,100",
    image: "https://picsum.photos/seed/aurevon-water/600/750",
  },
  {
    id: 4,
    title: "Field Study No. 4",
    artist: "M. Sorenson",
    price: "$5,400",
    image: "https://picsum.photos/seed/aurevon-field/600/750",
  },
  {
    id: 5,
    title: "Interior, Late Light",
    artist: "J. Petrov",
    price: "$7,900",
    image: "https://picsum.photos/seed/aurevon-interior/600/750",
  },
  {
    id: 6,
    title: "Unmade",
    artist: "R. Okafor",
    price: "$2,600",
    image: "https://picsum.photos/seed/aurevon-unmade/600/750",
  },
];

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(dbPath)) {
  const initialData = { pieces: seedPieces, reservations: [] };
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

function readDb() {
  const raw = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function getPieces() {
  return readDb().pieces;
}

export function createReservation({
  piece,
  date,
  time,
  guests,
  name,
  email,
  deposit,
  conditionReport,
  provenance,
}) {
  const db = readDb();
  const reservation = {
    id: Date.now(),
    piece,
    date,
    time,
    guests: Number(guests) || 1,
    name,
    email,
    deposit: Number(deposit) || 50,
    conditionReport: Boolean(conditionReport),
    provenance: Boolean(provenance),
    createdAt: new Date().toISOString(),
  };

  db.reservations.push(reservation);
  writeDb(db);

  return reservation;
}
