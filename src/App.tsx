import {type FC} from "react";
import Controls from "./components/Controls/Controls";
import Chat from "./components/Chat/Chat";

import styles from "./index.module.css";
import {useGemini} from "./hooks/useGemini.tsx";
import Loader from "./components/Loader/Loader.tsx";

const App: FC = () => {
    const {messages, sendMessage, isLoading, error} = useGemini();

    const handleContentSend = async (content: string) => {
        await sendMessage(content)
    };


    return (
        <div className={styles.App}>
            {isLoading && <Loader/>}
            <header className={styles.Header}>
                <img className={styles.Logo} src="/chat-bot.png" alt='logo ia chat'/>
                <h2 className={styles.Title}>AI Chatbot</h2>
            </header>
            <div className={styles.ChatContainer}>

                <Chat
                    error={error}
                    messages={messages}/>
            </div>
            <Controls onSend={handleContentSend} isLoading={isLoading}/>
        </div>
    );
};

export default App;
