import { GoogleGenerativeAI } from '@google/generative-ai';

const AI_MODEL = 'gemini-2.0-flash';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ model: AI_MODEL });