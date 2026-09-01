import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { createApp } from "./app.js";
import initDB from "./db/db.connect.js";

const bootstrap = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 5000;
  const server = http.createServer(app);
  server.setTimeout(300000);
  server.listen(PORT, () => {
    initDB();
    console.log(`Server Running on port ${PORT}`);
  });
};
bootstrap().catch((e) => {
  console.error("Fatal boot error:", e);
  process.exit(1);
});