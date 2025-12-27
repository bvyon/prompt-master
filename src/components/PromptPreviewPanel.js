import React, { useState, useMemo, memo, useCallback } from 'react';
import * as framerMotion from 'framer-motion';
const { motion } = framerMotion;
import * as promptBuilder from '../utils/promptBuilder';
import { getColorClasses } from '../utils/colorClasses';
import { useToast } from '../contexts/ToastContext';

const PromptPreviewPanel = memo(({
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

    const copyToClipboard = useCallback(async (text, section = 'optimized prompt') => {
        try {
            await navigator.clipboard.writeText(text);
            showSuccess(`Copied ${section} to clipboard!`);
        } catch (err) {
            console.error('Failed to copy: ', err);
            showError('Failed to copy to clipboard');
        }
    }, [showSuccess, showError]);

    const getOperatorExplanation = useCallback((operatorName) => {
        const operator = operators.find(op => op.operator === operatorName);
        return operator ? operator.description : 'No description available';
    }, [operators]);

    const formatConfigForDisplay = useMemo(() => {
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
                        <span className="text-gray-700 font-mono">{line.split('=')[1]}</span>
                    </div>
                );
            } else if (line.startsWith('PROMPT:')) {
                return (
                    <div key={index} className="mt-3">
                        <span className="font-semibold text-green-600">PROMPT:</span>
                        <div className="mt-1 text-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100">
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
                                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${classes.bg} ${classes.text} shadow-sm`}>
                                    {operatorName}
                                </span>
                            );
                        })()}
                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <i className="fas fa-info-circle"></i>
                        </button>
                        {showExplanation && (
                            <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded-xl border border-yellow-100">
                                {getOperatorExplanation(operatorName)}
                            </div>
                        )}
                    </div>
                );
            }
            return null;
        }).filter(Boolean);
    }, [optimizedPrompt, operators, showExplanation, getOperatorExplanation]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 h-full flex flex-col"
        >
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                            <i className="fas fa-eye text-green-500 mr-2"></i>
                            Optimized Prompt
                        </h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-gray-600 text-sm">Real-time preview of your enhanced prompt</p>
                            {hasEnhancement && (
                                <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-semibold shadow-sm">
                                    <i className="fas fa-wand-magic-sparkles mr-1"></i>
                                    Enhanced
                                </span>
                            )}
                            {isEnhancing && (
                                <span className="px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 text-xs rounded-full font-semibold shadow-sm">
                                    <i className="fas fa-circle-notch fa-spin mr-1"></i>
                                    Enhancing...
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => copyToClipboard(optimizedPrompt, 'optimized prompt')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            disabled={isEnhancing || !optimizedPrompt}
                        >
                            <i className="fas fa-copy"></i>
                            Copy
                        </button>
                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg ${
                                showExplanation 
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
                                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                            }`}
                        >
                            <i className="fas fa-question-circle"></i>
                            Explain
                        </button>
                    </div>
                </div>
                
                {enhancementError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl"
                    >
                        <div className="flex items-center text-red-700 text-sm">
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            Enhancement Error: {enhancementError}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center border border-blue-100 shadow-sm"
                >
                    <div className="text-2xl font-bold text-blue-600">{inputTokens}</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">Input Tokens</div>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-100 shadow-sm"
                >
                    <div className="text-2xl font-bold text-green-600">{outputTokens}</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">Output Tokens</div>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center border border-purple-100 shadow-sm"
                >
                    <div className="text-lg font-bold text-purple-600">
                        {promptBuilder.formatReadabilityLevel(readability)}
                    </div>
                    <div className="text-xs text-gray-600 font-medium mt-1">Readability</div>
                </motion.div>
            </div>

            {/* Creativity indicator */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <i className="fas fa-palette text-purple-500"></i>
                        Creativity Level
                    </span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        creativity === 'low' ? 'bg-blue-100 text-blue-700' :
                        creativity === 'medium' ? 'bg-purple-100 text-purple-700' : 'bg-pink-100 text-pink-700'
                    }`}>
                        {promptBuilder.formatCreativityLevel(creativity)}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: creativity === 'low' ? '33%' : creativity === 'medium' ? '66%' : '100%' }}
                        transition={{ duration: 0.5 }}
                        className={`h-2.5 rounded-full ${
                            creativity === 'low' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            creativity === 'medium' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-pink-500 to-red-500'
                        }`}
                    ></motion.div>
                </div>
            </div>

            {/* Preview sections */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 overflow-y-auto space-y-4 border border-gray-200">
                {/* Raw Prompt */}
                <section>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                            <i className="fas fa-file-alt text-gray-500"></i>
                            Raw Prompt
                        </h3>
                        <button
                            onClick={() => copyToClipboard(config.prompt || '', 'raw prompt')}
                            disabled={!config.prompt}
                            className="text-[10px] px-3 py-1.5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium transition-all"
                        >
                            <i className="fas fa-copy" aria-hidden="true"></i>
                            Copy
                        </button>
                    </div>
                    <div className="text-xs text-gray-600 bg-white rounded-xl p-3 min-h-[40px] border border-gray-200">
                        {config.prompt || 'Start by writing your idea or request here in the Prompt Input panel.'}
                    </div>
                </section>

                {/* Optimized Prompt */}
                <section>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                            <i className="fas fa-wand-magic-sparkles text-blue-500"></i>
                            Optimized Prompt
                        </h3>
                        <button
                            onClick={() => copyToClipboard(optimizedPrompt || '', 'optimized prompt')}
                            disabled={!optimizedPrompt}
                            className="text-[10px] px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-semibold shadow-sm transition-all"
                        >
                            <i className="fas fa-copy" aria-hidden="true"></i>
                            Copy
                        </button>
                    </div>
                    <div className="font-mono text-xs text-gray-800 whitespace-pre-wrap bg-white rounded-xl p-3 min-h-[60px] border-2 border-blue-200">
                        {optimizedPrompt
                            ? formatConfigForDisplay
                            : 'Configure role, tone, audience and apply operators to see the optimized prompt.'}
                    </div>
                </section>

                {/* Enhanced Prompt */}
                <section>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
                            <i className="fas fa-sparkles text-purple-500"></i>
                            Enhanced Prompt (Gemini)
                        </h3>
                        <button
                            onClick={() => copyToClipboard(config.enhancedPrompt || '', 'enhanced prompt')}
                            disabled={!config.enhancedPrompt}
                            className="text-[10px] px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-semibold shadow-sm transition-all"
                        >
                            <i className="fas fa-copy" aria-hidden="true"></i>
                            Copy
                        </button>
                    </div>
                    <div className="text-xs text-gray-700 whitespace-pre-wrap bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 min-h-[40px] border-2 border-purple-200">
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
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
                >
                    <h4 className="font-bold text-yellow-800 mb-2 text-sm flex items-center gap-2">
                        <i className="fas fa-lightbulb" aria-hidden="true"></i>
                        How to read these prompts
                    </h4>
                    <div className="text-[11px] text-yellow-900 space-y-1.5">
                        <p className="flex items-start gap-2">
                            <i className="fas fa-file-alt text-yellow-600 mt-0.5"></i>
                            <span><strong>Raw Prompt:</strong> what you type. Keep it clear and specific.</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <i className="fas fa-wand-magic-sparkles text-blue-600 mt-0.5"></i>
                            <span><strong>Optimized Prompt:</strong> structured version with role, tone, audience, format and operators.</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <i className="fas fa-sparkles text-purple-600 mt-0.5"></i>
                            <span><strong>Enhanced Prompt:</strong> Gemini-refined version for maximum quality. Use this in your LLM/chat.</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <i className="fas fa-cogs text-green-600 mt-0.5"></i>
                            <span><strong>Operators:</strong> (e.g. /CHAIN OF THOUGHT, /GUARDRAIL) add reasoning depth, safety and control.</span>
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
});

PromptPreviewPanel.displayName = 'PromptPreviewPanel';

export default PromptPreviewPanel;
