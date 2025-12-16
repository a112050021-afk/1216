import { API_KEY, API_URL, MODEL_ID, STYLE_PROMPTS } from '../constants';
import { AnswerStyle, OpenRouterResponse } from '../types';

/**
 * Fetches an answer from the OpenRouter API acting as "The Book of Answers".
 */
export const fetchAnswer = async (question: string, style: AnswerStyle): Promise<string> => {
  const styleInstruction = STYLE_PROMPTS[style] || STYLE_PROMPTS['mysterious'];
  
  // Strict System Prompt to enforce "Book of Answers" behavior
  const systemPrompt = `
    你現在是傳說中的「解答之書」。
    你的唯一功能是針對使用者心中的問題，給出一句「簡短、終極」的解答。
    
    【重要規則】
    1. 只能回答「一句話」。
    2. 不要解釋原因，不要囉嗦。
    3. 不要有開頭語（如「好的」、「答案是」），直接給出那句解答。
    4. ${styleInstruction}
    5. 請使用繁體中文。
    6. 即使沒有具體問題，也要給出一個適用於當下心境的指引。
    
    範例回答：
    - 「這是不可能的。」
    - 「時機未到。」
    - 「放手一搏。」
    - 「答案在你心中。」
  `;

  const userContent = question && question.trim().length > 0 
    ? `我的問題是：${question}`
    : `我心中已默念了問題，請給我指引。`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userContent
          }
        ],
        temperature: 0.8, // Slightly high creativity for "mystical" feel
        max_tokens: 100, // Enforce brevity
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      throw new Error("無法連結到宇宙訊號，請稍後再試。");
    }

    const data: OpenRouterResponse = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error("宇宙保持沉默。");
    }

  } catch (error) {
    console.error("API Call Failed:", error);
    throw error;
  }
};