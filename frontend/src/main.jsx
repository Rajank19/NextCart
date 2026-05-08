import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

function ErrorFallback({ error }) {

  return (

    <div
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
      }}
    >

      <h1>React Crash Detected ❌</h1>

      <pre>
        {String(error)}
      </pre>

    </div>

  );
}

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {

    return {
      hasError: true,
      error,
    };
  }

  render() {

    if (this.state.hasError) {

      return (
        <ErrorFallback
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ErrorBoundary>
      <App />
    </ErrorBoundary>

  </React.StrictMode>

);