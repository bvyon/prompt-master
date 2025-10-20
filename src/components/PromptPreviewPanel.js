import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as promptBuilder from '../utils/promptBuilder';
import { getColorClasses } from '../utils/colorClasses';

const PromptPreviewPanel = ({
    config,
    operators,
    optimizedPrompt: optimizedPromptProp = '',
    isEnhancing = false,
    enhancementError = null
}) => {
    const [copied, setCopied] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const optimizedPrompt = useMemo(() => optimizedPromptProp || promptBuilder.buildOptimizedPrompt(config), [optimizedPromptProp, config]);
    const hasEnhancement = useMemo(() => config.enhancedPrompt && config.enhancedPrompt !== config.prompt, [config.enhancedPrompt, config.prompt]);
    const inputTokens = useMemo(() => promptBuilder.estimateTokens(config.prompt), [config.prompt]);
    const outputTokens = config.maxTokens || 1000;
    const readability = useMemo(() => promptBuilder.calculateReadabilityLevel(config.prompt), [config.prompt]);
    const creativity = useMemo(() => promptBuilder.calculateCreativity(config.temperature, config.top_p), [config.temperature, config.top_p]);

    const copyToClipboard = async () => {
        try {
            const toCopy = optimizedPrompt;
            await navigator.clipboard.writeText(toCopy);
            setCopied(true);
            // disable for a short period to avoid repeated clicks
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy: ', err);
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
                            onClick={copyToClipboard}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isEnhancing}
                        >
                            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                            {copied ? 'Copied!' : 'Copy'}
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

            {/* Preview */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                <div className="font-mono text-sm whitespace-pre-wrap">
                    {formatConfigForDisplay()}
                </div>
            </div>

            {/* Configuration explanation */}
            {showExplanation && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-yellow-50 rounded-lg"
                >
                    <h4 className="font-semibold text-yellow-800 mb-2">
                        <i className="fas fa-lightbulb mr-2"></i>
                        Configuration Explanation
                    </h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                        <p>• <strong>Role:</strong> Defines the persona the AI should adopt</p>
                        <p>• <strong>Tone:</strong> Sets the communication style</p>
                        <p>• <strong>Audience:</strong> Tailors complexity to the target audience</p>
                        <p>• <strong>Format:</strong> Specifies the output structure</p>
                        <p>• <strong>Temperature:</strong> Controls randomness (0=deterministic, 1=creative)</p>
                        <p>• <strong>Top P:</strong> Controls diversity of word selection</p>
                        <p>• <strong>Max Tokens:</strong> Limits response length</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default PromptPreviewPanel;