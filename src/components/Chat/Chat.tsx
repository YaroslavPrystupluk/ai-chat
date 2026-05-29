import {type FC} from "react";
import type {messageType} from "../../types/types";

import styles from "./index.module.css";
import Markdown from "react-markdown";


type Props = {
    messages: messageType[];
    error?: string | null;
};

const WELCOME_MESSAGE = {
    role: "assistant",
    content: "Hello! How can I assist you right now?",
};

const Chat: FC<Props> = ({messages, error}) => {



    return (
        <div className={styles.Chat}>
            {[WELCOME_MESSAGE, ...messages].map(({role, content}, index) => (
                <div key={index} className={styles.Message} data-role={role}>
                    {error ? (<><Markdown>{role}</Markdown> <Markdown>{error}</Markdown></>) : (<><p>{role}</p> <Markdown>{content}</Markdown></>)}
                </div>
            ))}
        </div>
    );
};

export default Chat;
