import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="max-w-md space-y-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
            Unexpected error
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Something went wrong.
          </h1>
          <p className="text-lg leading-8 text-slate-300">
            The application hit an unexpected error. Reloading the page should get things back to
            normal.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Reload page
          </button>
        </div>
      </div>
    )
  }
}
