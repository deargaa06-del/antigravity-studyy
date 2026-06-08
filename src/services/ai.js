import { GoogleGenerativeAI } from '@google/generative-ai';

// 실제 환경변수(VITE_GEMINI_API_KEY)에 키를 넣어야 정상 작동합니다.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "MOCK_KEY";

export const generateAIText = async (activityData, focusType = '학업 역량') => {
  const { motive, process, result, keyword, subject } = activityData;

  // Mock 응답
  if (API_KEY === "MOCK_KEY") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[${subject}] 수업 중 ${keyword}을 바탕으로 활동을 주도함. ${motive}에 관심을 갖고 ${process}를 수행하며 ${focusType}을 입증함. 특히 ${result}의 성장을 보임.`);
      }, 1500);
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
학생의 생활기록부 내용을 대학 입시(${focusType} 중심)에 맞춰 전문적이고 역량 중심의 문구로 변환해주세요.
나열식 문구를 피하고, 동기와 과정, 결과가 하나의 스토리라인으로 연결되도록 500자 내외로 요약해주세요.

[학생 작성 내용]
- 과목: ${subject}
- 강조 키워드: ${keyword}
- 계기(동기): ${motive}
- 과정: ${process}
- 결과 및 변화: ${result}
`;

    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "AI 문구 생성에 실패했습니다. API 키를 확인해주세요.";
  }
};
