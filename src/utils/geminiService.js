// Gemini API Service for Prompt Enhancement
import { useState, useEffect } from 'react';

// Enhanced system prompt with comprehensive examples and best practices
const SYSTEM_PROMPT = `You are an expert prompt engineer. Your task is to enhance user prompts to make them more effective, clear, and specific for AI language models.

## Enhancement Principles:
1. Add clarity and specificity
2. Include relevant context and constraints
3. Use action-oriented language
4. Structure the prompt logically
5. Maintain the original intent

## Enhancement Guidelines:
- Add concrete details and examples where needed
- Specify desired output format and structure
- Include relevant domain expertise context
- Add constraints or parameters when appropriate
- Improve readability while keeping it concise
- Preserve the core request and intent

## Examples of Enhancement:

### Example 1: Simple Request
Input: "write about cats"
Enhanced Output: "Write a comprehensive article about domestic cats (Felis catus) covering their physical characteristics, behavioral patterns, care requirements, breeds, and their historical relationship with humans as pets. Include practical advice for potential cat owners."

### Example 2: Explanation Request
Input: "explain photosynthesis"
Enhanced Output: "Explain the biological process of photosynthesis in plants, including the light-dependent reactions and Calvin cycle. Detail the chemical equation (6CO2 + 6H2O + light energy → C6H12O6 + 6O2), the role of chloroplasts, and the importance of photosynthesis for Earth's ecosystems and oxygen production."

### Example 3: Technical Topic
Input: "how does machine learning work"
Enhanced Output: "Explain the fundamental concepts of machine learning, including supervised, unsupervised, and reinforcement learning. Describe key algorithms like neural networks, decision trees, and support vector machines. Discuss training data, model evaluation metrics, and practical applications in various industries."

### Example 4: Creative Request
Input: "write a story about space exploration"
Enhanced Output: "Write an engaging science fiction story about humanity's first interstellar expedition. Include detailed descriptions of the spacecraft technology, the challenges of deep space travel, alien encounters, and the emotional journey of the crew members. Balance scientific accuracy with narrative tension."

## Instructions:
Enhance the following prompt according to the principles above. Make it more specific, clear, and effective while maintaining the original intent. Do not add information not implied by the request, but do fill in reasonable context and details that would help an AI produce better results.`;

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const FALLBACK_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Common API request configuration
const createApiRequestBody = (prompt) => ({
    contents: [{
        role: "user",
        parts: [{ text: `${SYSTEM_PROMPT}\n\nInput Prompt:\n${prompt}\n\nEnhanced Prompt:` }]
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
});

export const useGeminiEnhancement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        // Load API key from environment variable
        const envApiKey = process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (process.env.NODE_ENV === 'development') {
            console.log('API Key status:', envApiKey ? 'loaded' : 'not loaded');
        }
        setApiKey(envApiKey);
    }, []);

    const enhancePrompt = async (originalPrompt) => {
        if (!apiKey) {
            setError('Gemini API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.');
            return null;
        }

        if (!originalPrompt || originalPrompt.trim() === '') {
            setError('No prompt provided for enhancement');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('Sending request to Gemini API...');
            console.log('Input prompt length:', originalPrompt.length);
            
            let response;
            let apiUsed = GEMINI_API_URL;
            const requestBody = createApiRequestBody(originalPrompt);
            
            try {
                response = await fetch(
                    `${GEMINI_API_URL}?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody)
                    }
                );
            } catch (fetchError) {
                console.log('Primary API endpoint failed, trying fallback...');
                apiUsed = FALLBACK_API_URL;
                response = await fetch(
                    `${FALLBACK_API_URL}?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody)
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
            console.log('Received API response');
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse API response:', parseError);
                throw new Error('Invalid JSON response from Gemini API');
            }
            
            // Extract enhanced prompt from API response
            const enhancedPrompt = extractEnhancedPrompt(data, apiUsed);
            if (!enhancedPrompt) {
                throw new Error(`No enhanced prompt returned from API. Please check the console for details.`);
            }

            console.log('Successfully enhanced prompt');
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

// Extract enhanced prompt from API response
const extractEnhancedPrompt = (data, apiUsed) => {
    console.log('Extracting enhanced prompt from response structure...');
    
    // Standard Gemini response structure
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const enhancedPrompt = data.candidates[0].content.parts[0].text;
        console.log('Found enhanced prompt using standard structure');
        return enhancedPrompt;
    }
    // Gemini 2.5 Flash might have different structure
    else if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const enhancedPrompt = data.candidates[0].content.parts.find(part => part.text)?.text;
        console.log('Found enhanced prompt using parts find structure');
        return enhancedPrompt;
    }
    // Another possible structure
    else if (data.contents && data.contents[0] && data.contents[0].parts && data.contents[0].parts[0]) {
        const enhancedPrompt = data.contents[0].parts[0].text;
        console.log('Found enhanced prompt using contents structure');
        return enhancedPrompt;
    }
    // Try to find text in any nested structure
    else if (data.candidates && data.candidates[0]) {
        const candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts) {
            const enhancedPrompt = candidate.content.parts.find(part => part.text)?.text;
            console.log('Found enhanced prompt in candidate content parts');
            return enhancedPrompt;
        } else if (candidate.output && candidate.output.text) {
            const enhancedPrompt = candidate.output.text;
            console.log('Found enhanced prompt in candidate output');
            return enhancedPrompt;
        }
    }
    // Fallback: deep search for any text field
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
    
    const enhancedPrompt = searchText(data);
    if (enhancedPrompt) {
        console.log('Found enhanced text through deep search');
        return enhancedPrompt;
    }
    
    // If no prompt found, log error details
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
    
    return null;
};

export default useGeminiEnhancement;
