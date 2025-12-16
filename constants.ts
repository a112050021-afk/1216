export const API_KEY = "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";
export const API_URL = "https://openrouter.ai/api/v1/chat/completions";
export const MODEL_ID = "google/gemma-3n-e2b-it:free";

export const STYLE_LABELS: Record<string, string> = {
  mysterious: "神秘莫測 (Mysterious)",
  direct: "直截了當 (Direct)",
  encouraging: "溫柔鼓勵 (Encouraging)",
  philosophical: "富含哲理 (Philosophical)",
};

export const STYLE_PROMPTS: Record<string, string> = {
  mysterious: "語氣神秘、簡潔，類似傳統的解答之書，充滿宿命感。",
  direct: "語氣果斷、明確，直接給予 Yes/No 或具體的行動指示。",
  encouraging: "語氣溫暖、支持，給予使用者信心和希望。",
  philosophical: "語氣深邃，給予一句富有禪意或哲理的話。",
};