import { v4 as uuidv4 } from "uuid";

export const getSessionId = () => {
  const sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    const newSessionId = uuidv4();
    localStorage.setItem("sessionId", newSessionId);
    return newSessionId;
  }
  return sessionId;
};

export const clearSessionId = () => {
  localStorage.removeItem("sessionId");
};
