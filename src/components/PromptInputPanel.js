import React, { useState, useMemo, useCallback, memo } from 'react';
import * as framerMotion from 'framer-motion';
const { motion } = framerMotion;
import * as promptBuilder from '../utils/promptBuilder';
import { getColorClasses } from '../utils/colorClasses';

const PromptInputPanel = memo(({
    prompt,
    setPrompt,
    activeOperators,
    setActiveOperators,
    operators,
    disabled = false,
    onGenerate = null,
    isEnhancing,
    enhancementError,
    onEnhance
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Filter operators based on search term and category (memoized)
    const filteredOperators = useMemo(() => {
        let filtered = operators;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(op => op.category === selectedCategory);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(op => 
                op.operator.toLowerCase().includes(term) ||
                op.description.toLowerCase().includes(term)
            );
        }
        return filtered;
    }, [searchTerm, selectedCategory, operators]);

    const categories = useMemo(() => {
        if (!operators || operators.length === 0) return ['all'];
        return ['all', ...new Set(operators.map(op => op.category))];
    }, [operators]);

    // Memoized toggle operator function
    const toggleOperator = useCallback((operator) => {
        const isActive = activeOperators.includes(operator);
        const next = isActive ? activeOperators.filter(op => op !== operator) : [...activeOperators, operator];
        setActiveOperators(next);
    }, [activeOperators, setActiveOperators]);

    const copyToClipboard = useCallback((text) => {
        navigator.clipboard.writeText(text);
        // Toast notification is handled by ToastContext
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 h-full flex flex-col"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    <i className="fas fa-pen-fancy text-blue-500 mr-2"></i>
                    Prompt Input
                </h2>
                <p className="text-gray-600 text-sm">Enter your raw prompt and apply operators</p>
            </div>

            {/* Textarea for prompt input */}
            <div className="mb-6 flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <i className="fas fa-lightbulb text-yellow-500"></i>
                    Your Prompt
                </label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here... (e.g., 'Explain quantum computing in simple terms')"
                    disabled={disabled}
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 bg-white/50 hover:bg-white/70"
                />
            </div>

            {/* Search and filter */}
            <div className="mb-4">
                <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search operators..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 hover:bg-white/70"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 hover:bg-white/70"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quick Operators */}
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <i className="fas fa-bolt text-orange-500"></i>
                    Quick Operators
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    {['/ELI5', '/STEP-BY-STEP', '/EXEC SUMMARY', '/CHAIN OF THOUGHT'].map(op => {
                        const operator = promptBuilder.getOperatorByName(operators, op);
                        if (!operator) return null;
                        const color = getColorClasses(operator.color);
                        return (
                            <button
                                key={op}
                                onClick={() => !disabled && toggleOperator(op)}
                                disabled={disabled}
                                className={`operator-badge px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                    activeOperators.includes(op)
                                        ? `${color.bgSolid} ${color.textSolid} shadow-md`
                                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                            >
                                {op}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* All operators */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <i className="fas fa-list text-purple-500"></i>
                    All Operators
                </h3>
                <div className="grid grid-cols-1 gap-2 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto pr-2">
                    {filteredOperators.length === 0 && (
                        <div className="p-4 text-sm text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <i className="fas fa-search-minus mr-2"></i>
                            No operators match your filters. Try clearing the search or selecting a different category.
                        </div>
                    )}
                    {filteredOperators.map(operator => {
                        const classes = getColorClasses(operator.color);
                        return (
                            <motion.button
                                key={operator.operator}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => !disabled && toggleOperator(operator.operator)}
                                disabled={disabled}
                                className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                                    activeOperators.includes(operator.operator)
                                        ? `${classes.border} ${classes.bg} shadow-md`
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`font-semibold ${
                                        activeOperators.includes(operator.operator)
                                            ? classes.text
                                            : 'text-gray-800'
                                    }`}>
                                        {operator.operator}
                                    </span>
                                    {activeOperators.includes(operator.operator) && (
                                        <i className="fas fa-check-circle text-xs"></i>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                    {operator.description}
                                </p>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Active operators display */}
            {activeOperators.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                            <i className="fas fa-check-double"></i>
                            Active Operators
                        </h4>
                        <button
                            onClick={() => setActiveOperators([])}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {activeOperators.map(op => {
                            const operator = promptBuilder.getOperatorByName(operators, op);
                            if (!operator) return null;
                            const classes = getColorClasses(operator.color);
                            return (
                                <span
                                    key={op}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${classes.bg} ${classes.text} shadow-sm`}
                                >
                                    {op}
                                </span>
                            );
                        })}
                    </div>
                </motion.div>
            )}
            
            {/* Gemini Enhancement Button */}
            <div className="mt-4">
                <button
                    onClick={onEnhance}
                    disabled={!prompt || disabled || isEnhancing || !onEnhance}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-semibold disabled:shadow-none"
                    aria-label="Enhance your prompt with Gemini"
                >
                    <i className={`fas ${isEnhancing ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                    {isEnhancing ? 'Enhancing...' : 'Enhance with Gemini AI'}
                </button>
                
                {enhancementError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl"
                        role="alert"
                    >
                        <div className="flex items-start gap-2 text-red-700 text-sm">
                            <i className="fas fa-exclamation-circle mt-0.5"></i>
                            <span className="flex-1">{enhancementError}</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
});

PromptInputPanel.displayName = 'PromptInputPanel';

export default PromptInputPanel;
