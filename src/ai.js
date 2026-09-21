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
    const response = await ai.interactions.create({
      model: process.env.MODEL,
      system_instruction: SYSTEM_PROMPT,
      input: `${ticket}`,
      previous_interaction_id: previousInteractionId,
    });

    previousInteractionId = response.id;
    // console.log(response);
    res.json(response.output_text);
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
