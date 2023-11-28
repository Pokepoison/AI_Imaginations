import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';

dotenv.config();

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// console.log({openAI})
const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openAI.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });
    const imageResponse = aiResponse
    console.log({imageResponse})
    const image = aiResponse?.data[0]?.b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json(error?.response?.data?.error.message || {message: "Something went wrong"});
  }
});

export default router;