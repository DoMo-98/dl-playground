import { BrainCircuit } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/learn', label: 'Learn' },
  { to: '/learn/mechanics/perceptron/weighted-sum', label: 'First lesson' },
]

export function SiteShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <span>
              <span className="text-slate-50">dl-playground</span>
              <span className="ml-2 text-sm font-normal text-slate-400">interactive web</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-3 py-2 transition',
                    isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
