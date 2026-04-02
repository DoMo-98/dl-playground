import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUpRight, BrainCircuit, Languages, Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { localeLabels } from '../../i18n'
import { useI18n } from '../i18n-context'
import { HeaderFeatureLink, HeaderUtilityItem, HeaderUtilityLink } from './headerPrimitives'

type HeaderLocaleVariant = 'compact' | 'panel'

const repositoryUrl = 'https://github.com/DoMo-98/dl-playground'
const firstLessonPath = '/learn/foundations/perceptron/weighted-sum'

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
  variant?: HeaderLocaleVariant
}) {
  const isPanel = variant === 'panel'

  if (isPanel) {
    return (
      <HeaderUtilityItem variant="panel" className={['relative', className ?? ''].join(' ')}>
        <Languages className="h-4 w-4 shrink-0 text-cyan-300" />
        <span className="min-w-0 flex-1 text-slate-300">{label}</span>
        <span className="text-sm text-slate-100">{localeLabels[locale]}</span>
        <select
          value={locale}
          onChange={(event) => onChange(event.target.value as keyof typeof localeLabels)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label={label}
        >
          {Object.entries(localeLabels).map(([value, optionLabel]) => (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          ))}
        </select>
      </HeaderUtilityItem>
    )
  }

  return (
    <HeaderUtilityItem variant="inline" className={['relative', className ?? ''].join(' ')}>
      <Languages className="h-4 w-4 text-cyan-300" />
      <span className="text-sm text-slate-100">{localeLabels[locale]}</span>
      <select
        value={locale}
        onChange={(event) => onChange(event.target.value as keyof typeof localeLabels)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      >
        {Object.entries(localeLabels).map(([value, optionLabel]) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </HeaderUtilityItem>
  )
}

export function SiteShell() {
  const { locale, messages, switchLocale, toLocalizedPath } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header || typeof ResizeObserver === 'undefined') return
    const update = () => document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  const navItems = [{ to: toLocalizedPath('/learn'), label: messages.nav.learn }]
  const firstLessonHref = toLocalizedPath(firstLessonPath)

  return (
    <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header ref={headerRef} className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
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
                          'rounded-xl px-3 py-2 outline-none transition focus-visible:ring-1 focus-visible:ring-cyan-300/50',
                          isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white',
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <div className="h-6 w-px bg-white/10" aria-hidden="true" />

                <HeaderFeatureLink
                  href={firstLessonHref}
                  eyebrow={messages.nav.firstLessonEyebrow}
                  label={messages.nav.firstLesson}
                />

                <HeaderUtilityLink
                  href={repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  label={messages.nav.repository}
                  icon={<ArrowUpRight className="h-4 w-4" />}
                />

                <LocaleSwitcher
                  locale={locale}
                  label={messages.nav.languageSwitcherLabel}
                  onChange={(nextLocale) => switchLocale(nextLocale as typeof locale)}
                />
              </div>

              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className={[
                    'inline-flex items-center justify-center rounded-xl border p-2 text-slate-100 transition md:hidden',
                    menuOpen
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-100'
                      : 'border-white/10 bg-white/5 hover:bg-white/10',
                  ].join(' ')}
                  aria-expanded={menuOpen}
                  aria-label={menuOpen ? messages.nav.mobileMenuCloseLabel : messages.nav.mobileMenuOpenLabel}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </Dialog.Trigger>
            </div>
          </div>
        </header>

        <Dialog.Portal>
          <Dialog.Overlay
            data-testid="mobile-menu-overlay"
            className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm md:hidden"
          />
          <Dialog.Content
            className="fixed inset-x-4 top-[calc(env(safe-area-inset-top)+var(--header-h,5.5rem)+0.75rem)] z-40 space-y-4 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl outline-none md:hidden"
            aria-label={messages.nav.mobileMenuPanelLabel}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Dialog.Title className="sr-only">{messages.nav.mobileMenuPanelLabel}</Dialog.Title>
            <Dialog.Description className="sr-only">{messages.nav.mobileMenuCloseLabel}</Dialog.Description>

            <nav className="grid gap-2 text-sm text-slate-300" aria-label={messages.nav.mobileMenuPanelLabel}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-xl px-3 py-3 outline-none transition focus-visible:ring-1 focus-visible:ring-cyan-300/50',
                      isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="h-px bg-white/10" aria-hidden="true" />

            <HeaderFeatureLink
              href={firstLessonHref}
              eyebrow={messages.nav.firstLessonEyebrow}
              label={messages.nav.firstLesson}
              onClick={() => setMenuOpen(false)}
              compact
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <HeaderUtilityLink
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
                label={messages.nav.repository}
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={() => setMenuOpen(false)}
                variant="panel"
              />

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
          </Dialog.Content>
        </Dialog.Portal>

        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Outlet />
        </main>
      </div>
    </Dialog.Root>
  )
}
