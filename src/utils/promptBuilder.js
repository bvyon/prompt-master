// Simple token counter (rough estimation)
export function estimateTokens(text) {
    return Math.ceil(text.length / 4);
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
        format 
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
    
    // Add the actual prompt
    optimizedPrompt += `PROMPT: ${prompt}`;
    
    return optimizedPrompt;
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