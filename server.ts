import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("manifesto.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS signatures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/signatures", (req, res) => {
    try {
      const signatures = db.prepare("SELECT name, location, created_at FROM signatures ORDER BY created_at DESC LIMIT 100").all();
      res.json(signatures);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch signatures" });
    }
  });

  app.post("/api/signatures", (req, res) => {
    const { name, location } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    try {
      const stmt = db.prepare("INSERT INTO signatures (name, location) VALUES (?, ?)");
      stmt.run(name, location || null);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save signature" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
