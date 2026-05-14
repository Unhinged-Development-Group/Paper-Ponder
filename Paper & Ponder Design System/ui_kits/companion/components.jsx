/* Companion app — primitive components.
   Tiny library: Icon, Btn, Pill, Eyebrow, SectionHead, Bubble, PaperPage, Tooltip. */

const Icon = ({ name, size = 16, stroke = 2, ...rest }) => {
  // Hand-picked inline icons matching brand stroke style:
  // 24x24 viewBox, 2px stroke, round caps + joins, currentColor.
  const paths = {
    book:        <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5"/><path d="M4 4.5v18"/><path d="M20 2v18"/></>,
    plus:        <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    camera:      <><path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 4h6l1.5 2h2A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.5"/></>,
    library:     <><path d="M4 4v16"/><path d="M9 4v16"/><path d="M14 4l3 16"/><path d="M20 20V4"/></>,
    spark:       <><path d="M12 3v4"/><path d="M12 17v4"/><path d="M4.2 4.2l2.8 2.8"/><path d="M17 17l2.8 2.8"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M4.2 19.8L7 17"/><path d="M17 7l2.8-2.8"/></>,
    search:      <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    settings:    <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    arrowRight:  <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
    arrowLeft:   <><path d="M19 12H5"/><path d="M11 19l-7-7 7-7"/></>,
    feather:     <><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><path d="M16 8L2 22"/><path d="M17.5 15H9"/></>,
    info:        <><circle cx="12" cy="12" r="9"/><path d="M12 8v.01"/><path d="M11 12h1v4h1"/></>,
    check:       <><path d="M5 13l4 4L19 7"/></>,
    x:           <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    chevronRight:<><path d="M9 6l6 6-6 6"/></>,
    moon:        <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></>,
    sun:         <><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.2 4.2l1.4 1.4"/><path d="M18.4 18.4l1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.2 19.8l1.4-1.4"/><path d="M18.4 5.6l1.4-1.4"/></>,
    sendArrow:   <><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></>,
    pageSquare:  <><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/></>,
    sparkles:    <><path d="M12 3v4M12 17v4M4 12h4M16 12h4"/><path d="M6 6l2 2M18 18l-2-2M6 18l2-2M18 6l-2 2"/></>,
    cart:        <><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2 12h12l2-8H7"/></>,
    sound:       <><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M16 9c1.5 1.5 1.5 4.5 0 6"/><path d="M19 6c3 3 3 9 0 12"/></>,
    bookmark:    <><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
         stroke="currentColor" strokeWidth={stroke}
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

const Btn = ({ variant = 'primary', icon, iconRight, children, ...rest }) => (
  <button className={`btn btn--${variant}`} {...rest}>
    {icon && <Icon name={icon} size={13}/>}
    {children}
    {iconRight && <Icon name={iconRight} size={13}/>}
  </button>
);

const Pill = ({ variant = 'sand', children, icon }) => (
  <span className={`pill pill--${variant}`}>
    {icon && <Icon name={icon} size={11}/>}
    {children}
  </span>
);

const Eyebrow = ({ children, style }) => (
  <div className="eyebrow" style={style}>{children}</div>
);

const SectionHead = ({ number, title, action }) => (
  <div className="section-head">
    {number && <span className="numeral">{number}.</span>}
    <h2>{title}</h2>
    <div className="rule"></div>
    {action}
  </div>
);

const Bubble = ({ from, when, children }) => (
  <div className={`bubble bubble--${from === 'you' ? 'you' : 'ai'}`}>
    <span className="by">{from === 'you' ? 'You · ' + when : 'Ponder · ' + when}</span>
    {children}
  </div>
);

/* PaperPage — a stylised "scanned page" preview, showing handwriting on dot-grid */
const PaperPage = ({ lines = [], date, dotGrid = true, height = 320 }) => (
  <div className={dotGrid ? 'paper paper--dotgrid' : 'paper'} style={{ minHeight: height, padding: '28px 32px' }}>
    <div className="paper__corner"></div>
    <div className="paper__edge-shadow"></div>
    {date && (
      <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(28,25,23,0.45)', fontWeight: 700, marginBottom: 18}}>{date}</div>
    )}
    <div className="handwriting" style={{fontSize: 22, lineHeight: '30px', color: 'rgba(28,25,23,0.82)'}}>
      {lines.map((l, i) => (
        <div key={i} style={l.indent ? { marginLeft: 28 } : null}>{l.text || l}</div>
      ))}
    </div>
  </div>
);

const Avatar = ({ initials = "EM", size = 28 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: 'linear-gradient(135deg, #fb923c, #7c2d12)',
    color: '#fff7ed', display: 'grid', placeItems: 'center',
    fontSize: size * 0.4, fontWeight: 600
  }}>{initials}</div>
);

const MonoSeal = ({ size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: 'rgba(255, 237, 213, 0.3)',
    border: '1px solid rgba(251,146,60,0.25)',
    display: 'grid', placeItems: 'center', position: 'relative',
    flex: 'none'
  }}>
    <div style={{
      position: 'absolute', inset: Math.max(2, size * 0.06), borderRadius: '50%',
      border: '1px dashed rgba(251,146,60,0.5)'
    }}/>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: size * 0.06 }}>
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 500, color: '#7c2d12', fontSize: size * 0.38, lineHeight: 1 }}>P</span>
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 500, color: '#7c2d12', fontSize: size * 0.38, lineHeight: 1 }}>P</span>
      <span className="mono-seal__amp" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -52%) rotate(-12deg)', fontFamily: 'var(--font-script)', fontSize: size * 0.48, color: '#fb923c', lineHeight: 1 }}>&amp;</span>
    </div>
  </div>
);

Object.assign(window, { Icon, Btn, Pill, Eyebrow, SectionHead, Bubble, PaperPage, Avatar, MonoSeal });
