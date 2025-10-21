// Gemini API Service for Prompt Enhancement
import { useState, useEffect } from 'react';

// System prompt for Gemini 2.5 Pro prompt enhancement - shortened to save tokens
const SYSTEM_PROMPT = `You are an expert prompt engineering assistant. Enhance the following prompt to make it more effective, clear, and structured. Maintain the original intent and language, add clarity where needed, and keep it concise. Return only the enhanced prompt without any explanation or markdown formatting.`;

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';

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
            console.log('Sending request to Gemini API with prompt:', originalPrompt.substring(0, 100) + '...');
            console.log('Using API URL:', GEMINI_API_URL);
            
            let response;
            let apiUsed = GEMINI_API_URL;
            
            try {
                response = await fetch(
                    `${GEMINI_API_URL}?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                role: "user",
                                parts: [{ text: `${SYSTEM_PROMPT}\n\nEnhance the following prompt:\n\n${originalPrompt}` }]
                            }],
                            generationConfig: {
                                temperature: 0.3,
                                topP: 0.8,
                                topK: 40,
                                maxOutputTokens: 4096,
                                responseMimeType: "text/plain",
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
            } catch (fetchError) {
                console.log('First API attempt failed, trying fallback...');
                // Try with gemini-2.0-pro as fallback
                const fallbackUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro:generateContent';
                apiUsed = fallbackUrl;
                response = await fetch(
                    `${fallbackUrl}?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                role: "user",
                                parts: [{ text: `${SYSTEM_PROMPT}\n\nEnhance the following prompt:\n\n${originalPrompt}` }]
                            }],
                            generationConfig: {
                                temperature: 0.3,
                                topP: 0.8,
                                topK: 40,
                                maxOutputTokens: 4096,
                                responseMimeType: "text/plain",
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
            }

            if (!response.ok) {
                const errorData = await response.text();
                console.error('API Error Response:', errorData);
                try {
                    const parsedError = JSON.parse(errorData);
                    throw new Error(parsedError.error?.message || `Failed to enhance prompt (HTTP ${response.status})`);
                } catch {
                    throw new Error(`Failed to enhance prompt (HTTP ${response.status}): ${errorData}`);
                }
            }

            const responseText = await response.text();
            console.log('Raw API Response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse API response:', parseError, 'Response:', responseText);
                throw new Error('Invalid JSON response from Gemini API');
            }
            
            // Check for different possible response structures
            let enhancedPrompt;
            
            console.log('Analyzing response structure...');
            
            // Standard Gemini response structure
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                enhancedPrompt = data.candidates[0].content.parts[0].text;
                console.log('Found enhanced prompt using standard structure');
            }
            // Gemini 2.5 Pro might have different structure
            else if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                enhancedPrompt = data.candidates[0].content.parts.find(part => part.text)?.text;
                console.log('Found enhanced prompt using parts find structure');
            }
            // Another possible structure
            else if (data.contents && data.contents[0] && data.contents[0].parts && data.contents[0].parts[0]) {
                enhancedPrompt = data.contents[0].parts[0].text;
                console.log('Found enhanced prompt using contents structure');
            }
            // Try to find text in any nested structure
            else if (data.candidates && data.candidates[0]) {
                const candidate = data.candidates[0];
                if (candidate.content && candidate.content.parts) {
                    enhancedPrompt = candidate.content.parts.find(part => part.text)?.text;
                    console.log('Found enhanced prompt in candidate content parts');
                } else if (candidate.output && candidate.output.text) {
                    enhancedPrompt = candidate.output.text;
                    console.log('Found enhanced prompt in candidate output');
                }
            }
            // Fallback: deep search for any text field
            else {
                console.log('Deep searching for text in response...');
                const searchText = (obj) => {
                    if (typeof obj === 'string' && obj.length > 10) return obj;
                    if (obj && typeof obj === 'object') {
                        for (const key in obj) {
                            if (key === 'text') {
                                if (typeof obj[key] === 'string' && obj[key].length > 10) {
                                    return obj[key];
                                }
                            } else {
                                const result = searchText(obj[key]);
                                if (result) return result;
                            }
                        }
                    }
                    return null;
                };
                
                enhancedPrompt = searchText(data);
                if (enhancedPrompt) {
                    console.log('Found enhanced text through deep search');
                }
            }

            if (!enhancedPrompt) {
                console.error('Unexpected API response structure:', data);
                console.error('Available keys in response:', Object.keys(data));
                if (data.candidates && data.candidates[0]) {
                    console.error('First candidate keys:', Object.keys(data.candidates[0]));
                    if (data.candidates[0].content) {
                        console.error('Content keys:', Object.keys(data.candidates[0].content));
                        if (data.candidates[0].content.parts) {
                            console.error('Parts:', data.candidates[0].content.parts);
                        }
                    }
                }
                throw new Error(`No enhanced prompt returned from API (${apiUsed}). Please check the console for the full response structure.`);
            }

            return enhancedPrompt.trim();

        } catch (err) {
            console.error('Gemini API Error:', err);
            
            // Provide more specific error messages
            let errorMessage = 'Failed to enhance prompt';
            
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                errorMessage = 'Network error: Unable to connect to Gemini API. Please check your internet connection.';
            } else if (err.message.includes('API key')) {
                errorMessage = 'API key configuration error. Please check your API key in the .env file.';
            } else if (err.message.includes('HTTP')) {
                errorMessage = `API request failed: ${err.message}`;
            } else if (err.message.includes('No enhanced prompt')) {
                errorMessage = 'Gemini API returned an unexpected response format.';
            } else {
                errorMessage = err.message || 'An unexpected error occurred while enhancing the prompt.';
            }
            
            setError(errorMessage);
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