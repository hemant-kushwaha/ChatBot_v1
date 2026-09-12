import "dotenv/config";
import cors from "cors";
import express from "express";
import chatBot from "./ai.js";

const app = express();

app.use(cors());
app.use(express.text({ type: "*/*" }));

app.post("/api/chat", chatBot);
app.delete("/api", (_req, res) => {
  previousInteractionId = null;
  res.status(200).send();
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
