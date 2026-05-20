'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Optional label shown in the error panel, e.g. "biblioteket" */
  label?: string;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Ukjent feil' };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="max-w-sm w-full bg-white/8 backdrop-blur-2xl border border-white/12 rounded-2xl p-8 text-center shadow-xl shadow-black/20">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-500/15 border border-red-400/25 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="font-semibold text-white/80 mb-1">Noe gikk galt</h2>
            <p className="text-sm text-white/40 mb-6">
              {this.props.label
                ? `Det oppstod en feil i ${this.props.label}.`
                : 'Det oppstod en uventet feil.'}
            </p>
            <button
              onClick={this.handleReset}
              className="text-sm font-medium text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Prøv igjen
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
