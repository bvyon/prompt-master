// Gemini API Service for Prompt Enhancement
import { useState, useEffect } from 'react';

// System prompt for Gemini 2.5 Pro prompt enhancement
const SYSTEM_PROMPT = `You are an expert prompt engineering assistant specializing in enhancing and optimizing prompts for large language models. Your task is to analyze and improve user prompts to make them more effective, clear, and structured.

When enhancing prompts, follow these guidelines:
1. Maintain the original intent and meaning of the user's prompt
2. Add structure and clarity where needed
3. Suggest appropriate operators or formatting if beneficial
4. Keep the enhanced prompt concise but comprehensive
5. Ensure the prompt is well-organized and easy for an LLM to understand
6. Consider the context and purpose of the prompt
7. Add relevant context if it would improve the prompt's effectiveness

Return only the enhanced prompt without any additional explanation or commentary. Do not include any markdown formatting, just the plain enhanced prompt text.`;

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export const useGeminiEnhancement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        // Load API key from environment variable
        const envApiKey = process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        setApiKey(envApiKey);
    }, []);

    const enhancePrompt = async (originalPrompt) => {
        if (!apiKey) {
            setError('Gemini API key not configured');
            return null;
        }

        if (!originalPrompt || originalPrompt.trim() === '') {
            setError('No prompt provided for enhancement');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${GEMINI_API_URL}?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                {
                                    text: `${SYSTEM_PROMPT}\n\nEnhance the following prompt:\n\n${originalPrompt}`
                                }
                            ]
                        }],
                        generationConfig: {
                            temperature: 0.3,
                            topP: 0.8,
                            topK: 40,
                            maxOutputTokens: 1024,
                        },
                        safetySettings: [
                            {
                                category: "HARM_CATEGORY_HARASSMENT",
                                threshold: "BLOCK_NONE"
                            },
                            {
                                category: "HARM_CATEGORY_HATE_SPEECH", 
                                threshold: "BLOCK_NONE"
                            },
                            {
                                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                threshold: "BLOCK_NONE"
                            },
                            {
                                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                                threshold: "BLOCK_NONE"
                            }
                        ]
                    })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to enhance prompt');
            }

            const data = await response.json();
            const enhancedPrompt = data.candidates[0]?.content?.parts[0]?.text;

            if (!enhancedPrompt) {
                throw new Error('No enhanced prompt returned from API');
            }

            return enhancedPrompt.trim();

        } catch (err) {
            console.error('Gemini API Error:', err);
            setError(err.message || 'Failed to enhance prompt');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        enhancePrompt,
        isLoading,
        error,
        apiKey: apiKey ? 'configured' : 'not configured'
    };
};

export default useGeminiEnhancement;