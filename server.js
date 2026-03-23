const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = __dirname;

app.use(express.json());
app.use(express.static(rootDir, { extensions: ["html"] }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    mode: process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? "cloud-ready" : "local-ready",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/config", (_req, res) => {
  res.json({
    appName: "Calendario Vida Real",
    supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  });
});

app.use((_req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Calendario listo en http://localhost:${PORT}`);
});
