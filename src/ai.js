import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./constants.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

let previousInteractionId = null;

export default async function chatBot(req, res) {
  const ticket = req.body;

  console.log("User Que:", ticket);

  try {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await ai.interactions.create({
      model: process.env.MODEL,
      system_instruction: SYSTEM_PROMPT,
      input: `${ticket}`,
      previous_interaction_id: previousInteractionId,
      stream: true,
    });

    for await (const event of stream) {
      if (event.event_type === "step.delta" && event.delta.type === "text") {
        res.write(event.delta.text);
      }

      // Save the interaction ID
      if (event.event_type === "interaction.completed") {
        previousInteractionId = event.interaction.id;
        console.log("Previous ID:", previousInteractionId);
      }
    }

    res.end();
  } catch (error) {
    console.error("Gemini Error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Something went wrong",
      });
    } else {
      res.end();
    }
  }
}
