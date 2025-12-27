// Gemini API Service for Prompt Enhancement
import { useState, useEffect } from 'react';

// Enhanced system prompt with comprehensive examples and best practices
const SYSTEM_PROMPT = `/ROLE: prompt engineer
/TONE: direct
/AUDIENCE: general
/FORMAT AS: plain text
/NO AUTOPILOT
/temperature=0.4
/top_p=0.9
/max_tokens=600
PROMPT: Vas a recibir un PROMPT base (con o sin operadores). Tu tarea es devolver un “PROMPT enhanced” más claro, específico y ejecutable, SIN extenderlo demasiado.

Reglas:
1) Conserva intención, idioma y alcance del prompt base.
2) Agrega solo lo imprescindible para reducir ambigüedad: objetivo, contexto mínimo, audiencia/destino, formato de salida, criterios de calidad y restricciones (lo que se debe/NO se debe hacer).
3) No hagas preguntas. Si falta un dato crítico, asume de forma neutral y explícitalo en 3–7 palabras.
4) Evita relleno, teoría y redundancias. No repitas instrucciones equivalentes.
5) Mantén operadores existentes; solo añade operadores si aportan control real.
6) Devuelve SOLO el prompt final en formato Prompt Master: operadores + “PROMPT: …”. Sin notas ni explicación.
7) Límite recomendado: 90–160 palabras (excepción: si el entregable exige más).

INPUT (pega aquí el prompt base):
<<<PEGA_AQUÍ_EL_PROMPT_BASE>>>
`;

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
