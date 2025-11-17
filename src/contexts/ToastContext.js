import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, duration }]);
        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showSuccess = (message, duration = 3000) => addToast(message, 'success', duration);
    const showError = (message, duration = 5000) => addToast(message, 'error', duration);
    const showWarning = (message, duration = 4000) => addToast(message, 'warning', duration);
    const showInfo = (message, duration = 3000) => addToast(message, 'info', duration);

    return (
        <ToastContext.Provider value={{
            showSuccess,
            showError,
            showWarning,
            showInfo
        }}>
            {children}
            <div className="fixed bottom-4 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none">
                {toasts.map(toast => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={() => removeToast(toast.id)}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
