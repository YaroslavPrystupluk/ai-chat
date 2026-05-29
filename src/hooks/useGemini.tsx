import {useCallback, useState} from "react";
import type {messageType} from "../types/types.ts";
import {chat} from "../config/gemini.ts";


export const useGemini = () => {
    const [messages, setMessages] = useState<messageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addMessage = (message: messageType) => {
        setMessages((prevMessage) => [...prevMessage, message]);
    };

    const sendMessage  = useCallback(async (content: string) => {
        setIsLoading(true);
        setError(null);
        try {
            addMessage({content, role: "user"});
            const stream = await chat.sendMessageStream({
                message: content,
            });

            for await (const chunk of stream) {
                console.log(chunk)
                addMessage({content: chunk.text, role: 'assistant'} );

            }
        } catch (err: unknown) {

            setError(err instanceof Error ? err.message : "Сталася помилка при з'єднанні з AI. Спробуйте ще раз.");
        } finally {
            setIsLoading(false);
        }
    }, [])

    return {isLoading, error, sendMessage, messages };
};