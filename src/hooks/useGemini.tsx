import {useCallback, useState} from "react";
import type {messageType} from "../types/types.ts";
import { ai } from "../config/gemini.ts";
import {ThinkingLevel} from "@google/genai";


export const useGemini = () => {
    const [messages, setMessages] = useState<messageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addMessage = (message: messageType) => {
        setMessages((prevMessage) => [...prevMessage, message]);
    };

    const updateLastMessage = (content: string) => {
        setMessages((prev) => prev.map((message, index) =>
            index === prev.length - 1 ? {...message, content} : message
        ));
    };

    const sendMessage = useCallback(async (content: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const chat = ai.chats.create({
                model: "gemini-2.5-flash",
                history: [],
                // config: {
                //     temperature: 0.1,
                //     thinkingConfig: {
                //         thinkingLevel: ThinkingLevel.LOW,
                //     },
                // },
            });

            addMessage({content, role: "user"});
            addMessage({content: '', role: 'assistant'});

            let fullAssistantResponse = '';

            const stream = await chat.sendMessageStream({
                message: content,
            });

            for await (const chunk of stream) {
                fullAssistantResponse += chunk.text;
                updateLastMessage(fullAssistantResponse)

            }
        } catch (err: unknown) {

            setError(err instanceof Error ? err.message : "Сталася помилка при з'єднанні з AI. Спробуйте ще раз.");
        } finally {
            setIsLoading(false);
        }
    }, [])

    return {isLoading, error, sendMessage, messages};
};