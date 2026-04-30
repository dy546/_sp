import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', color: '#e0e0f0', fontFamily: 'sans-serif' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Something went wrong</div>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '8px 20px', background: '#4a7aff', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 14 }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
