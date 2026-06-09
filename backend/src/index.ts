import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import parseTorrent from "parse-torrent";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend OK" });
});

// Mongo connect
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});


try {
  const torrentPath = path.join(__dirname, "big-buck-bunny.torrent");
  const torrent = fs.readFileSync(torrentPath);
  console.log(torrent);

  const parsed = parseTorrent(torrent);
  console.log("Torrent Name:", parsed.name);
  console.log("Info Hash:", parsed.infoHash);
  if ('files' in parsed) {
    console.log("Files:", parsed.files?.map((f: any) => f.name));
  }
} catch (err) {
  console.error("Failed to read/parse torrent:", err);
}
