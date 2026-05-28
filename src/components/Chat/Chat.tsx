import { type FC } from "react";
import type { messageType } from "../../types/types";

import styles from "./index.module.css";

type Props = {
  messages: messageType[];
};

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! How can I assist you right now?",
};

const Chat: FC<Props> = ({ messages }) => {
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div key={index} className={styles.Message} data-role={role}>
          {content}
        </div>
      ))}
    </div>
  );
};

export default Chat;
