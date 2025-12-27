import React, { useState, memo } from 'react';
import * as framerMotion from 'framer-motion';
const { motion, AnimatePresence } = framerMotion;
import * as promptBuilder from '../utils/promptBuilder';

const LLMConfigurationPanel = memo(({ 
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

    // `setConfig` is a handler passed from parent that merges with current config.
    const handleSliderChange = (field, value) => {
        setConfig({ [field]: parseFloat(value) });
    };

    const handleInputChange = (field, value) => {
        setConfig({ [field]: value });
    };

    const handleCheckboxChange = (field) => {
        setConfig({ [field]: !config[field] });
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

    const renderSlider = (label, field, min, max, step = 0.1, icon) => (
        <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    {icon && <i className={`fas ${icon} text-purple-500`}></i>}
                    {label}
                </label>
                <span className="text-sm text-purple-600 font-bold font-mono bg-purple-50 px-2 py-0.5 rounded-lg">
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
                className="slider w-full h-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg appearance-none cursor-pointer"
                style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(config[field] - min) / (max - min) * 100}%, #f3f4f6 ${(config[field] - min) / (max - min) * 100}%, #f3f4f6 100%)`
                }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1 font-medium">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );

    const renderSelect = (label, field, options, icon) => (
        <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                {icon && <i className={`fas ${icon} text-blue-500`}></i>}
                {label}
            </label>
            <select
                value={config[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 hover:bg-white/70 transition-all duration-200"
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

    const renderCheckbox = (label, field, icon) => (
        <div className="flex items-center mb-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <input
                type="checkbox"
                id={field}
                checked={config[field] || false}
                onChange={() => handleCheckboxChange(field)}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer transition-all duration-200"
            />
            <label htmlFor={field} className="ml-3 text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer flex-1">
                {icon && <i className={`fas ${icon} text-gray-400`}></i>}
                {label}
            </label>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 h-full flex flex-col"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    <i className="fas fa-sliders text-purple-500 mr-2"></i>
                    LLM Configuration
                </h2>
                <p className="text-gray-600 text-sm">Fine-tune your LLM parameters</p>
            </div>

            {/* Basic Parameters */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('parameters')}
                    className="flex items-center justify-between w-full text-left group"
                >
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors flex items-center gap-2">
                        <i className="fas fa-thermometer-half text-purple-500"></i>
                        Parameters
                    </h3>
                    <motion.i 
                        className={`fas fa-chevron-${expandedSections.parameters ? 'up' : 'down'} text-gray-500 group-hover:text-purple-500 transition-colors`}
                        animate={{ rotate: expandedSections.parameters ? 180 : 0 }}
                    />
                </button>
                
                <AnimatePresence mode="wait">
                    {expandedSections.parameters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 space-y-4"
                        >
                            {renderSlider('Temperature', 'temperature', 0, 1, 0.1, 'fa-fire')}
                            {renderSlider('Top P', 'top_p', 0, 1, 0.1, 'fa-water')}
                            {renderSlider('Max Tokens', 'maxTokens', 100, 4000, 100, 'fa-coins')}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Advanced Settings */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('advanced')}
                    className="flex items-center justify-between w-full text-left group"
                >
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        <i className="fas fa-cog text-blue-500"></i>
                        Advanced Settings
                    </h3>
                    <motion.i 
                        className={`fas fa-chevron-${expandedSections.advanced ? 'up' : 'down'} text-gray-500 group-hover:text-blue-500 transition-colors`}
                        animate={{ rotate: expandedSections.advanced ? 180 : 0 }}
                    />
                </button>
                
                <AnimatePresence mode="wait">
                    {expandedSections.advanced && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 space-y-4"
                        >
                            {renderSelect('Role', 'role', roles, 'fa-user-tie')}
                            {renderSelect('Tone', 'tone', tones, 'fa-comments')}
                            {renderSelect('Audience', 'audience', audiences, 'fa-users')}
                            {renderSelect('Format', 'format', formats, 'fa-file-alt')}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Safety Features */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('safety')}
                    className="flex items-center justify-between w-full text-left group"
                >
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors flex items-center gap-2">
                        <i className="fas fa-shield-alt text-green-500"></i>
                        Safety Features
                    </h3>
                    <motion.i 
                        className={`fas fa-chevron-${expandedSections.safety ? 'up' : 'down'} text-gray-500 group-hover:text-green-500 transition-colors`}
                        animate={{ rotate: expandedSections.safety ? 180 : 0 }}
                    />
                </button>
                
                <AnimatePresence mode="wait">
                    {expandedSections.safety && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 space-y-2"
                        >
                            {renderCheckbox('Chain of Thought', 'chainOfThought', 'fa-brain')}
                            {renderCheckbox('Reflective Mode', 'reflectiveMode', 'fa-mirror')}
                            {renderCheckbox('No Autopilot', 'noAutopilot', 'fa-hand-paper')}
                            {renderCheckbox('Guardrail', 'guardrail', 'fa-user-shield')}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Configuration Summary */}
            <div className="mt-auto p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <i className="fas fa-chart-pie text-gray-500"></i>
                    Configuration Summary
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                        <span className="text-gray-600 font-medium">Temperature:</span>
                        <span className="font-mono font-bold text-purple-600">{config.temperature?.toFixed(1) || '0.0'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                        <span className="text-gray-600 font-medium">Top P:</span>
                        <span className="font-mono font-bold text-blue-600">{config.top_p?.toFixed(1) || '0.0'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                        <span className="text-gray-600 font-medium">Max Tokens:</span>
                        <span className="font-mono font-bold text-green-600">{config.maxTokens || '0'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                        <span className="text-gray-600 font-medium">Creativity:</span>
                        <span className="font-medium px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                            {promptBuilder.formatCreativityLevel(
                                promptBuilder.calculateCreativity(config.temperature, config.top_p)
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

LLMConfigurationPanel.displayName = 'LLMConfigurationPanel';

export default LLMConfigurationPanel;
