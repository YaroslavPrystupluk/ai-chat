import {type FC} from "react";
import Controls from "./components/Controls/Controls";
import Chat from "./components/Chat/Chat";

import styles from "./index.module.css";
import {useGemini} from "./hooks/useGemini.tsx";

const App: FC = () => {
    const {messages, sendMessage, isLoading} = useGemini();

    const handleContentSend = async (content: string) => {
        await sendMessage(content)
    };


    return (
        <div className={styles.App}>
            <header className={styles.Header}>
                <img className={styles.Logo} src="/chat-bot.png" alt='logo ia chat'/>
                <h2 className={styles.Title}>AI Chatbot</h2>
            </header>
            <div className={styles.ChatContainer}>
                <Chat
                    messages={messages}/>
            </div>
            <Controls onSend={handleContentSend} isLoading={isLoading}/>
        </div>
    );
};

export default App;
