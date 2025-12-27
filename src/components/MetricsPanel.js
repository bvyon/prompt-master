import React from 'react';
import * as framerMotion from 'framer-motion';
const { motion } = framerMotion;
import * as promptBuilder from '../utils/promptBuilder';

const MetricsPanel = ({ config }) => {
    // Use enhanced prompt if available, otherwise use original prompt
    const currentPrompt = config.enhancedPrompt || config.prompt;
    const inputTokens = promptBuilder.estimateTokens(currentPrompt);
    const outputTokens = config.maxTokens || 1000;
    const totalTokens = inputTokens + outputTokens;
    const readability = promptBuilder.calculateReadabilityLevel(currentPrompt);
    const creativity = promptBuilder.calculateCreativity(config.temperature, config.top_p);

    const getReadabilityColor = (level) => {
        switch (level) {
            case 'simple': return 'text-green-600 bg-green-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'complex': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getCreativityColor = (level) => {
        switch (level) {
            case 'low': return 'text-blue-600 bg-blue-50';
            case 'medium': return 'text-purple-600 bg-purple-50';
            case 'high': return 'text-pink-600 bg-pink-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getEfficiencyScore = () => {
        if (totalTokens < 500) return { score: 90, label: 'Excellent' };
        if (totalTokens < 1000) return { score: 75, label: 'Good' };
        if (totalTokens < 2000) return { score: 60, label: 'Fair' };
        return { score: 45, label: 'Needs Improvement' };
    };

    const efficiency = getEfficiencyScore();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    <i className="fas fa-chart-line text-indigo-500 mr-2"></i>
                    Prompt Metrics
                </h2>
                <p className="text-gray-600">Analyze your prompt's effectiveness</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Token Count */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-blue-800">Token Usage</h3>
                        <i className="fas fa-coins text-blue-600"></i>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-blue-700">Input:</span>
                            <span className="font-bold text-blue-900">{inputTokens}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-blue-700">Output:</span>
                            <span className="font-bold text-blue-900">{outputTokens}</span>
                        </div>
                        <div className="flex justify-between border-t border-blue-200 pt-2">
                            <span className="text-sm font-semibold text-blue-800">Total:</span>
                            <span className="font-bold text-blue-900">{totalTokens}</span>
                        </div>
                    </div>
                </div>

                {/* Readability */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-green-800">Readability</h3>
                        <i className="fas fa-book-open text-green-600"></i>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getReadabilityColor(readability)}`}>
                        {promptBuilder.formatReadabilityLevel(readability)}
                    </div>
                    <div className="mt-2 text-xs text-green-700">
                        {readability === 'simple' && 'Easy to understand for most readers'}
                        {readability === 'medium' && 'Moderate complexity, suitable for general audience'}
                        {readability === 'complex' && 'High complexity, requires subject knowledge'}
                    </div>
                </div>

                {/* Creativity */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-purple-800">Creativity</h3>
                        <i className="fas fa-palette text-purple-600"></i>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCreativityColor(creativity)}`}>
                        {promptBuilder.formatCreativityLevel(creativity)}
                    </div>
                    <div className="mt-2 text-xs text-purple-700">
                        {creativity === 'low' && 'Deterministic, focused facts'}
                        {creativity === 'medium' && 'Balanced creativity and structure'}
                        {creativity === 'high' && 'Highly creative, diverse responses'}
                    </div>
                </div>

                {/* Efficiency */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-indigo-800">Efficiency</h3>
                        <i className="fas fa-tachometer-alt text-indigo-600"></i>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="text-2xl font-bold text-indigo-900">{efficiency.score}</div>
                            <div className="text-xs text-indigo-700">{efficiency.label}</div>
                        </div>
                        <div className="w-16 h-16 relative">
                            <svg className="w-16 h-16 transform -rotate-90">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#e0e7ff"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#4f46e5"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={176}
                                    strokeDashoffset={176 - (176 * efficiency.score) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Metrics */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Detailed Analysis</h3>
                <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-gray-800">
                            {currentPrompt.split(/\s+/).length}
                        </div>
                        <div className="text-gray-600">Words</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-gray-800">
                            {currentPrompt.split(/[.!?]+/).filter(s => s.trim().length > 0).length}
                        </div>
                        <div className="text-gray-600">Sentences</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-gray-800">
                            {config.activeOperators?.length || 0}
                        </div>
                        <div className="text-gray-600">Operators</div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    <i className="fas fa-lightbulb mr-2"></i>
                    Recommendations
                </h3>
                <ul className="text-xs text-blue-700 space-y-1">
                    {totalTokens > 2000 && (
                        <li>• Consider reducing max_tokens to improve efficiency</li>
                    )}
                    {readability === 'complex' && config.audience !== 'expert' && (
                        <li>• Simplify language for better audience understanding</li>
                    )}
                    {creativity === 'low' && config.temperature < 0.5 && (
                        <li>• Increase temperature for more creative responses</li>
                    )}
                    {!config.role && (
                        <li>• Add a role for more targeted responses</li>
                    )}
                    {config.activeOperators.length === 0 && (
                        <li>• Try adding operators to enhance prompt structure</li>
                    )}
                </ul>
            </div>
        </motion.div>
    );
};

export default MetricsPanel;
