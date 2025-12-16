export enum AnswerStyle {
  MYSTERIOUS = 'mysterious',
  DIRECT = 'direct',
  ENCOURAGING = 'encouraging',
  PHILOSOPHICAL = 'philosophical'
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

export interface AnswerState {
  hasAsked: boolean;
  isLoading: boolean;
  answer: string | null;
  error: string | null;
}