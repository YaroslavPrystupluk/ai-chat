import { useState, type FC } from "react";
import Controls from "./components/Controls/Controls";
import Chat from "./components/Chat/Chat";
import type { messageType } from "./types/types";

import styles from "./index.module.css";

const App: FC = () => {
  const [messages, setMessages] = useState<messageType[]>([]);

  const handleContentSend = (content: string) => {
    setMessages((prevMessage) => [...prevMessage, { content, role: "user" }]);
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
      <Controls onSend={handleContentSend} />
    </div>
  );
};

export default App;
