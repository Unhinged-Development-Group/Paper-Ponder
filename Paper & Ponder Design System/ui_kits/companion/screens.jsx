/* Companion app — main screens.
   TodayScreen, CaptureScreen, EntryScreen, LibraryScreen. */

/* ------------------------------------------------------------
   1. TODAY — landing screen. Prompts you to write, shows
   recent ponderings (AI summaries), and ongoing threads. */
const TodayScreen = ({ onRoute }) => {
  const greeting = "Tuesday — May 13th";
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <Eyebrow>Today · Vol. 04 / Entry 14</Eyebrow>
          <h1 style={{ fontWeight: 300, fontSize: 48, color: 'var(--ink)', margin: '12px 0 4px', letterSpacing: '-0.01em' }}>
            What sits with you, <span style={{ fontFamily: 'var(--font-script)', color: 'var(--pp-deep-clay)', fontWeight: 500 }}>Eli</span>?
          </h1>
          <p style={{ color: 'var(--fg-2)', fontSize: 14, maxWidth: 540, marginTop: 8 }}>
            Pick up the pen first. Write a page in the Obsidian. When you're done, snap the page and we'll sit with it together.
          </p>
        </div>
        <Btn icon="camera" onClick={() => onRoute('capture')}>Capture a page</Btn>
      </div>

      {/* Two-column: prompt + recent thread */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        {/* Prompt card */}
        <div className="card card--warm" style={{ padding: 28 }}>
          <Eyebrow>A prompt for the morning</Eyebrow>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 38, color: 'var(--pp-deep-clay)', lineHeight: 1.15, margin: '16px 0 14px' }}>
            What did you notice today that you didn't notice yesterday?
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.65, marginBottom: 18 }}>
            We rotate three prompts each morning, drawn from your last twenty entries. Use them as a doorway — or ignore them entirely.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="outline" icon="feather">Use this prompt</Btn>
            <Btn variant="ghost">Show another</Btn>
          </div>
        </div>

        {/* Latest pondering */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Pill variant="sand" icon="sparkles">Latest pondering</Pill>
            <span className="numeral" style={{ marginLeft: 'auto' }}>06:42 AM</span>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--ink)', lineHeight: 1.6 }}>
            Yesterday you wrote about the conversation with your brother, and you crossed out
            <span style={{ color: 'var(--pp-deep-clay)', borderBottom: '1px dashed currentColor', padding: '0 2px' }}>&nbsp;"I should have said"&nbsp;</span>
            three times. That phrase has appeared in eight of your last twenty entries.
            Would you like to sit with what you <em>didn't</em> say?
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', gap: 10 }}>
            <Btn variant="outline" iconRight="arrowRight" onClick={() => onRoute('entry')}>Open the entry</Btn>
          </div>
        </div>
      </div>

      {/* Threads + stats */}
      <SectionHead number="02" title="Threads you're still pulling" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { title: 'The thing with my brother', count: 8, color: '#fb923c', last: '4 days ago' },
          { title: 'Why I keep moving cities',  count: 5, color: '#7c2d12', last: '2 weeks ago' },
          { title: 'Reading less, lately',      count: 3, color: '#a8a29e', last: '6 days ago' },
        ].map((t, i) => (
          <div className="card" key={i} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, display: 'inline-block' }}/>
              <Eyebrow>{t.last}</Eyebrow>
            </div>
            <div style={{ fontSize: 17, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.3, marginBottom: 8 }}>{t.title}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{t.count} entries · still open</div>
          </div>
        ))}
      </div>

      <SectionHead number="03" title="This month, on paper" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { stat: '14', label: 'Entries captured' },
          { stat: '06:12', label: 'Avg. time on page' },
          { stat: '2,118', label: 'Words transcribed' },
          { stat: '3', label: 'Threads closed' },
        ].map((s, i) => (
          <div className="card" key={i} style={{ padding: 18 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 26, color: 'var(--pp-deep-clay)', letterSpacing: '0.02em' }}>{s.stat}</div>
            <Eyebrow style={{ marginTop: 8 }}>{s.label}</Eyebrow>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------
   2. CAPTURE — phone camera framing a journal page, OCR running. */
const CaptureScreen = ({ onRoute }) => {
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <Eyebrow>Step 02 · Capture</Eyebrow>
          <h1 style={{ fontWeight: 300, fontSize: 40, color: 'var(--ink)', margin: '12px 0 4px', letterSpacing: '-0.01em' }}>
            Lay the page flat, then frame it.
          </h1>
          <p style={{ color: 'var(--fg-2)', fontSize: 14, maxWidth: 560 }}>
            The Obsidian Journal lies flat by design. Centre the page in the frame. We'll detect the edges and read your hand from there.
          </p>
        </div>
        <Btn variant="ghost" icon="arrowLeft" onClick={() => onRoute('today')}>Cancel</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, alignItems: 'stretch' }}>
        {/* Camera viewfinder */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#1c1917', borderColor: '#2a2522', position: 'relative', minHeight: 440 }}>
          {/* Subtle radial glow */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: '#7c2d12', opacity: 0.3, filter: 'blur(40px)' }}/>
          <div style={{ position: 'absolute', top: 18, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
            <Pill variant="accent">● Live</Pill>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: '#fdba74', fontWeight: 700 }}>FRAMING · A5</span>
          </div>

          {/* The page being framed */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <div style={{ position: 'relative', width: '64%', height: '74%' }}>
              {/* Corner brackets */}
              {[[0,0,'tl'],[1,0,'tr'],[0,1,'bl'],[1,1,'br']].map(([x,y,k]) => (
                <div key={k} style={{
                  position: 'absolute',
                  top: y ? 'auto' : -8, bottom: y ? -8 : 'auto',
                  left: x ? 'auto' : -8, right: x ? -8 : 'auto',
                  width: 28, height: 28,
                  borderTop: !y ? '2px solid #fb923c' : 'none',
                  borderBottom: y ? '2px solid #fb923c' : 'none',
                  borderLeft: !x ? '2px solid #fb923c' : 'none',
                  borderRight: x ? '2px solid #fb923c' : 'none',
                }}/>
              ))}
              <div style={{ width: '100%', height: '100%', borderRadius: 4 }}>
                <PaperPage
                  date="13 · May · 2026"
                  height={'100%'}
                  lines={[
                    'tuesday morning, light is grey but warm',
                    'somehow. talked to ben last night about',
                    'the thing with mum. ended the same way',
                    'it always does. i said too much, then',
                    'less than i meant.',
                    { text: '— what would i say if i didn\'t', indent: true },
                    { text: 'need to be right?', indent: true },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div style={{ position: 'absolute', bottom: 22, left: 22, right: 22, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button className="btn btn--icon" style={{ background: 'rgba(255, 237, 213, 0.1)', color: '#fff7ed', borderRadius: 999 }}>
              <Icon name="library" size={16}/>
            </button>
            <button style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#fff7ed', border: '3px solid #fb923c',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}/>
            <button className="btn btn--icon" style={{ background: 'rgba(255, 237, 213, 0.1)', color: '#fff7ed', borderRadius: 999 }}>
              <Icon name="sun" size={16}/>
            </button>
          </div>
        </div>

        {/* Sidebar steps + OCR preview */}
        <div className="vstack" style={{ gap: 16 }}>
          <div className="card">
            <Eyebrow>What we're doing</Eyebrow>
            <div className="vstack" style={{ marginTop: 14, gap: 16 }}>
              {[
                { n: '01', t: 'Detect the page edges',  done: true },
                { n: '02', t: 'Flatten and de-skew',     done: true },
                { n: '03', t: 'Read your handwriting',   done: false, active: true },
                { n: '04', t: 'Pull a thread or two',    done: false },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: s.done ? 'var(--pp-deep-clay)' : (s.active ? 'transparent' : 'transparent'),
                    border: s.done ? 'none' : (s.active ? '2px solid var(--pp-terracotta)' : '2px solid var(--pp-stone-200)'),
                    display: 'grid', placeItems: 'center', flex: 'none',
                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                    color: s.done ? '#fff7ed' : (s.active ? 'var(--pp-terracotta)' : 'var(--fg-3)')
                  }}>
                    {s.done ? <Icon name="check" size={13} stroke={3}/> : s.n}
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: s.active ? 500 : 400,
                    color: s.active ? 'var(--ink)' : (s.done ? 'var(--fg-2)' : 'var(--fg-3)')
                  }}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card card--warm">
            <Eyebrow>Transcription preview</Eyebrow>
            <div style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.7, marginTop: 12, fontStyle: 'italic' }}>
              "Tuesday morning, light is grey but warm somehow. Talked to Ben last night about the thing with Mum. Ended the same way it always does. I said too much, then less than I meant."
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 12, fontStyle: 'italic' }}>
              <span style={{ color: 'var(--pp-stone-400)' }}>— what would i say if i didn't need to be right?</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <Pill variant="outline">98% confident</Pill>
              <Pill variant="outline">3 corrections suggested</Pill>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------
   3. ENTRY — viewing a single captured entry alongside the
   AI's questions. The point: the page stays the artefact;
   the conversation sits beside it, never on top of it. */
const EntryScreen = ({ onRoute }) => {
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <Eyebrow>Monday · 12 · May · 2026</Eyebrow>
          <h1 style={{ fontWeight: 300, fontSize: 36, color: 'var(--ink)', margin: '10px 0 4px', letterSpacing: '-0.01em' }}>
            <span style={{ fontFamily: 'var(--font-script)', color: 'var(--pp-deep-clay)', fontWeight: 500, fontSize: 44 }}>"</span>
            the thing with mum
            <span style={{ fontFamily: 'var(--font-script)', color: 'var(--pp-deep-clay)', fontWeight: 500, fontSize: 44 }}>"</span>
          </h1>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <Pill variant="sand">Thread · The thing with my brother</Pill>
            <Pill variant="outline">8 entries</Pill>
            <Pill variant="outline">06:12 on page</Pill>
          </div>
        </div>
        <div className="hstack">
          <Btn variant="ghost" icon="bookmark">Save</Btn>
          <Btn variant="outline" iconRight="arrowRight">Next entry</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'flex-start' }}>
        {/* The page (left) */}
        <div>
          <Eyebrow style={{ marginBottom: 12 }}>The page · scanned at 06:42</Eyebrow>
          <PaperPage
            date="12 · May · 2026"
            height={520}
            lines={[
              'monday morning, light is grey but warm',
              'somehow. talked to ben last night about',
              'the thing with mum. ended the same way',
              'it always does. i said too much, then',
              'less than i meant. ben got quiet for a',
              'while and i thought he was angry but',
              'he was just thinking. that\'s the thing',
              'about ben.',
              '',
              { text: '— i should have said sorry first.', indent: false },
              { text: '— i should have said i was scared.', indent: false },
              { text: '— what would i say if i didn\'t need', indent: false },
              { text: 'to be right?', indent: true },
            ]}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'space-between', alignItems: 'center' }}>
            <Pill variant="outline" icon="info">Auto-corrections (3)</Pill>
            <div className="hstack">
              <Btn variant="ghost" icon="sound">Listen</Btn>
              <Btn variant="ghost" icon="settings">Edit</Btn>
            </div>
          </div>
        </div>

        {/* The conversation (right) */}
        <div>
          <Eyebrow style={{ marginBottom: 12 }}>Sitting with it · 4 exchanges</Eyebrow>
          <div className="vstack" style={{ gap: 14 }}>
            <Bubble from="ai" when="06:44">
              You crossed out <em>"I should have said"</em> three times. That phrase has come up in eight of your last twenty entries. Would you like to look at what's underneath it?
            </Bubble>
            <Bubble from="you" when="06:46">
              I think I'm scared he'll say the same thing back to me. That I should have done something different.
            </Bubble>
            <Bubble from="ai" when="06:46">
              Is the fear about being told you were wrong — or about being told you knew you were?
            </Bubble>
            <Bubble from="you" when="06:51">
              The second one. Definitely the second one.
            </Bubble>
            <Bubble from="ai" when="06:52">
              I'll mark this thread <span className="text-amp" style={{borderBottom: '1px dashed currentColor', padding: '0 2px'}}>still open</span>. We can come back to it on paper, when you're ready.
            </Bubble>
          </div>

          {/* Composer */}
          <div className="card" style={{ marginTop: 18, padding: 0, display: 'flex', alignItems: 'center', gap: 0 }}>
            <input
              placeholder="A reply, a question, or skip…"
              style={{
                flex: 1, border: 'none', background: 'transparent', outline: 'none',
                padding: '14px 18px', fontSize: 14, color: 'var(--ink)',
                fontFamily: 'var(--font-sans)'
              }}/>
            <button className="btn btn--icon" style={{ marginRight: 8, background: 'var(--pp-deep-clay)', color: '#fff7ed', borderRadius: 8 }}>
              <Icon name="sendArrow" size={14}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------
   4. LIBRARY — chronological list of past entries. */
const LibraryScreen = ({ onRoute }) => {
  const months = [
    {
      month: 'May 2026',
      entries: [
        { date: '12 May', title: '"the thing with mum"',          excerpt: 'monday morning, light is grey but warm somehow…', thread: 'brother',  open: true },
        { date: '10 May', title: 'on quitting and on continuing', excerpt: 'a long walk in the rain after the meeting. i think…', thread: 'work',     open: false },
        { date: '08 May', title: 'the bookshop on Stokes Croft',  excerpt: 'bought lispector. felt strange about it. paid in cash…', thread: 'reading', open: false },
        { date: '06 May', title: 'fragments',                     excerpt: 'three short paragraphs, written before coffee…', thread: null,        open: false },
      ]
    },
    {
      month: 'April 2026',
      entries: [
        { date: '28 Apr', title: 'why i keep moving cities',      excerpt: 'a fifth time. five flats in six years. and yet…', thread: 'moving', open: true },
        { date: '20 Apr', title: 'reading less, lately',           excerpt: 'finished nothing this month. that is fine, probably…', thread: 'reading', open: true },
      ]
    },
  ];

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <Eyebrow>Library · 47 entries · since November 2025</Eyebrow>
          <h1 style={{ fontWeight: 300, fontSize: 40, color: 'var(--ink)', margin: '10px 0 4px', letterSpacing: '-0.01em' }}>
            Six months on paper.
          </h1>
        </div>
        <div className="hstack" style={{ gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Icon name="search" size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-3)' }}/>
            <input
              placeholder="Search your hand…"
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '10px 14px 10px 38px',
                fontSize: 13, color: 'var(--ink)', width: 240,
                fontFamily: 'var(--font-sans)', outline: 'none'
              }}/>
          </div>
          <Btn variant="primary" icon="camera" onClick={() => onRoute('capture')}>Capture</Btn>
        </div>
      </div>

      {/* Filters */}
      <div className="hstack" style={{ gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
        <Pill variant="sand">All</Pill>
        <Pill variant="outline">Open threads · 7</Pill>
        <Pill variant="outline">Brother · 8</Pill>
        <Pill variant="outline">Moving · 5</Pill>
        <Pill variant="outline">Reading · 3</Pill>
        <Pill variant="outline">Work · 6</Pill>
        <Pill variant="outline">Unsorted</Pill>
      </div>

      {months.map(m => (
        <div key={m.month} style={{ marginBottom: 36 }}>
          <SectionHead title={m.month} />
          <div className="vstack" style={{ gap: 12 }}>
            {m.entries.map(e => (
              <div className="card" key={e.date} style={{
                padding: 18, display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 22, alignItems: 'center'
              }}>
                <div className="paper-mini" style={{ aspectRatio: '0.72', width: '100%', maxWidth: 96 }}/>
                <div>
                  <div className="hstack" style={{ gap: 10, marginBottom: 6 }}>
                    <Eyebrow>{e.date}</Eyebrow>
                    {e.open && <Pill variant="accent">Still open</Pill>}
                    {e.thread && <Pill variant="outline">Thread · {e.thread}</Pill>}
                  </div>
                  <div style={{ fontSize: 18, color: 'var(--ink)', fontWeight: 500, marginBottom: 4 }}>{e.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--fg-2)', fontStyle: 'italic' }}>{e.excerpt}</div>
                </div>
                <button className="btn btn--ghost" onClick={() => onRoute('entry')}>
                  Open <Icon name="arrowRight" size={13}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Object.assign(window, { TodayScreen, CaptureScreen, EntryScreen, LibraryScreen });
