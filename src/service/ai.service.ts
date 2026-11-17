import api from "./api";

export interface IChatResponse {
  status: string;
  reply: string;
}

export const sendChatMessage = async (message: string): Promise<string> => {
  const res = await api.post<IChatResponse>("/ai/chat", { message });
  return res.data.reply;
};

export default {
  sendChatMessage,
};