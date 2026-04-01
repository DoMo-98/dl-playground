import { BrainCircuit, Languages, Menu } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { localeLabels } from '../../i18n'
import { useI18n } from '../i18n-context'

export function SiteShell() {
  const { locale, messages, switchLocale, toLocalizedPath } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { to: toLocalizedPath('/learn'), label: messages.nav.learn },
    { to: toLocalizedPath('/learn/foundations/perceptron/weighted-sum'), label: messages.nav.firstLesson },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to={toLocalizedPath('/')} className="flex min-w-0 items-center gap-3 font-semibold tracking-tight">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-slate-50">dl-playground</span>
                <span className="block truncate text-sm font-normal text-slate-400">interactive web</span>
              </span>
            </Link>

            <div className="hidden items-center gap-3 md:flex">
              <nav className="flex items-center gap-2 text-sm text-slate-300" aria-label={messages.nav.mobileMenuLabel}>
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

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                <Languages className="h-4 w-4 text-cyan-300" />
                <span className="sr-only">{messages.nav.languageSwitcherLabel}</span>
                <select
                  value={locale}
                  onChange={(event) => switchLocale(event.target.value as typeof locale)}
                  className="bg-transparent text-sm text-slate-100 outline-none"
                  aria-label={messages.nav.languageSwitcherLabel}
                >
                  {Object.entries(localeLabels).map(([value, label]) => (
                    <option key={value} value={value} className="bg-slate-900 text-slate-100">
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100 md:hidden"
              aria-expanded={menuOpen}
              aria-label={messages.nav.mobileMenuLabel}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {menuOpen ? (
            <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:hidden">
              <nav className="grid gap-2 text-sm text-slate-300" aria-label={messages.nav.mobileMenuLabel}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-3 py-3 transition',
                        isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3 text-sm text-slate-200">
                <Languages className="h-4 w-4 text-cyan-300" />
                <label className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <span>{messages.nav.languageSwitcherLabel}</span>
                  <select
                    value={locale}
                    onChange={(event) => {
                      setMenuOpen(false)
                      switchLocale(event.target.value as typeof locale)
                    }}
                    className="min-w-0 bg-transparent text-right text-sm text-slate-100 outline-none"
                    aria-label={messages.nav.languageSwitcherLabel}
                  >
                    {Object.entries(localeLabels).map(([value, label]) => (
                      <option key={value} value={value} className="bg-slate-900 text-slate-100">
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
