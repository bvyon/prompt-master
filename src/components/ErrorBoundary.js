import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });

        // Log error to console for debugging
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            An unexpected error occurred. This has been reported and we're working to fix it.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={this.handleRetry}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Reload Page
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                                    Show error details
                                </summary>
                                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
