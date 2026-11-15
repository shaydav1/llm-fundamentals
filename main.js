import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv"; // to read the .env file

dotenv.config();
const claude = new Anthropic({}); // initializes the Claude client and automatically loads ANTHROPIC_API_KEY from the .env file

const askGemini = async (userPrompt) => {
  const message = await claude.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: userPrompt }],
  });

  // Token counts reported by the API for this request
  console.log(
    `Tokens - input: ${message.usage.input_tokens}, output: ${message.usage.output_tokens}`
  );

  // The answer is the text of the first content block in the response
  return message.content[0].text;
};

const run = async () => {
  // This is a prompt that would be very hard for a traditional code to answer correctly, hence the power of LLMs
  const userPrompt = `
  Is the following a positive or negative review?
  "Yeah, this was the *best* book ever, only made me want to pull my eyes out of their sockets"`;

  const response = await askGemini(userPrompt);
  console.log(response);
};

run();
