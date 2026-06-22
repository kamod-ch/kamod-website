<p align="center">
  <img src="./public/logo.svg" alt="Kamod" width="160" />
</p>

<p align="center">
  <strong>Marketing-Onepager für Kamod GmbH — gebaut mit <a href="https://github.com/kamod-ch/preactpress">PreactPress</a>.</strong><br />
  Kein CMS, kein schwerer SPA-Stack: MDX-Inhalt, eigenes Preact-Theme, statischer Output.
</p>

<p align="center">
  <a href="https://kamod-ch.github.io/kamod-website/"><img src="https://img.shields.io/badge/demo-live-64ffda?style=for-the-badge" alt="Live demo" /></a>
  <a href="https://www.npmjs.com/package/@kamod-ch/preactpress"><img src="https://img.shields.io/npm/v/@kamod-ch/preactpress?style=for-the-badge" alt="PreactPress on npm" /></a>
  <a href="https://github.com/kamod-ch/preactpress"><img src="https://img.shields.io/badge/Powered%20by-PreactPress-0a192f?style=for-the-badge&logo=preact&logoColor=white" alt="Powered by PreactPress" /></a>
</p>

<p align="center">
  <a href="https://kamod-ch.github.io/kamod-website/">Live-Site</a>
  ·
  <a href="https://github.com/kamod-ch/preactpress">PreactPress</a>
  ·
  <a href="https://www.npmjs.com/package/@kamod-ch/preactpress">npm</a>
  ·
  <a href="https://kamod-ch.github.io/preactpress/">PreactPress Demo</a>
</p>

---

## Warum PreactPress für diese Site?

PreactPress ist ein **VitePress-ähnliches Docs-Framework mit Preact + MDX**. Dieses Repo zeigt, dass damit nicht nur Dokumentation, sondern auch **schlanke Marketing-Sites** funktionieren — mit voller Kontrolle über Layout, Navigation und Interaktion.

| Was du hier siehst | Was PreactPress dafür liefert |
| ------------------ | ----------------------------- |
| Einseitige Firmenwebsite mit Anker-Navigation | Custom Theme via Preact-Layout-Komponente |
| Hero, Services, Portfolio, Team, Kontakt | MDX-Seite + eingebettete Preact-Komponenten |
| Sticky Header, Scroll-Spy, Mobile-Menü | Client-seitige Logik im Theme — kein Extra-Framework |
| GitHub Pages unter `/kamod-website/` | `site.base`, Sitemap, SEO-Defaults, statisches `dist/` |
| Matomo-Tracking nur in Production | `transformHtml`-Hook in der Config |

> **Referenz statt Template:** Anders als die mitgelieferten Starter (`docs`, `hono`, `magazine`) ist dies eine **vollständig eigene Theme-Implementierung** für eine reale Unternehmenswebsite — ideal als Inspiration für Custom Themes.

---

## In 30 Sekunden starten

Voraussetzungen: Node 20+, [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Öffne [http://localhost:5173](http://localhost:5173).

```bash
pnpm check    # Routen, Links, Config validieren
pnpm build    # Statisches dist/ erzeugen
pnpm preview  # Production-Build lokal testen
```

---

## Architektur

```
kamod-website/
├── index.mdx                 # Einstieg — rendert die HomePage-Komponente
├── index.html                # Vite-Entry (Fonts, Favicon)
├── public/                   # Statische Assets (Logo, Favicon)
└── .preactpress/
    ├── config.ts             # Site-Metadaten, Nav, Markdown, Build-Hooks
    └── theme/
        ├── Layout.tsx        # Header, Footer, Scroll-Spy, Mobile-Nav
        ├── HomePage.tsx      # Sektionen: Hero, Services, Portfolio, Team, Contact
        └── site.css          # Design-System der Site
```

| Datei | Zweck |
| ----- | ----- |
| `index.mdx` | Frontmatter für SEO + `<HomePage />` als MDX-Inhalt |
| `.preactpress/config.ts` | Titel, Beschreibung, `site.base`, Navigation, Matomo-Hook |
| `.preactpress/theme/Layout.tsx` | Globales Shell-Layout — ersetzt das Default-Docs-Theme |
| `.preactpress/theme/HomePage.tsx` | Seiteninhalt als Preact-Komponente (leicht erweiterbar) |
| `.preactpress/theme/site.css` | Typografie, Farben, responsive Sektionen |
| `public/` | Bilder und Icons ohne Build-Pipeline |

**Content-Strategie:** Der sichtbare Inhalt lebt in `HomePage.tsx`. MDX dient als dünne Schicht für Metadaten und als Einstiegspunkt — so bleibt die Seite wartbar, ohne ein separates CMS.

---

## PreactPress-Features in Aktion

### Custom Theme statt Docs-Layout

Das Default-Theme von PreactPress ist für Dokumentation optimiert. Hier wird es durch ein **eigenes Layout** ersetzt:

```ts
// .preactpress/config.ts
export default {
  theme: './theme/Layout.tsx',
  themeConfig: {
    nav: [
      { text: 'Home', link: '#home' },
      { text: 'Services', link: '#services' },
      // ...
    ],
  },
}
```

`Layout.tsx` erhält `site`, `themeConfig`, `page` und rendert MDX oder HTML — dieselbe API wie bei grösseren Custom Themes.

### MDX + Preact für Marketing-Inhalte

```mdx
---
title: Kamod GmbH - Innovative Software Solutions
description: Professional IT solutions for modern enterprises.
---

import HomePage from './.preactpress/theme/HomePage.tsx'

<HomePage />
```

So kombinierst du **Markdown-Frontmatter** (SEO, Titel) mit **interaktiven Preact-Sektionen** — ohne React, ohne Vue.

### Production-Hooks

Matomo wird nur beim GitHub-Pages-Build eingefügt:

```ts
transformHtml(html) {
  if (process.env.PREACTPRESS_INCLUDE_MATOMO !== 'true') return html
  return html.replace('</body>', `  ${matomoImageTracker}\n  </body>`)
}
```

---

## Deployment

Die Site wird automatisch per GitHub Actions auf **GitHub Pages** veröffentlicht:

| Schritt | Detail |
| ------- | ------ |
| Trigger | Push auf `main` oder manuell |
| Build | `preactpress build . --base /kamod-website/` |
| Output | Nur `dist/` — kein Node-Server in Production |
| URL | [kamod-ch.github.io/kamod-website](https://kamod-ch.github.io/kamod-website/) |

Lokal mit Subpath testen:

```bash
pnpm exec preactpress build . --base /kamod-website/
pnpm preview
```

Für andere Hosts (Netlify, Vercel, Cloudflare Pages): `site.url` und `site.base` in `.preactpress/config.ts` anpassen, dann `pnpm build` und `dist/` hochladen.

---

## Von hier zu deiner eigenen Site

1. **Neues Projekt:** `pnpm dlx @kamod-ch/preactpress init my-site`
2. **Theme kopieren:** `.preactpress/theme/` aus diesem Repo als Ausgangspunkt
3. **Inhalt anpassen:** `HomePage.tsx`, `site.css`, `config.ts`
4. **Validieren & bauen:** `pnpm check && pnpm build`

Mehr Templates und Referenz-Dokumentation:

| Ressource | Link |
| --------- | ---- |
| PreactPress Repository | [github.com/kamod-ch/preactpress](https://github.com/kamod-ch/preactpress) |
| Live Demo (Docs-Theme) | [kamod-ch.github.io/preactpress](https://kamod-ch.github.io/preactpress/) |
| npm Paket | [@kamod-ch/preactpress](https://www.npmjs.com/package/@kamod-ch/preactpress) |
| Hono-Starter (Custom Theme) | `pnpm dlx @kamod-ch/preactpress init my-site --template hono` |

---

## Herkunft

Inhaltlich angelehnt an die bestehende Kamod-Website in `../website`. Technisch neu aufgebaut als **PreactPress-Showcase** — kleiner Bundle, statischer Export, Preact-first.

<p align="center">
  <sub>Built with <a href="https://github.com/kamod-ch/preactpress">PreactPress</a> · © Kamod GmbH</sub>
</p>
