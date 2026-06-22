const services = [
  {
    title: 'Custom Software Development',
    description:
      'Tailor-made applications designed to streamline your business processes and drive growth.',
    icon: 'code'
  },
  {
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure design, migration, and management specially for Hetzner Cloud.',
    icon: 'cloud'
  },
  {
    title: 'Cybersecurity',
    description:
      'Robust security assessments and implementation to protect your digital assets and data.',
    icon: 'shield'
  },
  {
    title: 'IT Consulting',
    description:
      'Strategic technology advice to help you make informed decisions and stay ahead of the curve.',
    icon: 'consulting'
  }
]

const projects = [
  {
    title: 'Syncding.com',
    description:
      'An automated Syncthing and ZFS-powered backup solution for seamless cross-device data integrity.',
    tags: ['Next.js', 'Django', 'Syncthing', 'ZFS']
  },
  {
    title: 'Digital news platform',
    description:
      'Switzerland’s leading digital-only news site, known for its mix of fast-breaking news, sharp commentary, and interactive storytelling',
    tags: ['Express.js', 'Laravel', 'Redis', 'Varnish', 'Websockets']
  }
]

function Icon({ type }: { type: string }) {
  switch (type) {
    case 'code':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.7 16.6 4.1 12l4.6-4.6 1.4 1.4L6.9 12l3.2 3.2-1.4 1.4Zm6.6 0-1.4-1.4 3.2-3.2-3.2-3.2 1.4-1.4 4.6 4.6-4.6 4.6ZM10.3 20l2.6-16 1.9.3-2.6 16-1.9-.3Z" fill="currentColor" />
        </svg>
      )
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 19H7a4 4 0 1 1 .6-8A5.5 5.5 0 0 1 18.2 9a3.5 3.5 0 1 1-.2 10Z" fill="currentColor" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 5 5v6c0 4.8 2.9 9.2 7 11 4.1-1.8 7-6.2 7-11V5l-7-3Z" fill="currentColor" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19h16v2H4v-2Zm2-4h4v3H6v-3Zm5-6h4v9h-4V9Zm5-4h4v13h-4V5Z" fill="currentColor" />
        </svg>
      )
  }
}

export default function HomePage() {
  return (
    <>
      <section id="home" class="hero page-section">
        <div class="container hero-container">
          <div class="hero-content">
            <h1 class="hero-title">
              Innovative Software,
              <br />
              Built for Your Business
            </h1>
            <p class="hero-subtitle">
              Professional IT solutions for modern enterprises. We transform complex
              challenges into scalable, secure, and efficient digital products.
            </p>
            <div class="hero-buttons">
              <a href="#services" class="btn btn-primary">
                Explore Our Services
              </a>
              <a href="#contact" class="btn btn-secondary">
                Request a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="section services page-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Our Services</h2>
            <p class="section-subtitle">Comprehensive IT expertise tailored to your needs</p>
          </div>
          <div class="services-grid">
            {services.map((service) => (
              <div class="service-card" key={service.title}>
                <div class="service-icon">
                  <Icon type={service.icon} />
                </div>
                <h3 class="service-title">{service.title}</h3>
                <p class="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" class="section portfolio page-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Projects</h2>
            <p class="section-subtitle">Showcasing our success stories</p>
          </div>
          <div class="portfolio-grid">
            {projects.map((project) => (
              <div class="portfolio-card" key={project.title}>
                <div class="portfolio-content">
                  <h3 class="portfolio-title">{project.title}</h3>
                  <p class="portfolio-desc">{project.description}</p>
                  <div class="portfolio-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" class="section team page-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Meet the Team</h2>
            <p class="section-subtitle">Experts behind the code</p>
          </div>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-avatar">KZ</div>
              <h3 class="team-name">Klaus Zahiragic</h3>
              <p class="team-role">CEO &amp; Founder</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="section contact page-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Get in Touch</h2>
            <p class="section-subtitle">Baarerstrasse 107 - 6300 Zug, Switzerland</p>
          </div>
          <div class="contact-container">
            <div class="contact-cta">
              <h3 class="contact-cta-text">Have any project idea in your mind!</h3>
            </div>
            <div class="contact-email">
              <a href="mailto:info@kamod.ch" class="email-link">
                <span class="email-text">info@kamod.ch</span>
                <span class="email-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
