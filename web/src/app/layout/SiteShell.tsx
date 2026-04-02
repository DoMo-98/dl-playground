import { ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, ChevronDown, Languages, Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useEffect, useId, useRef, useState } from 'react'
import { localeLabels } from '../../i18n'
import { useI18n } from '../i18n-context'

const repositoryUrl = 'https://github.com/DoMo-98/dl-playground'
const firstLessonPath = '/learn/foundations/perceptron/weighted-sum'

function FirstLessonLink({
  href,
  eyebrow,
  label,
  onClick,
  compact = false,
}: {
  href: string
  eyebrow: string
  label: string
  onClick?: () => void
  compact?: boolean
}) {
  return (
    <div
      className={[
        'min-w-0 rounded-xl transition',
        compact
          ? 'border border-white/10 bg-slate-950/40 px-3 py-3 hover:border-white/15 hover:bg-slate-950/55'
          : 'border border-transparent px-3 py-2 hover:bg-white/5',
      ].join(' ')}
    >
      <span className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-300/75">
        <BookOpen className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <Link
        to={href}
        onClick={onClick}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 transition hover:text-white"
      >
        <span className="truncate">{label}</span>
        <ArrowRight className="h-4 w-4 text-cyan-300/90" />
      </Link>
    </div>
  )
}

function LocaleSwitcher({
  locale,
  label,
  onChange,
  className,
  variant = 'compact',
}: {
  locale: keyof typeof localeLabels
  label: string
  onChange: (nextLocale: keyof typeof localeLabels) => void
  className?: string
  variant?: 'compact' | 'panel'
}) {
  const isPanel = variant === 'panel'

  return (
    <label
      className={[
        'group inline-flex items-center text-sm text-slate-200 transition',
        isPanel
          ? 'gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3 hover:border-white/15 hover:bg-slate-950/55 focus-within:border-cyan-300/40 focus-within:bg-slate-950/55 focus-within:ring-1 focus-within:ring-cyan-300/20'
          : 'gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-white/20 hover:bg-white/8 focus-within:border-cyan-300/40 focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-cyan-300/20',
        className ?? '',
      ].join(' ')}
    >
      <Languages className="h-4 w-4 shrink-0 text-cyan-300 transition group-hover:text-cyan-200 group-focus-within:text-cyan-200" />
      {isPanel ? <span className="min-w-0 flex-1 text-slate-300">{label}</span> : <span className="sr-only">{label}</span>}
      <span className={['relative', isPanel ? 'min-w-0' : 'w-[5.75rem]'].join(' ')}>
        <select
          value={locale}
          onChange={(event) => onChange(event.target.value as keyof typeof localeLabels)}
          className={[
            'w-full cursor-pointer appearance-none bg-transparent text-sm text-slate-100 outline-none',
            isPanel ? 'min-w-0 pr-6 text-right' : 'pr-6',
          ].join(' ')}
          aria-label={label}
        >
          {Object.entries(localeLabels).map(([value, optionLabel]) => (
            <option key={value} value={value} className="bg-slate-900 text-slate-100">
              {optionLabel}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-hover:text-slate-300 group-focus-within:text-slate-200" />
      </span>
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

            <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
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

              <div className="h-6 w-px bg-white/10" aria-hidden="true" />

              <FirstLessonLink
                href={firstLessonHref}
                eyebrow={messages.nav.firstLessonEyebrow}
                label={messages.nav.firstLesson}
              />

              <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-1.5 py-1">
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
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
              className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:hidden"
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

              <div className="h-px bg-white/10" aria-hidden="true" />

              <FirstLessonLink
                href={firstLessonHref}
                eyebrow={messages.nav.firstLessonEyebrow}
                label={messages.nav.firstLesson}
                onClick={() => setMenuOpen(false)}
                compact
              />

              <div className="grid gap-3 sm:grid-cols-2">
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
                  variant="panel"
                  className="justify-between"
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
