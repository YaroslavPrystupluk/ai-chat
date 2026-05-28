import { useState, type FC } from "react";
import Controls from "./components/Controls/Controls";
import Chat from "./components/Chat/Chat";
import type { messageType } from "./types/types";

import styles from "./index.module.css";
import { chat } from "./config/gemini";

const App: FC = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isLoading, setIsLoadig] = useState(false);

  const addMessage = (message: messageType) => {
    setMessages((prevMessage) => [...prevMessage, message]);
  };

  const handleContentSend = async (content: string) => {
    setIsLoadig(true);
    try {
      addMessage({ content, role: "user" });

      const result = await chat.sendMessage({
        message: content,
      });

      addMessage({ content: result.text, role: "assistant" });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Сталася помилка при з'єднанні з AI. Спробуйте ще раз.";
      addMessage({
        content: errorMessage,
        role: "system",
      });
    } finally {
      setIsLoadig(false);
    }
  };
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} isLoading={isLoading} />
    </div>
  );
};

export default App;
