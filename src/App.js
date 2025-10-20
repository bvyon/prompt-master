import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PromptInputPanel from './components/PromptInputPanel';
import LLMConfigurationPanel from './components/LLMConfigurationPanel';
import PromptPreviewPanel from './components/PromptPreviewPanel';
import MetricsPanel from './components/MetricsPanel';
import operators from './operators.json';
import * as promptBuilder from './utils/promptBuilder';
import { useGeminiEnhancement } from './utils/geminiService';

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
        guardrail: false,
        enhancedPrompt: ''
    });

    const [showMetrics, setShowMetrics] = useState(true);
    const [optimizedPrompt, setOptimizedPrompt] = useState('');
    
    // Gemini enhancement hook
    const { enhancePrompt, isLoading: isEnhancing, error: enhancementError } = useGeminiEnhancement();

    // Update active operators when checkboxes change
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

    // Update configuration state with new values
    const updateConfig = (newConfig) => {
        setConfig(prev => ({
            ...prev,
            ...newConfig
        }));
    };

    // Generate optimized prompt in real-time
    useEffect(() => {
        const builtPrompt = promptBuilder.buildOptimizedPrompt(config);
        setOptimizedPrompt(builtPrompt);
    }, [config]);

    // No auto-enhancement - only manual enhancement through button

    // Reset configuration to default values
    const resetConfiguration = () => {
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
            guardrail: false,
            enhancedPrompt: ''
        });
    };

    // Manual enhancement trigger
    const handleEnhancePrompt = async () => {
        if (!config.prompt || config.prompt.trim() === '') {
            return;
        }
        
        const promptForEnhancement = promptBuilder.buildPromptForGeminiEnhancement(config);
        const enhanced = await enhancePrompt(promptForEnhancement);
        if (enhanced) {
            setConfig(prev => ({ ...prev, enhancedPrompt: enhanced }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto sm:h-16 py-2 sm:py-0">
                        <div className="flex items-center mb-2 sm:mb-0">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3"
                            >
                                <i className="fas fa-magic text-white text-sm sm:text-lg"></i>
                            </motion.div>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Prompt Master</h1>
                                <p className="text-xs sm:text-sm text-gray-500">Turn your rough ideas into perfect prompts</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setShowMetrics(!showMetrics)}
                                className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm w-full sm:w-auto"
                            >
                                <i className="fas fa-chart-bar mr-2"></i>
                                {showMetrics ? 'Hide' : 'Show'} Metrics
                            </button>
                            <button
                                onClick={handleEnhancePrompt}
                                disabled={isEnhancing || !config.prompt}
                                className="px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs sm:text-sm flex items-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <i className={`fas ${isEnhancing ? 'fa-spinner fa-spin' : 'fa-magic'}`}></i>
                                {isEnhancing ? 'Enhancing...' : 'Enhance with Gemini'}
                            </button>
                            <button
                                onClick={resetConfiguration}
                                className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm flex items-center gap-2 w-full sm:w-auto"
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
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 min-h-[60vh]">
                    {/* Left Column - LLM Configuration */}
                    <div className="xl:col-span-1">
                        <LLMConfigurationPanel
                            config={config}
                            setConfig={updateConfig}
                        />
                    </div>

                    {/* Middle Column - Prompt Input */}
                    <div className="xl:col-span-1">
                        <PromptInputPanel
                            prompt={config.prompt}
                            setPrompt={(prompt) => updateConfig({ prompt })}
                            activeOperators={config.activeOperators}
                            setActiveOperators={(activeOperators) => updateConfig({ activeOperators })}
                            operators={operators}
                            disabled={false} // Siempre activo
                            onGenerate={() => {}} // Función vacía, ya no se necesita
                            isEnhancing={isEnhancing}
                            enhancementError={enhancementError}
                        />
                    </div>

                    {/* Right Column - Preview and Metrics */}
                    <div className="xl:col-span-1 flex flex-col gap-4 md:gap-6">
                        <PromptPreviewPanel
                            config={config}
                            operators={operators}
                            optimizedPrompt={optimizedPrompt}
                            isEnhancing={isEnhancing}
                            enhancementError={enhancementError}
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                        <p className="text-xs sm:text-sm text-gray-500">
                            Prompt Master - Built with React, Tailwind CSS, and Framer Motion
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
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