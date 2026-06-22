import type { ComponentType, FunctionalComponent } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import './site.css'

interface LayoutProps {
  site: {
    title: string
    description: string
    base: string
    lang: string
    url?: string
  }
  themeConfig: {
    nav?: { text: string; link: string }[]
    footer?: string
  }
  routePath: string
  page?: {
    kind: 'mdx' | 'markdown'
    title?: string
    description?: string
    Component?: ComponentType<Record<string, never>>
    html?: string
  }
}

function normalizeHash(link: string): string {
  return link.startsWith('#') ? link : '#home'
}

const Layout: FunctionalComponent<LayoutProps> = ({ site, themeConfig, page }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [scrolled, setScrolled] = useState(false)


  const navItems = useMemo(() => themeConfig.nav ?? [], [themeConfig.nav])
  const MdxComponent = page?.kind === 'mdx' ? page.Component : undefined

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.page-section'))
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const offset = 140
      let current = '#home'
      for (const section of sections) {
        if (window.scrollY >= section.offsetTop - offset) {
          current = `#${section.id}`
        }
      }
      setActiveSection(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToHash = (hash: string) => {
    const target = document.querySelector<HTMLElement>(hash)
    if (!target) return
    const headerOffset = 70
    const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    history.replaceState(null, '', hash)
    setActiveSection(hash)
  }

  const handleNavClick = (event: MouseEvent, hash: string) => {
    event.preventDefault()
    setMobileNavOpen(false)
    scrollToHash(hash)
  }

  return (
    <div class="site-shell">
      <header class={`header${scrolled ? ' scrolled' : ''}`}>
        <div class="container header-container">
          <a href="#home" class="logo" onClick={(event) => handleNavClick(event, '#home')}>
            <img src={`${site.base === '/' ? '' : site.base}/logo.png`} alt="Kamod Logo" />
          </a>
          <button
            class="mobile-nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            <span class={`burger${mobileNavOpen ? ' active' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <nav class={`nav-menu${mobileNavOpen ? ' active' : ''}`} aria-label="Main navigation">
            <ul class="nav-list">
              {navItems.map((item) => {
                const hash = normalizeHash(item.link)
                const active = activeSection === hash
                return (
                  <li key={item.text}>
                    <a
                      href={hash}
                      class={`nav-link${active ? ' active' : ''}`}
                      onClick={(event) => handleNavClick(event, hash)}
                    >
                      {item.text}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {MdxComponent ? <MdxComponent /> : <div dangerouslySetInnerHTML={{ __html: page?.html ?? '' }} />}
      </main>

      <footer class="footer">
        <div class="container footer-container">
          <div class="footer-logo">
            <a href="#home" onClick={(event) => handleNavClick(event, '#home')}>
              <img src={`${site.base === '/' ? '' : site.base}/logo.png`} alt="Kamod Logo" />
            </a>
            <p>Innovative Software Solutions</p>
          </div>
          <div class="footer-copy">{themeConfig.footer}</div>
        </div>
      </footer>

      <noscript>
        <img
          referrerPolicy="no-referrer-when-downgrade"
          src="https://matomo.kamod.ch/matomo.php?idsite=4&amp;rec=1"
          style="border:0"
          alt=""
        />
      </noscript>
    </div>
  )
}

export default Layout
