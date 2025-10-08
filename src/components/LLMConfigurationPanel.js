import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as promptBuilder from '../utils/promptBuilder';

const LLMConfigurationPanel = ({ 
    config, 
    setConfig 
}) => {
    const [expandedSections, setExpandedSections] = useState({
        parameters: true,
        advanced: false,
        safety: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleSliderChange = (field, value) => {
        setConfig(prev => ({
            ...prev,
            [field]: parseFloat(value)
        }));
    };

    const handleInputChange = (field, value) => {
        setConfig(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field) => {
        setConfig(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const roles = [
        'developer', 'marketer', 'teacher', 'doctor', 'lawyer',
        'scientist', 'artist', 'writer', 'analyst', 'consultant',
        'manager', 'researcher', 'engineer', 'designer', 'entrepreneur'
    ];

    const tones = [
        'formal', 'casual', 'friendly', 'professional', 'academic',
        'conversational', 'technical', 'creative', 'analytical', 'persuasive'
    ];

    const audiences = [
        'beginner', 'intermediate', 'expert', 'general', 'technical',
        'non-technical', 'executive', 'academic', 'student', 'professional'
    ];

    const formats = [
        'paragraph', 'bullet points', 'numbered list', 'table',
        'json', 'markdown', 'code', 'email', 'report', 'summary'
    ];

    const renderSlider = (label, field, min, max, step = 0.1) => (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
                <span className="text-sm text-gray-600 font-mono">
                    {config[field]?.toFixed(1)}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={config[field] || min}
                onChange={(e) => handleSliderChange(field, e.target.value)}
                className="slider w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );

    const renderSelect = (label, field, options) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <select
                value={config[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderCheckbox = (label, field) => (
        <div className="flex items-center mb-3">
            <input
                type="checkbox"
                id={field}
                checked={config[field] || false}
                onChange={() => handleCheckboxChange(field)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={field} className="ml-2 text-sm font-medium text-gray-700">
                {label}
            </label>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    <i className="fas fa-cog text-purple-500 mr-2"></i>
                    LLM Configuration
                </h2>
                <p className="text-gray-600">Fine-tune your LLM parameters</p>
            </div>

            {/* Basic Parameters */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('parameters')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h3 className="text-lg font-semibold text-gray-800">Parameters</h3>
                    <i className={`fas fa-chevron-${expandedSections.parameters ? 'up' : 'down'} text-gray-500`}></i>
                </button>
                
                {expandedSections.parameters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-4"
                    >
                        {renderSlider('Temperature', 'temperature', 0, 1, 0.1)}
                        {renderSlider('Top P', 'top_p', 0, 1, 0.1)}
                        {renderSlider('Max Tokens', 'maxTokens', 100, 4000, 100)}
                    </motion.div>
                )}
            </div>

            {/* Advanced Settings */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('advanced')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h3 className="text-lg font-semibold text-gray-800">Advanced Settings</h3>
                    <i className={`fas fa-chevron-${expandedSections.advanced ? 'up' : 'down'} text-gray-500`}></i>
                </button>
                
                {expandedSections.advanced && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-4"
                    >
                        {renderSelect('Role', 'role', roles)}
                        {renderSelect('Tone', 'tone', tones)}
                        {renderSelect('Audience', 'audience', audiences)}
                        {renderSelect('Format', 'format', formats)}
                    </motion.div>
                )}
            </div>

            {/* Safety Features */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('safety')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h3 className="text-lg font-semibold text-gray-800">Safety Features</h3>
                    <i className={`fas fa-chevron-${expandedSections.safety ? 'up' : 'down'} text-gray-500`}></i>
                </button>
                
                {expandedSections.safety && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-3"
                    >
                        {renderCheckbox('Chain of Thought', 'chainOfThought')}
                        {renderCheckbox('Reflective Mode', 'reflectiveMode')}
                        {renderCheckbox('No Autopilot', 'noAutopilot')}
                        {renderCheckbox('Guardrail', 'guardrail')}
                    </motion.div>
                )}
            </div>

            {/* Configuration Summary */}
            <div className="mt-auto p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Configuration Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Temperature:</span>
                        <span className="font-mono">{config.temperature?.toFixed(1) || '0.0'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Top P:</span>
                        <span className="font-mono">{config.top_p?.toFixed(1) || '0.0'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Max Tokens:</span>
                        <span className="font-mono">{config.maxTokens || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Creativity:</span>
                        <span className="font-medium text-purple-600">
                            {promptBuilder.formatCreativityLevel(
                                promptBuilder.calculateCreativity(config.temperature, config.top_p)
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LLMConfigurationPanel;