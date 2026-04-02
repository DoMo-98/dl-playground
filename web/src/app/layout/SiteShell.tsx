import { ArrowUpRight, BrainCircuit, ChevronDown, Languages, Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useEffect, useId, useRef, useState } from 'react'
import { localeLabels } from '../../i18n'
import { useI18n } from '../i18n-context'

const repositoryUrl = 'https://github.com/DoMo-98/dl-playground'
const firstLessonPath = '/learn/foundations/perceptron/weighted-sum'

function HeaderActionLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:text-white"
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  )
}

function LocaleSwitcher({
  locale,
  label,
  onChange,
  className,
}: {
  locale: keyof typeof localeLabels
  label: string
  onChange: (nextLocale: keyof typeof localeLabels) => void
  className?: string
}) {
  return (
    <label
      className={[
        'group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10',
        className ?? '',
      ].join(' ')}
    >
      <Languages className="h-4 w-4 text-cyan-300" />
      <span className="sr-only">{label}</span>
      <span className="text-sm text-slate-300">{localeLabels[locale]}</span>
      <ChevronDown className="h-4 w-4 text-slate-400 transition group-focus-within:text-slate-200 group-hover:text-slate-200" />
      <select
        value={locale}
        onChange={(event) => onChange(event.target.value as keyof typeof localeLabels)}
        className="cursor-pointer appearance-none bg-transparent pr-1 text-sm text-slate-100 outline-none"
        aria-label={label}
      >
        {Object.entries(localeLabels).map(([value, optionLabel]) => (
          <option key={value} value={value} className="bg-slate-900 text-slate-100">
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  )
}

export function SiteShell() {
  const { locale, messages, switchLocale, toLocalizedPath } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const mobilePanelId = useId()
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  const navItems = [{ to: toLocalizedPath('/learn'), label: messages.nav.learn }]
  const firstLessonHref = toLocalizedPath(firstLessonPath)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!mobileMenuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [menuOpen])

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
              <nav className="flex items-center gap-2 text-sm text-slate-300" aria-label={messages.nav.primaryNavigationLabel}>
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

              <HeaderActionLink href={firstLessonHref} label={messages.nav.firstLesson} />

              <a
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                <span>{messages.nav.repository}</span>
              </a>

              <LocaleSwitcher
                locale={locale}
                label={messages.nav.languageSwitcherLabel}
                onChange={(nextLocale) => switchLocale(nextLocale as typeof locale)}
              />
            </div>

            <button
              type="button"
              className={[
                'inline-flex items-center justify-center rounded-xl border p-2 text-slate-100 transition md:hidden',
                menuOpen
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-100'
                  : 'border-white/10 bg-white/5 hover:bg-white/10',
              ].join(' ')}
              aria-expanded={menuOpen}
              aria-controls={mobilePanelId}
              aria-label={menuOpen ? messages.nav.mobileMenuCloseLabel : messages.nav.mobileMenuOpenLabel}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {menuOpen ? (
            <div
              id={mobilePanelId}
              ref={mobileMenuRef}
              className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:hidden"
              role="dialog"
              aria-label={messages.nav.mobileMenuPanelLabel}
            >
              <nav className="grid gap-2 text-sm text-slate-300" aria-label={messages.nav.mobileMenuPanelLabel}>
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

              <div className="grid gap-3 sm:grid-cols-3">
                <HeaderActionLink href={firstLessonHref} label={messages.nav.firstLesson} onClick={() => setMenuOpen(false)} />

                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                  <span>{messages.nav.repository}</span>
                </a>

                <LocaleSwitcher
                  locale={locale}
                  label={messages.nav.languageSwitcherLabel}
                  onChange={(nextLocale) => {
                    setMenuOpen(false)
                    switchLocale(nextLocale as typeof locale)
                  }}
                  className="justify-between bg-slate-950/40"
                />
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
