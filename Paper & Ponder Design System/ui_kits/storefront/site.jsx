/* Storefront — primitive components. */

const SiteIcon = ({ name, size = 16, stroke = 2, ...rest }) => {
  const paths = {
    feather: <><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><path d="M16 8L2 22"/><path d="M17.5 15H9"/></>,
    camera:  <><path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 4h6l1.5 2h2A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.5"/></>,
    spark:   <><path d="M12 3v4M12 17v4M4 12h4M16 12h4"/><path d="M6 6l2 2M18 18l-2-2M6 18l2-2M18 6l-2 2"/></>,
    arrow:   <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
    cart:    <><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2 12h12l2-8H7"/></>,
    quote:   <><path d="M7 7h4v6c0 2-1 4-4 4M14 7h4v6c0 2-1 4-4 4"/></>,
    check:   <><path d="M5 13l4 4L19 7"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
         stroke="currentColor" strokeWidth={stroke}
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

const Nav = () => (
  <nav className="nav container">
    <div className="nav__brand">
      <span className="word">Paper <span className="amp">&amp;</span> Ponder</span>
    </div>
    <div className="nav__links">
      <a className="nav__link" href="#how">The Practice</a>
      <a className="nav__link" href="#journal">The Journal</a>
      <a className="nav__link" href="#sit">Sit With It</a>
      <a className="nav__link" href="#editions">Editions</a>
      <a className="nav__cta" href="#order">Order · $32</a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="hero__pattern"></div>
    <div className="hero__inner container">
      <div className="hero__eyebrow">Vol. 04 · Spring 2026 · Now Shipping</div>
      <div className="hero__word">Paper <span className="amp">&amp;</span> Ponder</div>
      <p className="hero__sub">
        Analogue journaling, brought into modern times.
        Write the page by hand — slowly, somatically.
        Then sit with what you wrote, with a careful reader who'll <em>ask, not answer</em>.
      </p>
      <div className="hero__ctas">
        <a className="btn btn--primary" href="#order">Order the Obsidian <SiteIcon name="arrow" size={14}/></a>
        <a className="btn btn--outline" href="#how">See the Practice</a>
      </div>
    </div>
  </section>
);

/* How it works — 3 step row */
const HowItWorks = () => {
  const steps = [
    {
      n: '01', heading: 'Write by hand.',
      icon: 'feather',
      copy: 'A page a day, in the Obsidian Journal. 120gsm dot-grid, lay-flat. The point is the pen on paper — slow, somatic, a little bit hard.'
    },
    {
      n: '02', heading: 'Capture the page.',
      icon: 'camera',
      copy: 'When you\'re done, photograph the page from the app. We detect the edges, flatten the perspective, and read your hand.'
    },
    {
      n: '03', heading: 'Sit with it.',
      icon: 'spark',
      copy: 'A careful reader asks you about what you wrote. It pulls threads across weeks. It will not tell you what to think. It will ask you what you meant.'
    },
  ];
  return (
    <section className="section" id="how">
      <div className="sectionhead container">
        <span className="num">01</span>
        <h2>How the practice works.</h2>
        <span className="rule"></span>
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {steps.map(s => (
          <div key={s.n} style={{
            padding: 32, borderRadius: 20,
            background: 'var(--surface)', border: '1px solid var(--border-soft)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--pp-sand)', color: 'var(--pp-deep-clay)',
              display: 'grid', placeItems: 'center', marginBottom: 22
            }}>
              <SiteIcon name={s.icon} size={20}/>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--pp-stone-400)', marginBottom: 14 }}>Step {s.n}</div>
            <h3 style={{ fontWeight: 300, fontSize: 26, color: 'var(--ink)', margin: '0 0 12px' }}>{s.heading}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0 }}>{s.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* The Obsidian Journal — product */
const Product = () => (
  <section className="section section--warm" id="journal">
    <div className="sectionhead container">
      <span className="num">02</span>
      <h2>The Obsidian Journal.</h2>
      <span className="rule"></span>
    </div>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
      {/* Product image */}
      <div style={{
        aspectRatio: '1', background: '#1c1917',
        borderRadius: 24, padding: 48, position: 'relative',
        display: 'grid', placeItems: 'center',
        boxShadow: 'var(--shadow-lg)', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 220, height: 220, borderRadius: '50%',
          background: '#7c2d12', opacity: 0.4, filter: 'blur(50px)'
        }}/>
        <div style={{
          width: '70%', height: '85%',
          background: '#1c1917', border: '1px solid #2a2522',
          borderRadius: 4,
          boxShadow: '0 30px 60px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
          position: 'relative', display: 'grid', placeItems: 'center'
        }}>
          {/* Debossed monogram */}
          <div style={{ position: 'relative', opacity: 0.45 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', position: 'relative' }}>
              <span style={{ fontFamily: 'serif', fontWeight: 500, fontSize: 52, color: '#78716c' }}>P</span>
              <span style={{ fontFamily: 'serif', fontWeight: 500, fontSize: 52, color: '#78716c' }}>P</span>
              <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -52%) rotate(-12deg)', fontFamily: 'var(--font-script)', fontSize: 62, color: '#a8a29e' }}>&amp;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div>
        <div className="eyebrow">Vol. 04 · A5 · 160 pp</div>
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 64, color: 'var(--pp-deep-clay)', lineHeight: 1, margin: '18px 0' }}>The Obsidian</div>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg)', maxWidth: 460, marginBottom: 20 }}>
          160 pages of 120gsm dot-grid paper. Bound in charcoal linen.
          Lay-flat design for uninterrupted thought. Hand-stitched in the UK —
          gentle break-in over the first week of use.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 10, columnGap: 24, maxWidth: 440, marginBottom: 28 }}>
          {[
            ['Paper', '120 gsm, dot-grid'],
            ['Size',  'A5 (148 × 210 mm)'],
            ['Pages', '160 · numbered'],
            ['Cover', 'Charcoal linen'],
            ['Binding', 'Hand-stitched, lay-flat'],
            ['App',   'iOS & Android — included'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingBottom: 8, borderBottom: '1px solid var(--divider)' }}>
              <div style={{ flex: 1, fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{v}</div>
              <div className="eyebrow">{k}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 24, color: 'var(--pp-deep-clay)' }}>$32.00</div>
            <div className="eyebrow" style={{ marginTop: 4 }}>Free shipping · UK & EU</div>
          </div>
          <a className="btn btn--primary" href="#" style={{ marginLeft: 'auto' }}>
            <SiteIcon name="cart" size={14}/>
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* "Sit with it" — a conversation preview, dark panel */
const Conversation = () => (
  <section className="section section--dark" id="sit">
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 48 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255, 237, 213, 0.4)' }}>03</span>
        <h2 style={{ fontWeight: 300, fontSize: 30, color: 'var(--pp-sand)', margin: 0 }}>A careful reader, not an answer machine.</h2>
        <span style={{ flex: 1, height: 1, background: 'rgba(255, 237, 213, 0.12)' }}/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255, 237, 213, 0.85)', fontWeight: 300, marginBottom: 24 }}>
            We don't summarise your day. We don't score your mood.
            We don't sell what you wrote to anyone. We ask. We notice.
            We hold the threads that you keep coming back to —
            and we wait, on paper, until you're ready.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255, 237, 213, 0.6)', marginBottom: 32 }}>
            Pondering happens after you write, never during.
            Your entries are encrypted at rest. You can delete a thread,
            an entry, or your whole archive — at any time, for any reason.
          </p>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {[
              'End-to-end encrypted',
              'No ads, no profiling',
              'Export to plain text, any time',
              'Cancel by burning the journal'
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--pp-orange-300)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                <SiteIcon name="check" size={13}/> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Conversation preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'rgba(255, 247, 237, 0.04)', border: '1px solid rgba(255, 237, 213, 0.10)', borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 9, letterSpacing: '0.25em', color: 'var(--pp-orange-400)', marginBottom: 6 }}>PONDER · 06:44</div>
            <div style={{ fontSize: 14.5, color: 'var(--pp-sand)', lineHeight: 1.6 }}>
              You crossed out <em>"I should have said"</em> three times. That phrase has come up in eight of your last twenty entries. Would you like to look at what's underneath it?
            </div>
          </div>
          <div style={{ background: 'var(--pp-deep-clay)', borderRadius: 14, padding: '14px 18px', marginLeft: 64 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255, 237, 213, 0.5)', marginBottom: 6 }}>YOU · 06:51</div>
            <div style={{ fontSize: 14.5, color: 'var(--pp-sand)', lineHeight: 1.6 }}>
              The fear of being told I knew I was wrong. Definitely the second one.
            </div>
          </div>
          <div style={{ background: 'rgba(255, 247, 237, 0.04)', border: '1px solid rgba(255, 237, 213, 0.10)', borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 9, letterSpacing: '0.25em', color: 'var(--pp-orange-400)', marginBottom: 6 }}>PONDER · 06:52</div>
            <div style={{ fontSize: 14.5, color: 'var(--pp-sand)', lineHeight: 1.6 }}>
              I'll mark this thread <span style={{ color: 'var(--pp-terracotta)', borderBottom: '1px dashed currentColor', padding: '0 2px' }}>still open</span>. We can come back to it on paper, when you're ready.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* Testimonials */
const Testimonials = () => (
  <section className="section">
    <div className="sectionhead container">
      <span className="num">04</span>
      <h2>Words from the bindery.</h2>
      <span className="rule"></span>
    </div>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {[
        {
          q: 'I was writing more, but understanding less. The Obsidian put a third person in the room — a kind one.',
          a: 'Rosa M.', r: 'Edition 02 · 11 months in'
        },
        {
          q: 'The app refuses to summarise my day. I find I trust it more for that.',
          a: 'Jonas L.', r: 'Edition 03 · 4 months in'
        },
        {
          q: 'I bought it sceptical. I keep it under my pillow.',
          a: 'Anika R.', r: 'Edition 04 · 6 weeks in'
        },
      ].map((t, i) => (
        <div key={i} style={{
          padding: 28, borderRadius: 20, background: 'var(--surface)',
          border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ color: 'var(--pp-terracotta)', marginBottom: 16 }}>
            <SiteIcon name="quote" size={24}/>
          </div>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: 'var(--pp-deep-clay)', lineHeight: 1.4, marginBottom: 18 }}>{t.q}</div>
          <div className="eyebrow" style={{ color: 'var(--ink)' }}>{t.a}</div>
          <div className="eyebrow" style={{ marginTop: 4 }}>{t.r}</div>
        </div>
      ))}
    </div>
  </section>
);

/* Footer with Don't mess this up energy */
const Footer = () => (
  <footer style={{ background: 'var(--pp-stone-100)', padding: '80px 0 40px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
        <div>
          <div className="nav__brand" style={{ marginBottom: 20 }}>
            <span className="word" style={{ fontFamily: 'var(--font-script)', color: 'var(--pp-deep-clay)', fontSize: 30 }}>Paper <span style={{ color: 'var(--pp-terracotta)' }}>&amp;</span> Ponder</span>
          </div>
          <div className="eyebrow" style={{ color: 'var(--pp-stone-500)' }}>Handbound in the UK · Archival quality</div>
        </div>
        {[
          { title: 'The Practice', links: ['How it works', 'The Obsidian', 'The App', 'Sample pages'] },
          { title: 'Editions',     links: ['Vol. 04 · current', 'Vol. 03 · archive', 'Vol. 02 · sold out', 'Vol. 01 · sold out'] },
          { title: 'Studio',       links: ['About', 'Bindery notes', 'Privacy', 'Contact'] },
        ].map(g => (
          <div key={g.title}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{g.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.links.map(l => (
                <a key={l} href="#" style={{ fontSize: 13, color: 'var(--fg)', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="eyebrow">© 2026 Paper & Ponder · No. 04</div>
        <div className="eyebrow" style={{ color: 'var(--pp-deep-clay)' }}>Don't mess this up.</div>
      </div>
    </div>
  </footer>
);

const Site = () => (
  <div data-screen-label="Storefront · Marketing Home">
    <Nav/>
    <Hero/>
    <HowItWorks/>
    <Product/>
    <Conversation/>
    <Testimonials/>
    <Footer/>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Site/>);
