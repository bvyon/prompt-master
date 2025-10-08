import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PromptInputPanel from './components/PromptInputPanel';
import LLMConfigurationPanel from './components/LLMConfigurationPanel';
import PromptPreviewPanel from './components/PromptPreviewPanel';
import MetricsPanel from './components/MetricsPanel';
import operators from './operators.json';
import * as promptBuilder from './utils/promptBuilder';

const App = () => {
    const [config, setConfig] = useState({
        prompt: '',
        activeOperators: [],
        temperature: 0.7,
        top_p: 0.9,
        maxTokens: 1000,
        role: '',
        tone: '',
        audience: '',
        format: '',
        chainOfThought: false,
        reflectiveMode: false,
        noAutopilot: false,
        guardrail: false
    });

    const [showMetrics, setShowMetrics] = useState(true);

    // Update active operators when checkboxes change
    useEffect(() => {
        const newActiveOperators = [];
        
        if (config.chainOfThought) newActiveOperators.push('/CHAIN OF THOUGHT');
        if (config.reflectiveMode) newActiveOperators.push('/REFLECTIVE MODE');
        if (config.noAutopilot) newActiveOperators.push('/NO AUTOPILOT');
        if (config.guardrail) newActiveOperators.push('/GUARDRAIL');
        
        setConfig(prev => ({
            ...prev,
            activeOperators: newActiveOperators
        }));
    }, [config.chainOfThought, config.reflectiveMode, config.noAutopilot, config.guardrail]);

    const handleConfigChange = (newConfig) => {
        setConfig(prev => ({
            ...prev,
            ...newConfig
        }));
    };

    const resetAll = () => {
        setConfig({
            prompt: '',
            activeOperators: [],
            temperature: 0.7,
            top_p: 0.9,
            maxTokens: 1000,
            role: '',
            tone: '',
            audience: '',
            format: '',
            chainOfThought: false,
            reflectiveMode: false,
            noAutopilot: false,
            guardrail: false
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3"
                            >
                                <i className="fas fa-magic text-white text-lg"></i>
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Prompt Master</h1>
                                <p className="text-sm text-gray-500">Turn your rough ideas into perfect prompts</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowMetrics(!showMetrics)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                            >
                                <i className="fas fa-chart-bar mr-2"></i>
                                {showMetrics ? 'Hide' : 'Show'} Metrics
                            </button>
                            <button
                                onClick={resetAll}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center gap-2"
                            >
                                <i className="fas fa-undo"></i>
                                Reset All
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[60vh]">
                    {/* Left Column - Prompt Input */}
                    <div className="lg:col-span-1">
                        <PromptInputPanel
                            prompt={config.prompt}
                            setPrompt={(prompt) => handleConfigChange({ prompt })}
                            activeOperators={config.activeOperators}
                            setActiveOperators={(activeOperators) => handleConfigChange({ activeOperators })}
                            operators={operators}
                        />
                    </div>

                    {/* Middle Column - LLM Configuration */}
                    <div className="lg:col-span-1">
                        <LLMConfigurationPanel
                            config={config}
                            setConfig={handleConfigChange}
                        />
                    </div>

                    {/* Right Column - Preview and Metrics */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <PromptPreviewPanel
                            config={config}
                            operators={operators}
                        />
                        
                        <AnimatePresence>
                            {showMetrics && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MetricsPanel config={config} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Prompt Master - Built with React, Tailwind CSS, and Framer Motion
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>25+ Operators</span>
                            <span>•</span>
                            <span>Real-time Preview</span>
                            <span>•</span>
                            <span>Smart Metrics</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;