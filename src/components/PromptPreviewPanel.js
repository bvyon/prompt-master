import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as promptBuilder from '../utils/promptBuilder';
import { getColorClasses } from '../utils/colorClasses';
import { useToast } from '../contexts/ToastContext';

const PromptPreviewPanel = ({
    config,
    operators,
    optimizedPrompt: optimizedPromptProp = '',
    isEnhancing = false,
    enhancementError = null
}) => {
    const [showExplanation, setShowExplanation] = useState(false);

    const optimizedPrompt = useMemo(() => optimizedPromptProp || promptBuilder.buildOptimizedPrompt(config), [optimizedPromptProp, config]);
    const hasEnhancement = useMemo(() => config.enhancedPrompt && config.enhancedPrompt !== config.prompt, [config.enhancedPrompt, config.prompt]);
    const inputTokens = useMemo(() => promptBuilder.estimateTokens(config.prompt), [config.prompt]);
    const outputTokens = config.maxTokens || 1000;
    const readability = useMemo(() => promptBuilder.calculateReadabilityLevel(config.prompt), [config.prompt]);
    const creativity = useMemo(() => promptBuilder.calculateCreativity(config.temperature, config.top_p), [config.temperature, config.top_p]);

    const { showSuccess, showError } = useToast();

    const copyToClipboard = async (text, section = 'optimized prompt') => {
        try {
            await navigator.clipboard.writeText(text);
            showSuccess(`Copied ${section} to clipboard!`);
        } catch (err) {
            console.error('Failed to copy: ', err);
            showError('Failed to copy to clipboard');
        }
    };

    const getOperatorExplanation = (operatorName) => {
        const operator = operators.find(op => op.operator === operatorName);
        return operator ? operator.description : 'No description available';
    };

    const formatConfigForDisplay = () => {
        const lines = optimizedPrompt.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('/ROLE:') || line.startsWith('/TONE:') || 
                line.startsWith('/AUDIENCE:') || line.startsWith('/FORMAT AS:')) {
                return (
                    <div key={index} className="text-sm">
                        <span className="font-semibold text-purple-600">{line.split(':')[0]}:</span>
                        <span className="text-gray-700 ml-1">{line.split(':').slice(1).join(':')}</span>
                    </div>
                );
            } else if (line.startsWith('/temperature') || line.startsWith('/top_p') || 
                      line.startsWith('/max_tokens')) {
                return (
                    <div key={index} className="text-sm">
                        <span className="font-semibold text-blue-600">{line.split('=')[0]}=</span>
                        <span className="text-gray-700">{line.split('=')[1]}</span>
                    </div>
                );
            } else if (line.startsWith('PROMPT:')) {
                return (
                    <div key={index} className="mt-3">
                        <span className="font-semibold text-green-600">PROMPT:</span>
                        <div className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {line.split('PROMPT: ')[1]}
                        </div>
                    </div>
                );
            } else if (line.startsWith('/')) {
                const operatorName = line.trim();
                const operator = operators.find(op => op.operator === operatorName);
                return (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        {(() => {
                            const classes = operator ? getColorClasses(operator.color) : getColorClasses('gray');
                            return (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${classes.bg} ${classes.text}`}>
                                    {operatorName}
                                </span>
                            );
                        })()}
                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            <i className="fas fa-info-circle"></i>
                        </button>
                        {showExplanation && (
                            <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded">
                                {getOperatorExplanation(operatorName)}
                            </div>
                        )}
                    </div>
                );
            }
            return null;
        }).filter(Boolean);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
        >
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            <i className="fas fa-eye text-green-500 mr-2"></i>
                            Optimized Prompt
                        </h2>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-600">Real-time preview of your enhanced prompt</p>
                            {hasEnhancement && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                    <i className="fas fa-magic mr-1"></i>
                                    Enhanced
                                </span>
                            )}
                            {isEnhancing && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                    <i className="fas fa-spinner fa-spin mr-1"></i>
                                    Enhancing...
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => copyToClipboard(optimizedPrompt, 'optimized prompt')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isEnhancing || !optimizedPrompt}
                        >
                            <i className="fas fa-copy"></i>
                            Copy Optimized
                        </button>
                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                        >
                            <i className="fas fa-question-circle"></i>
                            Explain
                        </button>
                    </div>
                </div>
                
                {enhancementError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center text-red-700 text-sm">
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            Enhancement Error: {enhancementError}
                        </div>
                    </div>
                )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{inputTokens}</div>
                    <div className="text-xs text-gray-600">Input Tokens</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{outputTokens}</div>
                    <div className="text-xs text-gray-600">Output Tokens</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {promptBuilder.formatReadabilityLevel(readability)}
                    </div>
                    <div className="text-xs text-gray-600">Readability</div>
                </div>
            </div>

            {/* Creativity indicator */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Creativity Level</span>
                    <span className="text-sm font-medium text-purple-600">
                        {promptBuilder.formatCreativityLevel(creativity)}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className={`h-2 rounded-full ${
                            creativity === 'low' ? 'bg-blue-500' :
                            creativity === 'medium' ? 'bg-purple-500' : 'bg-pink-500'
                        }`}
                        style={{ width: creativity === 'low' ? '33%' : creativity === 'medium' ? '66%' : '100%' }}
                    ></div>
                </div>
            </div>

            {/* Preview sections */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-4">
                {/* Raw Prompt */}
                <section>
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Raw Prompt
                        </h3>
                        <button
                            onClick={() => copyToClipboard(config.prompt || '', 'raw prompt')}
                            disabled={!config.prompt}
                            className="text-[10px] px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <i className="fas fa-copy" aria-hidden="true"></i>
                            Copy
                        </button>
                    </div>
                    <div className="text-xs text-gray-600 bg-white rounded p-2 min-h-[40px]">
                        {config.prompt || 'Start by writing your idea or request here in the Prompt Input panel.'}
                    </div>
                </section>

                {/* Optimized Prompt */}
                <section>
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                            Optimized Prompt (with structure and operators)
                        </h3>
                        <button
                            onClick={() => copyToClipboard(optimizedPrompt || '', 'optimized prompt')}
                            disabled={!optimizedPrompt}
                            className="text-[10px] px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <i className="fas fa-copy" aria-hidden="true"></i>
                            Copy
                        </button>
                    </div>
                    <div className="font-mono text-xs text-gray-800 whitespace-pre-wrap bg-white rounded p-2 min-h-[60px]">
                        {optimizedPrompt
                            ? formatConfigForDisplay()
                            : 'Configure role, tone, audience and apply operators to see the optimized prompt.'}
                    </div>
                </section>

                {/* Enhanced Prompt */}
                <section>
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                            Enhanced Prompt (Gemini)
                        </h3>
                        <button
                            onClick={() => copyToClipboard(config.enhancedPrompt || '', 'enhanced prompt')}
                            disabled={!config.enhancedPrompt}
                            className="text-[10px] px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <i className="fas fa-copy" aria-hidden="true"></i>
                            Copy
                        </button>
                    </div>
                    <div className="text-xs text-gray-700 whitespace-pre-wrap bg-white rounded p-2 min-h-[40px]">
                        {config.enhancedPrompt
                            ? config.enhancedPrompt
                            : 'Use "Enhance with Gemini AI" to generate an upgraded version of your optimized prompt.'}
                    </div>
                </section>
            </div>

            {/* Configuration explanation */}
            {showExplanation && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-3 bg-yellow-50 rounded-lg"
                >
                    <h4 className="font-semibold text-yellow-800 mb-1 text-sm">
                        <i className="fas fa-lightbulb mr-2" aria-hidden="true"></i>
                        How to read these prompts
                    </h4>
                    <div className="text-[11px] text-yellow-800 space-y-1">
                        <p>• Raw Prompt: what you type. Keep it clear and specific.</p>
                        <p>• Optimized Prompt: structured version with role, tone, audience, format and operators.</p>
                        <p>• Enhanced Prompt: Gemini-refined version for maximum quality. Use this in your LLM/chat.</p>
                        <p>• Operators (e.g. /CHAIN OF THOUGHT, /GUARDRAIL): add reasoning depth, safety and control.</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default PromptPreviewPanel;
