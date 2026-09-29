import { generateAnswer } from "./ai/ai.js";
import { getContext } from "./rag/rag.js";

let previousInteractionId = null;

export default async function chatBot(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const results = await getContext(message);

    const context = results
      .map((result) => {
        return `
Source: ${result.source}
Similarity: ${result.score}

Text:
${result.text}
`;
      })
      .join("\n\n");

    const result = await generateAnswer(
      message,
      context,
      previousInteractionId,
    );

    previousInteractionId = result.interactionId;

    res.json({
      answer: result.answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
