/* Companion app — top-level shell. */

const App = () => {
  const [route, setRoute] = React.useState('today');
  // Update top bar date display
  const dateLine = "Tue · 13 · May · 2026";

  const screens = {
    today:   <TodayScreen   onRoute={setRoute}/>,
    capture: <CaptureScreen onRoute={setRoute}/>,
    entry:   <EntryScreen   onRoute={setRoute}/>,
    library: <LibraryScreen onRoute={setRoute}/>,
    journal: <TodayScreen   onRoute={setRoute}/>,   /* fallback */
    settings:<TodayScreen   onRoute={setRoute}/>,   /* fallback */
  };

  const titles = {
    today:   'Today',
    capture: 'Capture a page',
    entry:   'Entry · 12 May 2026',
    library: 'Library',
    journal: 'The Obsidian Journal',
    settings: 'Settings',
  };

  return (
    <div className="app" data-screen-label={`Companion · ${titles[route]}`}>
      <Sidebar route={route} onRoute={setRoute} entryCount={47}/>
      <div className="main">
        <div className="topbar">
          <div className="hstack" style={{ gap: 14 }}>
            <span className="date">{dateLine}</span>
            <span style={{ width: 1, height: 14, background: 'var(--border)' }}/>
            <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{titles[route]}</span>
          </div>
          <div className="actions">
            <Btn variant="ghost" icon="moon">Night</Btn>
            <Btn variant="ghost" icon="info">Help</Btn>
          </div>
        </div>
        {screens[route]}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
