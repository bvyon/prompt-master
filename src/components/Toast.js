import React, { useEffect } from 'react';
import * as framerMotion from 'framer-motion';
const { motion, AnimatePresence } = framerMotion;

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const getToastStyles = () => {
        const baseStyles = "fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50 flex items-center gap-2 min-w-[200px] justify-center";

        switch (type) {
            case 'success':
                return `${baseStyles} bg-green-500`;
            case 'error':
                return `${baseStyles} bg-red-500`;
            case 'warning':
                return `${baseStyles} bg-yellow-500`;
            case 'info':
                return `${baseStyles} bg-blue-500`;
            default:
                return `${baseStyles} bg-gray-500`;
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return 'fas fa-check-circle';
            case 'error':
                return 'fas fa-exclamation-triangle';
            case 'warning':
                return 'fas fa-exclamation-triangle';
            case 'info':
                return 'fas fa-info-circle';
            default:
                return 'fas fa-bell';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className={getToastStyles()}
            >
                <i className={getIcon()}></i>
                <span className="text-sm font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                    aria-label="Close toast"
                >
                    <i className="fas fa-times text-xs"></i>
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast;
