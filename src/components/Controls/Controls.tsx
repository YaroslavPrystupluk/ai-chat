import {type ChangeEvent, type FC, useState} from "react";

import styles from "./index.module.css";
import SendIcon from "./SendIcon";


type Props = {
  onSend: (content: string) => void;
  isLoading: boolean;
};

const Controls: FC<Props> = ({ onSend, isLoading }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleContentSend = () => {
    if (!content.trim() || isLoading) return;
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleContentSend();
    }
  };

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea
          className={styles.TextArea}
          placeholder="Message AI Chatbot"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
        />
      </div>
      <button
        className={styles.Button}
        onClick={handleContentSend}
        disabled={isLoading}
      >
        <SendIcon />
      </button>
    </div>
  );
};

export default Controls;
