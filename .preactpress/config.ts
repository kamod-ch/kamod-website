const matomoImageTracker =
  '<!-- Matomo Image Tracker--><img referrerpolicy="no-referrer-when-downgrade" src="https://matomo.kamod.ch/matomo.php?idsite=4&amp;rec=1" style="border:0" alt="" /><!-- End Matomo -->'

const includeMatomoImageTracker = process.env.PREACTPRESS_INCLUDE_MATOMO === 'true'

export default {
  srcExclude: ['README.md'],
  site: {
    title: 'Kamod GmbH',
    description:
      'Professional IT solutions for modern enterprises. We transform complex challenges into scalable, secure, and efficient digital products.',
    lang: 'en',
    url: 'https://kamod.ch'
  },
  theme: './theme/Layout.tsx',
  markdown: {
    html: false,
    linkify: true,
    typographer: true
  },
  transformHtml(html: string) {
    if (!includeMatomoImageTracker) return html
    return html.replace('</body>', `  ${matomoImageTracker}\n  </body>`)
  },
  themeConfig: {
    footer: '© 2026 Kamod GmbH. All rights reserved.',
    nav: [
      { text: 'Home', link: '#home' },
      { text: 'Services', link: '#services' },
      { text: 'Portfolio', link: '#portfolio' },
      { text: 'Team', link: '#team' },
      { text: 'Contact', link: '#contact' }
    ]
  }
}
