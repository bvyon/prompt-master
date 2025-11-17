// More accurate token counter based on GPT tokenization patterns
export function estimateTokens(text) {
    if (!text) return 0;

    // Count alphanumeric characters (roughly 1 token per 4 characters)
    const alphaNumChars = text.replace(/[^a-zA-Z0-9]/g, '').length;
    // Count punctuation and special characters (roughly 1 token per 2 characters)
    const specialChars = text.replace(/[a-zA-Z0-9\s]/g, '').length;
    // Count whitespace (roughly 1 token per word break)
    const wordBreaks = text.split(/\s+/).length - 1;

    // Rough estimation: alphanumeric ~1:4, special chars ~1:2, word breaks ~1:1
    const tokenEstimate = Math.ceil((alphaNumChars / 4) + (specialChars / 2) + wordBreaks);

    return Math.max(1, tokenEstimate); // Minimum 1 token
}

// Calculate readability level based on text complexity
export function calculateReadabilityLevel(text) {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgWordsPerSentence = words / sentences;
    const avgWordLength = text.replace(/\s/g, '').length / words;
    
    if (avgWordsPerSentence < 10 && avgWordLength < 5) return 'simple';
    if (avgWordsPerSentence < 20 && avgWordLength < 6) return 'medium';
    return 'complex';
}

// Calculate creativity indicator based on temperature and top_p
export function calculateCreativity(temperature, top_p) {
    const creativityScore = (temperature + top_p) / 2;
    if (creativityScore < 0.3) return 'low';
    if (creativityScore < 0.7) return 'medium';
    return 'high';
}

// Build the optimized prompt based on user selections
export function buildOptimizedPrompt(config) {
    const {
        prompt,
        activeOperators,
        temperature,
        top_p,
        maxTokens,
        role,
        tone,
        audience,
        format,
        enhancedPrompt
    } = config;
    
    let optimizedPrompt = '';
    
    // Add role if specified
    if (role) {
        optimizedPrompt += `/ROLE: ${role}\n`;
    }
    
    // Add tone if specified
    if (tone) {
        optimizedPrompt += `/TONE: ${tone}\n`;
    }
    
    // Add audience if specified
    if (audience) {
        optimizedPrompt += `/AUDIENCE: ${audience}\n`;
    }
    
    // Add format if specified
    if (format) {
        optimizedPrompt += `/FORMAT AS: ${format}\n`;
    }
    
    // Add active operators
    if (activeOperators.length > 0) {
        optimizedPrompt += activeOperators.join('\n') + '\n';
    }
    
    // Add LLM parameters
    optimizedPrompt += `/temperature=${temperature}\n`;
    optimizedPrompt += `/top_p=${top_p}\n`;
    if (maxTokens) {
        optimizedPrompt += `/max_tokens=${maxTokens}\n`;
    }
    
    // Add the actual prompt (use enhanced prompt if available)
    const finalPrompt = enhancedPrompt || prompt;
    optimizedPrompt += `PROMPT: ${finalPrompt}`;
    
    return optimizedPrompt;
}

// Optimized prompt construction for Gemini enhancement - more efficient structure
export function buildPromptForGeminiEnhancement(config) {
    const { prompt, role, tone, audience, format } = config;

    // If no contextual information, return simplified prompt directly
    if (!role && !tone && !audience && !format) {
        return prompt;
    }

    // Structured enhancement with clear semantic separators
    const parts = [];

    if (role) parts.push(`ROLE: ${role}`);
    if (tone) parts.push(`TONE: ${tone}`);
    if (audience) parts.push(`AUDIENCE: ${audience}`);
    if (format) parts.push(`FORMAT: ${format}`);

    parts.push(`PROMPT: ${prompt}`);

    return parts.join('\n');
}

// Get operator by name
export function getOperatorByName(operators, name) {
    return operators.find(op => op.operator === name);
}

// Get operators by category
export function getOperatorsByCategory(operators, category) {
    return operators.filter(op => op.category === category);
}

// Format readability level for display
export function formatReadabilityLevel(level) {
    const levels = {
        simple: 'Simple',
        medium: 'Medium',
        complex: 'Complex'
    };
    return levels[level] || level;
}

// Format creativity level for display
export function formatCreativityLevel(level) {
    const levels = {
        low: 'Low',
        medium: 'Medium',
        high: 'High'
    };
    return levels[level] || level;
}
