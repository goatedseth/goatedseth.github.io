
import {
  Activity,
  Archive,
  Brain,
  ChevronRight,
  CloudLightning,
  Code2,
  Cpu,
  Database,
  FileWarning,
  FolderOpen,
  HardDrive,
  HeartPulse,
  Network,
  Power,
  Search,
  ShieldAlert,
  Skull,
  Terminal,
  Trash2,
  TriangleAlert,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { byId, quotes, RANGE, type Quote } from "@/data/quotes";



type ModuleId =
  | "overview"
  | "terminal"
  | "database"
  | "deploy"
  | "legacy"
  | "hr"
  | "ai"
  | "medical"
  | "life"
  | "archive"
  | "trash";

type Module = {
  id: ModuleId;
  label: string;
  short: string;
  icon: typeof Terminal;
  quoteIds: string[];
  status: string;
};

const modules: Module[] = [
  { id: "terminal", label: "TERMINAL", short: "Production shell", icon: Terminal, quoteIds: ["001", "005", "006", "007", "009", "015", "022"], status: "UNSTABLE" },
  { id: "database", label: "SQL_CONSOLE", short: "Database interface", icon: Database, quoteIds: ["008", "021", "024"], status: "HOSTILE" },
  { id: "deploy", label: "DEPLOYMENT", short: "Release controls", icon: CloudLightning, quoteIds: ["019", "002"], status: "READY?" },
  { id: "legacy", label: "LEGACY_SYS", short: "Unsupported dependencies", icon: HardDrive, quoteIds: ["016", "030"], status: "STILL HERE" },
  { id: "hr", label: "HR_MONITOR", short: "Proximity & disclosure", icon: ShieldAlert, quoteIds: ["014", "018", "028", "031"], status: "UPSTAIRS" },
  { id: "ai", label: "AI_BENCHMARK", short: "Human parity testing", icon: Cpu, quoteIds: ["012", "035"], status: "FAILED" },
  { id: "medical", label: "MEDICAL", short: "Unlicensed consultation", icon: HeartPulse, quoteIds: ["010", "013", "025", "027"], status: "UNVERIFIED" },
  { id: "life", label: "LIFE.EXE", short: "Runtime diagnostics", icon: Brain, quoteIds: ["003", "004", "011", "017", "023", "026", "029", "032", "033", "034"], status: "RUNNING" },
  { id: "trash", label: "TRASH", short: "Emergency purge", icon: Trash2, quoteIds: ["020"], status: "EMPTY IT" },
  { id: "archive", label: "ALL_FILES", short: "Complete repository", icon: Archive, quoteIds: quotes.map((q) => q.id), status: `${quotes.length} FILES` },
];

const quoteText = (quote: Quote) =>
  quote.text ?? quote.dialogue?.map((turn) => `${turn.speaker}: ${turn.line}`).join("\n") ?? "";

function QuoteBlock({ quote, large = false }: { quote: Quote; large?: boolean }) {
  return (
    <div className={`quote-block ${large ? "quote-block-large" : ""}`}>
      <div className="quote-meta">
        <span>REF_{quote.id}</span>
        <span>{quote.subject}</span>
      </div>
      {quote.dialogue ? (
        <div className="dialogue-stack">
          {quote.dialogue.map((turn, index) => (
            <div className="dialogue-row" key={`${quote.id}-${index}`}>
              <span className="speaker">{turn.speaker}:</span>
              <span className={index === quote.dialogue!.length - 1 ? "dialogue-emphasis" : ""}>{turn.line}</span>
            </div>
          ))}
        </div>
      ) : (
        <blockquote>“{quote.text}”</blockquote>
      )}
      {quote.note && <p className="quote-note">({quote.note})</p>}
    </div>
  );
}

function BootScreen({ onEnter }: { onEnter: () => void }) {
  const [lines, setLines] = useState(0);
  const boot = [
    "SETH_OS BIOS v12.0.2014",
    "CHECKING MEMORY........................... TOO MUCH KNOWLEDGE",
    "MOUNTING /legacy.......................... UNFORTUNATELY ONLINE",
    "LOADING production_trauma.sys............. OK",
    "CHECKING HR PROXIMITY..................... UPSTAIRS",
    "INITIALIZING LANGUAGE FILTER.............. FAILED",
    "VERIFYING SURVIVAL STATUS................. UNEXPLAINED",
    "SYSTEM READY.",
  ];

  useEffect(() => {
    const interval = window.setInterval(() => setLines((value) => Math.min(value + 1, boot.length)), 115);
    return () => window.clearInterval(interval);
  }, [boot.length]);

  return (
    <button className="boot-screen" onClick={onEnter} aria-label="Enter SETH_OS">
      <div className="boot-copy">
        {boot.slice(0, lines).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <span className="cursor-block" />
      </div>
      <div className={`boot-enter ${lines === boot.length ? "boot-enter-visible" : ""}`}>
        CLICK ANYWHERE TO ENTER SYSTEM
      </div>
    </button>
  );
}

function WindowChrome({ title, status, children }: { title: string; status: string; children: ReactNode }) {
  return (
    <section className="os-window">
      <div className="window-titlebar">
        <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
        <div className="window-title">{title}</div>
        <div className="window-status">{status}</div>
      </div>
      {children}
    </section>
  );
}

function Overview({ open }: { open: (id: ModuleId) => void }) {
  const systemStats = [
    ["UPTIME", "12 YEARS"],
    ["BRAIN LOAD", "147%"],
    ["LEGACY DEBT", "CRITICAL"],
    ["HR DISTANCE", "1 FLOOR"],
  ];

  return (
    <div className="overview-layout">
      <WindowChrome title="SYSTEM_OVERVIEW.exe" status="LIVE">
        <div className="overview-hero">
          <div>
            <div className="eyebrow">CORPORATE BUILD 2026.08</div>
            <h1>SETH_<span>OS</span></h1>
            <p>An undocumented production environment operational since approximately 2014.</p>
          </div>
          <div className="core-indicator"><Activity /><span>CORE<br />ONLINE</span></div>
        </div>
        <div className="stat-grid">
          {systemStats.map(([label, value]) => <div className="stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      </WindowChrome>

      <div className="dashboard-grid">
        <WindowChrome title="CURRENT_PROCESS.log" status="PID 0012">
          <div className="hero-quote"><QuoteBlock quote={byId("012")} large /></div>
        </WindowChrome>
        <WindowChrome title="HEALTH_MONITOR" status="WARNING">
          <div className="health-panel">
            <div className="health-ring"><span>?</span></div>
            <div><span className="eyebrow">SURVIVAL STATUS</span><QuoteBlock quote={byId("033")} /></div>
          </div>
        </WindowChrome>
      </div>

      <div className="module-grid">
        {modules.filter((m) => !["archive"].includes(m.id)).map((module) => {
          const Icon = module.icon;
          return (
            <button key={module.id} className="module-card" onClick={() => open(module.id)}>
              <div className="module-icon"><Icon /></div>
              <div><strong>{module.label}</strong><span>{module.short}</span></div>
              <div className="module-card-status">{module.status}</div>
              <ChevronRight className="module-arrow" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TerminalModule() {
  const ids = modules.find((m) => m.id === "terminal")!.quoteIds;
  return (
    <WindowChrome title="SETH_TERMINAL — production@harrison" status="ROOT-ish">
      <div className="terminal-screen">
        <p className="command">$ diagnostics --network --why</p>
        <p className="terminal-dim">Running root cause analysis...</p>
        <div className="terminal-alert"><Network /> NETWORK ROUTING EXCEPTION <span>CRITICAL</span></div>
        <QuoteBlock quote={byId("007")} large />
        <p className="command">$ explain --computers</p>
        <QuoteBlock quote={byId("022")} />
        <p className="command">$ grep -R "strategy" ./production</p>
        <div className="terminal-list">{ids.filter((id) => !["007", "022"].includes(id)).map((id) => <QuoteBlock key={id} quote={byId(id)} />)}</div>
        <p className="command prompt-line">$ <span className="cursor-block" /></p>
      </div>
    </WindowChrome>
  );
}

function DatabaseModule() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="stacked-windows">
      <WindowChrome title="SQL_CONSOLE — HPS" status={failed ? "QUERY FAILED" : "CONNECTED"}>
        <div className="sql-console">
          <div className="sql-editor"><span>1</span><code>SELECT * FROM Reality WHERE Explanation IS NOT NULL;</code></div>
          <button className="run-query" onClick={() => setFailed(true)}><Zap /> RUN QUERY</button>
          {failed ? (
            <div className="sql-result error-result"><TriangleAlert /><div><span>ERROR 500: QUERY HAS BEEN PERSONALLY INSULTED</span><QuoteBlock quote={byId("008")} large /></div></div>
          ) : <div className="sql-result"><Database /><span>Ready. Execute query to continue.</span></div>}
        </div>
      </WindowChrome>
      <div className="two-col">
        <WindowChrome title="NAMING_CONVENTION.ticket" status="RESOLVED"><QuoteBlock quote={byId("024")} /></WindowChrome>
        <WindowChrome title="CODE_REVIEW.output" status="REAL ANSWER"><QuoteBlock quote={byId("021")} /></WindowChrome>
      </div>
    </div>
  );
}

function DeployModule() {
  const [result, setResult] = useState<"idle" | "fixes" | "fucks">("idle");
  return (
    <WindowChrome title="DEPLOYMENT_CONTROL_CENTER" status={result === "idle" ? "AWAITING JUDGMENT" : "DEPLOYED"}>
      <div className="deploy-panel">
        <div className="deploy-path"><span>DEV</span><i /><span>BUILD</span><i /><span>PROD</span></div>
        <div className="deploy-quote"><QuoteBlock quote={byId("019")} large /></div>
        <div className="deploy-buttons">
          <button onClick={() => setResult("fixes")}>PUBLISH IT</button>
          <button onClick={() => setResult("fucks")}>SEE IF IT FUCKS IT</button>
        </div>
        {result !== "idle" && <div className="deploy-output">DEPLOYMENT COMPLETE // OUTCOME: <strong>{result === "fixes" ? "IT FIXES" : "IT FUCKS"}</strong> // CONFIDENCE: 50.0%</div>}
        <QuoteBlock quote={byId("002")} />
      </div>
    </WindowChrome>
  );
}

function LegacyModule() {
  return (
    <div className="stacked-windows">
      <WindowChrome title="DEPENDENCY_MANAGER" status="END OF LIFE">
        <div className="dependency-row"><FileWarning /><div><strong>xslt.dll</strong><span>Legacy transformation dependency • cannot be removed without consequences</span></div><span className="severity">PERSONAL</span></div>
        <QuoteBlock quote={byId("016")} large />
      </WindowChrome>
      <WindowChrome title="ARCHAEOLOGY.log" status="2010s DETECTED"><QuoteBlock quote={byId("030")} /></WindowChrome>
    </div>
  );
}

function HrModule() {
  return (
    <div className="hr-layout">
      <WindowChrome title="HR_PROXIMITY_MONITOR" status="ACTIVE">
        <div className="floor-map">
          <div className="floor upstairs"><span>FLOOR 2</span><strong>HR</strong><div className="radar-pulse" /></div>
          <div className="floor current"><span>FLOOR 1</span><strong>SETH_OS</strong><div className="you-dot" /></div>
        </div>
        <QuoteBlock quote={byId("028")} large />
      </WindowChrome>
      <div className="warning-stack">{["014", "018", "031"].map((id) => <div className="warning-file" key={id}><ShieldAlert /><QuoteBlock quote={byId(id)} /></div>)}</div>
    </div>
  );
}

function AiModule() {
  return (
    <WindowChrome title="AI_CAPABILITY_BENCHMARK" status="HUMAN ADVANTAGE DETECTED">
      <div className="benchmark">
        <div className="benchmark-head"><Cpu /><div><span className="eyebrow">PARITY TEST // BUILD 2026.08</span><h2>SETH vs. ARTIFICIAL INTELLIGENCE</h2></div></div>
        <div className="benchmark-table">
          <div className="benchmark-row benchmark-labels"><span>CAPABILITY</span><span>SETH</span><span>AI</span></div>
          {[ ["WRITE CODE", "YES", "YES"], ["DEBUG XSLT", "RELUCTANTLY", "MAYBE"], ["GET BLACK OUT DRUNK", "YES", "NO"], ["CALL WIFE A BITCH", "YES", "NO"], ["WAKE UP IN OWN PISS", "YES", "NO"] ].map((row) => <div className="benchmark-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span></div>)}
        </div>
        <div className="benchmark-verdict"><span>FINAL HUMAN-PARITY VERDICT</span><QuoteBlock quote={byId("012")} large /></div>
        <div className="rate-limit"><div className="limit-bar"><span style={{ width: "100%" }} /></div><span>CLAUDE CODE LIMIT REACHED</span><QuoteBlock quote={byId("035")} /></div>
      </div>
    </WindowChrome>
  );
}

function MedicalModule() {
  return (
    <WindowChrome title="MEDICAL_RECORDS — UNLICENSED" status="DO NOT CITE">
      <div className="medical-grid">{modules.find((m) => m.id === "medical")!.quoteIds.map((id, i) => <div className={`medical-file medical-${i}`} key={id}><HeartPulse /><QuoteBlock quote={byId(id)} large={id === "025"} /></div>)}</div>
    </WindowChrome>
  );
}

function LifeModule() {
  const ids = modules.find((m) => m.id === "life")!.quoteIds;
  return (
    <div className="life-grid">
      <WindowChrome title="RESOURCE_MONITOR" status="OVERCOMMITTED">
        <div className="brain-monitor"><Brain /><div><span>BRAIN LOAD</span><strong>147%</strong><div className="meter"><i /></div></div></div>
        <QuoteBlock quote={byId("023")} large />
      </WindowChrome>
      <WindowChrome title="UPTIME" status="UNEXPLAINED"><div className="uptime-number">12<span>YEARS</span></div><QuoteBlock quote={byId("033")} /></WindowChrome>
      <WindowChrome title="LIFE.EXE — PROCESS LOG" status="RUNNING WITH WARNINGS"><div className="life-list">{ids.filter((id) => !["023", "033"].includes(id)).map((id) => <QuoteBlock quote={byId(id)} key={id} />)}</div></WindowChrome>
    </div>
  );
}

function TrashModule() {
  const [purged, setPurged] = useState(false);
  return (
    <WindowChrome title="EMERGENCY_PURGE.exe" status={purged ? "PHONE: RIVER" : "STANDBY"}>
      <div className="trash-panel">
        <Trash2 className={purged ? "trash-dropped" : ""} />
        <div className={purged ? "purged-copy" : ""}><QuoteBlock quote={byId("020")} large /></div>
        <button onClick={() => setPurged((v) => !v)}>{purged ? "RESTORE QUESTIONABLE HISTORY" : "DELETE BROWSING HISTORY + THROW PHONE IN RIVER"}</button>
        {purged && <p className="purge-result">PURGE COMPLETE. NO FURTHER QUESTIONS.</p>}
      </div>
    </WindowChrome>
  );
}

function ArchiveModule() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => quotes.filter((q) => `${q.id} ${q.subject} ${quoteText(q)} ${q.note ?? ""}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <WindowChrome title="SETH_QUOTE_REPOSITORY" status={`${filtered.length}/${quotes.length} RECORDS`}>
      <div className="archive-toolbar"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search immutable records..." /></div>
      <div className="archive-table">
        {filtered.map((quote) => <div className="archive-record" key={quote.id}><div className="record-id">REF_{quote.id}</div><div><span className="record-subject">{quote.subject}</span><QuoteBlock quote={quote} /></div></div>)}
      </div>
    </WindowChrome>
  );
}

function ModuleView({ id }: { id: ModuleId }) {
  if (id === "terminal") return <TerminalModule />;
  if (id === "database") return <DatabaseModule />;
  if (id === "deploy") return <DeployModule />;
  if (id === "legacy") return <LegacyModule />;
  if (id === "hr") return <HrModule />;
  if (id === "ai") return <AiModule />;
  if (id === "medical") return <MedicalModule />;
  if (id === "life") return <LifeModule />;
  if (id === "trash") return <TrashModule />;
  if (id === "archive") return <ArchiveModule />;
  return null;
}

export default function Index() {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState<ModuleId>("overview");
  const [notification, setNotification] = useState<Quote | null>(null);

  useEffect(() => {
    if (!booted) return;
    const timer = window.setInterval(() => {
      const pool = quotes.filter((q) => q.text && q.id !== "012");
      setNotification(pool[Math.floor(Math.random() * pool.length)] ?? null);
    }, 600000);
    return () => window.clearInterval(timer);
  }, [booted]);

  if (!booted) return <BootScreen onEnter={() => setBooted(true)} />;

  const current = modules.find((m) => m.id === active);

  return (
    <div className="os-shell">
      <div className="scanlines" aria-hidden="true" />
      <header className="topbar">
        <button className="brand" onClick={() => setActive("overview")}><span className="brand-mark">S_</span><span>SETH_OS</span><small>2026.08</small></button>
        <div className="topbar-center"><span className="status-dot" /> SYSTEM ONLINE <span className="divider" /> {RANGE}</div>
        <div className="topbar-right"><span>{quotes.length} RECORDS</span><button title="Power cycle" onClick={() => setBooted(false)}><Power /></button></div>
      </header>

      <aside className="sidebar">
        <button className={`nav-item ${active === "overview" ? "active" : ""}`} onClick={() => setActive("overview")}><Activity /><span>OVERVIEW</span></button>
        <div className="nav-label">SYSTEM MODULES</div>
        {modules.map((module) => {
          const Icon = module.icon;
          return <button key={module.id} className={`nav-item ${active === module.id ? "active" : ""}`} onClick={() => setActive(module.id)}><Icon /><span>{module.label}</span><small>{module.quoteIds.length}</small></button>;
        })}
        <div className="sidebar-footer"><span className="status-dot" /> PRODUCTION-ish</div>
      </aside>

      <main className="workspace">
        <div className="workspace-heading">
          <div><span className="eyebrow">/SETH_OS/{active.toUpperCase()}</span><h2>{active === "overview" ? "SYSTEM OVERVIEW" : current?.label}</h2></div>
          <div className="crumb-status"><span>{current?.status ?? "LIVE"}</span></div>
        </div>
        {active === "overview" ? <Overview open={setActive} /> : <ModuleView id={active} />}
      </main>

      {notification && <div className="system-notification"><div className="notification-head"><TriangleAlert /><span>SETH_OS NOTIFICATION</span><button onClick={() => setNotification(null)}><X /></button></div><p>“{notification.text}”</p><small>REF_{notification.id} // {notification.subject}</small></div>}
    </div>
  );
}
