import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error or send to an error reporting service
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render any fallback UI
            return (
                <div className="flex justify-center items-center w-full h-screen">
                    <h2>Something went wrong.</h2>
                </div>);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
