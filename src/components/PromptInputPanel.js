import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as promptBuilder from '../utils/promptBuilder';
import { getColorClasses } from '../utils/colorClasses';

const PromptInputPanel = ({ 
    prompt, 
    setPrompt, 
    activeOperators, 
    setActiveOperators,
    operators 
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

    const categories = ['all', ...new Set(operators.map(op => op.category))];

    const toggleOperator = (operator) => {
        setActiveOperators(prev => 
            prev.includes(operator) 
                ? prev.filter(op => op !== operator)
                : [...prev, operator]
        );
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    <i className="fas fa-edit text-blue-500 mr-2"></i>
                    Prompt Input
                </h2>
                <p className="text-gray-600">Enter your raw prompt and apply operators</p>
            </div>

            {/* Textarea for prompt input */}
            <div className="mb-6 flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Prompt
                </label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
            </div>

            {/* Search and filter */}
            <div className="mb-4">
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        placeholder="Search operators..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Operator buttons */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Operators</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    {['/ELI5', '/STEP-BY-STEP', '/EXEC SUMMARY', '/CHAIN OF THOUGHT'].map(op => {
                        const operator = promptBuilder.getOperatorByName(operators, op);
                        return operator ? (() => {
                            const color = getColorClasses(operator.color);
                            const activeClasses = `${color.bgSolid} ${color.textSolid}`;
                            return (
                                <button
                                    key={op}
                                    onClick={() => toggleOperator(op)}
                                    className={`operator-badge px-3 py-1 rounded-full text-xs font-medium ${
                                        activeOperators.includes(op)
                                            ? activeClasses
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {op}
                                </button>
                            );
                        })() : null;
                    })}
                </div>
            </div>

            {/* All operators */}
            <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-700 mb-2">All Operators</h3>
                <div className="grid grid-cols-1 gap-2 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto pr-2">
                    {filteredOperators.map(operator => (
                        <motion.div
                            key={operator.operator}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                onClick={() => toggleOperator(operator.operator)}
                                className={`w-full text-left p-3 rounded-lg border transition-all ${
                                        activeOperators.includes(operator.operator)
                                            ? `${getColorClasses(operator.color).border} ${getColorClasses(operator.color).bg}`
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`font-medium ${
                                        activeOperators.includes(operator.operator)
                                            ? getColorClasses(operator.color).text
                                            : 'text-gray-800'
                                    }`}>
                                        {operator.operator}
                                    </span>
                                    {activeOperators.includes(operator.operator) && (
                                        <i className="fas fa-check text-xs"></i>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                    {operator.description}
                                </p>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Active operators display */}
            {activeOperators.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-blue-800">Active Operators</h4>
                        <button
                            onClick={() => setActiveOperators([])}
                            className="text-xs text-blue-600 hover:text-blue-800"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {activeOperators.map(op => {
                            const operator = promptBuilder.getOperatorByName(operators, op);
                            return operator ? (
                                <span
                                    key={op}
                                    className={`px-2 py-1 rounded text-xs font-medium bg-${operator.color}-100 text-${operator.color}-800`}
                                >
                                    {op}
                                </span>
                            ) : null;
                        })}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default PromptInputPanel;