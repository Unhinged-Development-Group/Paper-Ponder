/* Companion app — left navigation rail. */

const Sidebar = ({ route, onRoute, entryCount = 47 }) => {
  const items = [
    { id: 'today',   label: 'Today',     icon: 'feather' },
    { id: 'capture', label: 'Capture',   icon: 'camera'  },
    { id: 'entry',   label: 'Yesterday', icon: 'pageSquare' },
    { id: 'library', label: 'Library',   icon: 'library', count: entryCount },
  ];
  const secondary = [
    { id: 'journal',  label: 'The Journal',  icon: 'book' },
    { id: 'settings', label: 'Settings',     icon: 'settings' },
  ];

  return (
    <aside className="rail">
      <div className="rail__brand">
        <MonoSeal size={32}/>
        <div className="word">Paper <span className="amp">&amp;</span> Ponder</div>
      </div>

      <div className="rail__group">
        <div className="rail__group-label">Practice</div>
        {items.map(it => (
          <button
            key={it.id}
            className={`rail__item ${route === it.id ? 'is-active' : ''}`}
            onClick={() => onRoute(it.id)}>
            <Icon name={it.icon} size={16}/>
            <span>{it.label}</span>
            {it.count && <span className="count">{it.count}</span>}
          </button>
        ))}
      </div>

      <div className="rail__group">
        <div className="rail__group-label">Account</div>
        {secondary.map(it => (
          <button
            key={it.id}
            className={`rail__item ${route === it.id ? 'is-active' : ''}`}
            onClick={() => onRoute(it.id)}>
            <Icon name={it.icon} size={16}/>
            <span>{it.label}</span>
          </button>
        ))}
      </div>

      <div className="rail__footer">
        <Avatar initials="EM" size={28}/>
        <div>
          <div className="name">Eli Marsh</div>
          <div className="role">No. 04 · Edition</div>
        </div>
      </div>
    </aside>
  );
};

Object.assign(window, { Sidebar });
