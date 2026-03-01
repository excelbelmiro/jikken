// API設定
const API_CONFIG = {
    // baseURL: 'https://your-api-url.vercel.app', // 教員から伝えられたAPI URLに変更
    baseURL: 'https://llm-education-proxy.vercel.app', // 教員から伝えられたAPI URLに変更
    studentId: 'student_42', // 各自の学生IDに変更

    // APIリクエストのデフォルト設定
    defaultOptions: {
        temperature: 0.7,
        max_tokens: 500,
    }

};

// 設定をエクスポート（他のファイルから使えるようにする）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}

export const UI_CONTROLS = [
  { id: "temperature", type: "range", label: "Temperature", min: 0, max: 1, step: 0.05, value: 0.7 },
  { id: "maxTokens", type: "number", label: "Max tokens", value: 512 },
  { id: "mode", type: "select", label: "Mode", options: ["normal","summary","report"], value: "normal" },
  { id: "showSteps", type: "checkbox", label: "Show steps", value: true },
];
