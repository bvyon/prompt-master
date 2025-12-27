import React, { useState, useEffect, useRef } from 'react';
import * as framerMotion from 'framer-motion';
const { motion, AnimatePresence } = framerMotion;
import PromptInputPanel from './components/PromptInputPanel';
import LLMConfigurationPanel from './components/LLMConfigurationPanel';
import PromptPreviewPanel from './components/PromptPreviewPanel';
import MetricsPanel from './components/MetricsPanel';
import operators from './operators.json';
import * as promptBuilder from './utils/promptBuilder';
import { useGeminiEnhancement } from './utils/geminiService';

// Debounce hook for localStorage saves
const useDebouncedSave = (key, value, delay = 500) => {
    const timeoutRef = useRef(null);
    
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(value));
        }, delay);
        
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [key, value, delay]);
};

const App = () => {
    const [config, setConfig] = useState(() => {
        // Load from localStorage if available
        const saved = localStorage.getItem('promptMasterConfig');
        return saved ? JSON.parse(saved) : {
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
        };
    });

    const [showMetrics, setShowMetrics] = useState(() => {
        const saved = localStorage.getItem('showMetrics');
        return saved ? JSON.parse(saved) : true;
    });

    const [optimizedPrompt, setOptimizedPrompt] = useState('');
    
    // Gemini enhancement hook
    const { enhancePrompt, isLoading: isEnhancing, error: enhancementError } = useGeminiEnhancement();

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

    // Generate optimized prompt in real-time with memoization
    useEffect(() => {
        const builtPrompt = promptBuilder.buildOptimizedPrompt(config);
        setOptimizedPrompt(builtPrompt);
    }, [config]);

    // Debounced save to localStorage for better performance
    useDebouncedSave('promptMasterConfig', config, 500);
    useDebouncedSave('showMetrics', showMetrics, 500);

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
            setConfig(prev => ({
                ...prev,
                enhancedPrompt: enhanced
                // Keep original prompt - don't clear it for better UX
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto sm:h-16 py-3 sm:py-0">
                        <div className="flex items-center mb-3 sm:mb-0">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg shadow-purple-200"
                            >
                                <i className="fas fa-wand-magic-sparkles text-white text-lg sm:text-xl"></i>
                            </motion.div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Prompt Master
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium">Transform ideas into powerful prompts</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setShowMetrics(!showMetrics)}
                                className="px-4 py-2.5 bg-gradient-to-r from-slate-100 to-gray-100 text-gray-700 rounded-xl hover:from-slate-200 hover:to-gray-200 transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm hover:shadow w-full sm:w-auto border border-gray-200"
                            >
                                <i className="fas fa-chart-pie mr-2"></i>
                                {showMetrics ? 'Hide' : 'Show'} Metrics
                            </button>
                            <button
                                onClick={handleEnhancePrompt}
                                disabled={isEnhancing || !config.prompt}
                                className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg shadow-purple-200 flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <i className={`fas ${isEnhancing ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                                {isEnhancing ? 'Enhancing...' : 'Enhance with Gemini AI'}
                            </button>
                            <button
                                onClick={resetConfiguration}
                                className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg shadow-red-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <i className="fas fa-rotate-right"></i>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
                            disabled={false}
                            onGenerate={null}
                            isEnhancing={isEnhancing}
                            enhancementError={enhancementError}
                            onEnhance={handleEnhancePrompt}
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
                        
                        {showMetrics && (
                            <motion.div
                                key="metrics-panel"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <MetricsPanel config={config} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <motion.i 
                                className="fas fa-bolt text-yellow-500"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <p className="text-sm text-gray-600 font-medium">
                                Prompt Master v2.0 - Enhanced with AI
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">25+ Operators</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Real-time Preview</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Smart Metrics</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
