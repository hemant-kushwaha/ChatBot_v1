import cors from "cors";
import "dotenv/config";
import express from "express";

import chatBot from "./chat.js";
import { initialize } from "./initialize.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ask", chatBot);

async function startServer() {
  await initialize();

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
