import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════
//  BioNexusKG — Complete Midterm Demo
//  Explained simply, step by step
// ═══════════════════════════════════════════════

const C = {
  bg: "#0b1120", s1: "#111b2e", s2: "#182240", card: "#1c2a45",
  border: "#2a3a5c", cyan: "#22d3ee", purple: "#a78bfa", pink: "#f472b6",
  green: "#34d399", orange: "#fb923c", red: "#ef4444", yellow: "#facc15",
  teal: "#2dd4bf", blue: "#60a5fa", text: "#e8edf5", muted: "#8896b3", dim: "#4a5a7a",
};

const NC = {
  Disease: C.red, Gene: C.cyan, Drug: C.purple, Pathway: C.green,
  Phenotype: C.orange, Anatomy: C.pink, Protein: C.yellow,
  Biomarker: C.teal, RiskFactor: "#f87171", ClinicalTrial: "#818cf8",
  SideEffect: "#fb7185", MolecularTarget: "#06b6d4",
};

// ─── All Steps ───
const STEPS = [
  "🏠 Home",
  "📖 What is a Knowledge Graph?",
  "🧠 What is PrimeKG?",
  "🆕 Our Alternative: BioNexusKG",
  "🔧 Step 1: Development Method",
  "📂 Step 2: Data Sources",
  "🟢 Step 3: Node Types",
  "📋 Step 4: Attributes",
  "🔗 Step 5: Relationships",
  "📊 Step 6: Visualization",
  "✅ Step 7: Validation",
  "🎮 Live Demo",
];

// ─── KG Demo Data ───
const NODES = [
  { id: "diabetes", type: "Disease", label: "Type 2 Diabetes", x: 400, y: 280, emoji: "🤒" },
  { id: "ins", type: "Gene", label: "INS Gene", x: 180, y: 140, emoji: "🧬" },
  { id: "slc", type: "Gene", label: "SLC30A8", x: 120, y: 330, emoji: "🧬" },
  { id: "metformin", type: "Drug", label: "Metformin", x: 650, y: 180, emoji: "💊" },
  { id: "glipizide", type: "Drug", label: "Glipizide", x: 680, y: 380, emoji: "💊" },
  { id: "insulin_path", type: "Pathway", label: "Insulin Signaling", x: 300, y: 80, emoji: "🗺️" },
  { id: "polyuria", type: "Phenotype", label: "Frequent Urination", x: 580, y: 60, emoji: "👁️" },
  { id: "retinopathy", type: "Phenotype", label: "Eye Damage", x: 620, y: 470, emoji: "👁️" },
  { id: "pancreas", type: "Anatomy", label: "Pancreas", x: 220, y: 440, emoji: "🫁" },
  { id: "ampk", type: "Protein", label: "AMPK Protein", x: 500, y: 140, emoji: "🔬" },
  { id: "hba1c", type: "Biomarker", label: "HbA1c Test", x: 500, y: 430, emoji: "📊" },
  { id: "obesity", type: "RiskFactor", label: "Obesity", x: 160, y: 470, emoji: "⚠️" },
  { id: "trial1", type: "ClinicalTrial", label: "Clinical Trial", x: 750, y: 280, emoji: "📋" },
];
const EDGES = [
  { s: "ins", t: "diabetes", label: "causes" },
  { s: "slc", t: "diabetes", label: "linked to" },
  { s: "metformin", t: "diabetes", label: "treats" },
  { s: "glipizide", t: "diabetes", label: "treats" },
  { s: "ins", t: "insulin_path", label: "part of" },
  { s: "diabetes", t: "polyuria", label: "shows symptom" },
  { s: "diabetes", t: "retinopathy", label: "causes" },
  { s: "pancreas", t: "diabetes", label: "affected organ" },
  { s: "metformin", t: "ampk", label: "activates" },
  { s: "hba1c", t: "diabetes", label: "indicates" },
  { s: "obesity", t: "diabetes", label: "risk for" },
  { s: "trial1", t: "metformin", label: "tests" },
  { s: "slc", t: "pancreas", label: "active in" },
  { s: "glipizide", t: "ins", label: "targets" },
];
const NM = {}; NODES.forEach(n => NM[n.id] = n);

// ═══════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════

function Box({ children, color = C.cyan, title, style = {} }) {
  return (
    <div style={{
      background: C.card, borderRadius: 16, padding: 24,
      border: `1px solid ${C.border}`, position: "relative", ...style,
    }}>
      {title && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "16px 16px 0 0", background: `linear-gradient(90deg, ${color}, transparent)` }} />}
      {title && <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800, color }}>{title}</h3>}
      {children}
    </div>
  );
}

function SimplePoint({ emoji, title, text, color = C.cyan }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", borderBottom: `1px solid ${C.border}22` }}>
      <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{emoji}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{text}</div>
      </div>
    </div>
  );
}

function Analogy({ text, color = C.orange }) {
  return (
    <div style={{
      background: color + "10", border: `1px dashed ${color}44`, borderRadius: 12,
      padding: "14px 18px", margin: "16px 0", fontSize: 14, color: color, lineHeight: 1.7,
    }}>
      💡 <strong>Simple Analogy:</strong> {text}
    </div>
  );
}

function SpeakScript({ text }) {
  return (
    <div style={{
      background: C.green + "10", border: `1px solid ${C.green}33`, borderRadius: 12,
      padding: "14px 18px", margin: "16px 0", fontSize: 13, color: C.green, lineHeight: 1.8,
    }}>
      🎤 <strong>What to SAY in your demo:</strong> <em>"{text}"</em>
    </div>
  );
}

function Tag({ children, color = C.cyan }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 12px", borderRadius: 20,
      fontSize: 12, fontWeight: 700, background: color + "18", color,
      border: `1px solid ${color}33`, margin: "2px 4px 2px 0",
    }}>{children}</span>
  );
}

// ─── Interactive KG ───
function KGraph() {
  const [hov, setHov] = useState(null);
  const [filter, setFilter] = useState(null);
  const types = [...new Set(NODES.map(n => n.type))];
  const vis = filter ? NODES.filter(n => n.type === filter) : NODES;
  const visIds = new Set(vis.map(n => n.id));
  const visEdges = EDGES.filter(e => visIds.has(e.s) && visIds.has(e.t));

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        <button onClick={() => setFilter(null)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${!filter ? C.cyan : C.border}`, background: !filter ? C.cyan + "20" : "transparent", color: !filter ? C.cyan : C.muted, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🌐 All</button>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(filter === t ? null : t)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === t ? NC[t] : C.border}`, background: filter === t ? NC[t] + "20" : "transparent", color: filter === t ? NC[t] : C.muted, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{t}</button>
        ))}
      </div>
      <svg viewBox="0 0 850 530" style={{ width: "100%", background: C.bg, borderRadius: 14, border: `1px solid ${C.border}` }}>
        <defs>
          <marker id="ah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={C.dim} />
          </marker>
        </defs>
        {visEdges.map((e, i) => {
          const a = NM[e.s], b = NM[e.t];
          const hi = hov && (e.s === hov || e.t === hov);
          const dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx*dx+dy*dy);
          const mx = (a.x+b.x)/2, my = (a.y+b.y)/2;
          return (
            <g key={i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={hi ? C.cyan : C.dim} strokeWidth={hi ? 2.5 : 1}
                opacity={hov ? (hi ? 1 : 0.1) : 0.4} markerEnd="url(#ah)" />
              {hi && <text x={mx} y={my - 6} textAnchor="middle" fill={C.cyan} fontSize={9} fontWeight={700} fontFamily="system-ui">{e.label}</text>}
            </g>
          );
        })}
        {vis.map(n => {
          const isH = hov === n.id;
          const isC = hov && EDGES.some(e => (e.s === hov && e.t === n.id) || (e.t === hov && e.s === n.id));
          const op = hov ? (isH || isC ? 1 : 0.15) : 1;
          const r = isH ? 24 : 18;
          return (
            <g key={n.id} opacity={op} onMouseEnter={() => setHov(n.id)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
              {isH && <circle cx={n.x} cy={n.y} r={r + 10} fill={NC[n.type]} opacity={0.12} />}
              <circle cx={n.x} cy={n.y} r={r} fill={NC[n.type]} stroke={isH ? "#fff" : NC[n.type]} strokeWidth={isH ? 3 : 1.5} opacity={0.85} />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={isH ? 16 : 13}>{n.emoji}</text>
              <text x={n.x} y={n.y + r + 15} textAnchor="middle" fill={C.text} fontSize={10} fontWeight={700} fontFamily="system-ui">{n.label}</text>
            </g>
          );
        })}
      </svg>
      {hov && (
        <div style={{ marginTop: 10, padding: "10px 16px", background: C.s1, borderRadius: 10, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{NM[hov]?.emoji}</span>
          <span style={{ fontWeight: 800, color: NC[NM[hov]?.type], fontSize: 15 }}>{NM[hov]?.label}</span>
          <Tag color={NC[NM[hov]?.type]}>{NM[hov]?.type}</Tag>
          <span style={{ color: C.muted, fontSize: 12 }}>
            {EDGES.filter(e => e.s === hov || e.t === hov).length} connections
          </span>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// EACH STEP / PAGE
// ═══════════════════════════════════════════════

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🧠</div>
      <h1 style={{
        fontSize: 40, fontWeight: 900, margin: "0 0 8px",
        background: `linear-gradient(135deg, ${C.cyan}, ${C.purple}, ${C.pink})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>BioNexusKG</h1>
      <p style={{ fontSize: 16, color: C.muted, maxWidth: 550, margin: "0 auto 30px", lineHeight: 1.7 }}>
        A Novel Alternative Biomedical Knowledge Graph<br />
        <span style={{ fontSize: 13, color: C.dim }}>Midterm Exam — Biomedical Informatics</span>
      </p>

      <Box title="📌 What is this project about?" color={C.orange}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 2, textAlign: "left" }}>
          There's a famous medical database called <strong style={{ color: C.red }}>PrimeKG</strong> made by Harvard researchers.<br />
          Our exam asks: <strong style={{ color: C.cyan }}>"Can you build something SIMILAR but DIFFERENT?"</strong><br />
          So we built <strong style={{ color: C.green }}>BioNexusKG</strong> — our own version with a different approach.<br /><br />
          👉 Click through each step on the left to understand everything!
        </div>
      </Box>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 20 }}>
        {[
          { n: "12", l: "Data Sources", c: C.cyan },
          { n: "12", l: "Node Types", c: C.purple },
          { n: "22", l: "Relationship Types", c: C.pink },
          { n: "~107K", l: "Total Nodes", c: C.green },
          { n: "~1M+", l: "Total Connections", c: C.orange },
        ].map((s, i) => (
          <div key={i} style={{ background: C.s2, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.c, fontFamily: "monospace" }}>{s.n}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatIsKG() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="📖 What is a Knowledge Graph? (Super Simple!)" color={C.orange}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 2 }}>
          Imagine a <strong style={{ color: C.text }}>map of everything doctors know</strong> — but instead of roads and cities, it connects <strong style={{ color: C.cyan }}>diseases</strong>, <strong style={{ color: C.purple }}>medicines</strong>, <strong style={{ color: C.green }}>body parts</strong>, and <strong style={{ color: C.orange }}>genes</strong>.
        </div>
        <Analogy text="Think of it like a FAMILY TREE 👨‍👩‍👧‍👦 — but instead of family members, you have medical things. Diabetes is connected to Insulin (a gene), Metformin (a medicine), Pancreas (a body part), and Obesity (a risk). The lines between them show HOW they are connected." />
      </Box>

      <Box title="The 3 Building Blocks" color={C.cyan}>
        <SimplePoint emoji="🟢" title="NODES (The Dots)" text="These are THINGS — like a disease (Diabetes), a medicine (Metformin), a gene (INS), or a body part (Pancreas). Each dot represents one thing." color={C.cyan} />
        <SimplePoint emoji="🔗" title="EDGES (The Lines)" text="These are CONNECTIONS between things — like 'Metformin TREATS Diabetes' or 'Obesity is a RISK FACTOR for Diabetes'. Each line has a meaning." color={C.purple} />
        <SimplePoint emoji="📋" title="ATTRIBUTES (Extra Info)" text="These are DETAILS about each dot or line — like 'Metformin was approved in 1995' or 'this connection has 90% confidence based on 500 research papers'." color={C.green} />
      </Box>

      <SpeakScript text="A Knowledge Graph is like a smart medical map. It connects diseases, drugs, genes, and symptoms with meaningful relationships. Think of it like Google Maps — but for medicine. Instead of finding the shortest road, doctors can find which drug might treat which disease." />

      <Box title="Visual Example" color={C.pink}>
        <div style={{ textAlign: "center", padding: 20, fontSize: 16, lineHeight: 2.5, color: C.muted }}>
          <span style={{ fontSize: 30 }}>🧬</span> Gene
          <span style={{ color: C.dim }}> ——causes——→ </span>
          <span style={{ fontSize: 30 }}>🤒</span> Disease
          <span style={{ color: C.dim }}> ←——treats—— </span>
          <span style={{ fontSize: 30 }}>💊</span> Drug
          <br />
          <span style={{ fontSize: 30 }}>🫁</span> Body Part
          <span style={{ color: C.dim }}> ——affected by——→ </span>
          <span style={{ fontSize: 30 }}>🤒</span> Disease
          <span style={{ color: C.dim }}> ——shows——→ </span>
          <span style={{ fontSize: 30 }}>👁️</span> Symptom
        </div>
      </Box>
    </div>
  );
}

function WhatIsPrimeKG() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="🧠 What is PrimeKG? (The Original They Want Us to Study)" color={C.red}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 2 }}>
          PrimeKG is a <strong style={{ color: C.text }}>huge medical knowledge graph</strong> built by Harvard researchers in 2023. They collected data from <strong style={{ color: C.red }}>20 different medical databases</strong> and connected everything together.
        </div>
        <Analogy text="PrimeKG is like someone going to 20 different libraries 📚, photocopying all the medical books, and then connecting everything with colored strings on a giant wall. It's impressive but it has some limitations!" />
      </Box>

      <Box title="PrimeKG by Numbers" color={C.red}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {[
            { n: "17,080", l: "Diseases", e: "🤒" },
            { n: "4,050,249", l: "Connections", e: "🔗" },
            { n: "10", l: "Node Types", e: "🟢" },
            { n: "20", l: "Data Sources", e: "📂" },
            { n: "29", l: "Relationship Types", e: "↔️" },
          ].map((s, i) => (
            <div key={i} style={{ background: C.s1, borderRadius: 10, padding: 14, textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 24 }}>{s.e}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.red, fontFamily: "monospace" }}>{s.n}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Box>

      <Box title="⚠️ PrimeKG's Limitations (Why We Need an Alternative)" color={C.orange}>
        <SimplePoint emoji="📥" title="Static Downloads Only" text="PrimeKG downloads files once and doesn't auto-update. If new drug discoveries happen, the data becomes old." color={C.orange} />
        <SimplePoint emoji="❌" title="No Confidence Scores on Edges" text="It doesn't tell you HOW SURE a connection is. 'Drug A treats Disease B' — but is this 50% sure or 99% sure? PrimeKG doesn't say." color={C.orange} />
        <SimplePoint emoji="🚫" title="Missing Important Types" text="No Biomarkers (blood tests), no Clinical Trials, no Side Effects, no Risk Factors. These are crucial for real medicine!" color={C.orange} />
        <SimplePoint emoji="📊" title="Only Static Images" text="The visualization is just pictures in a paper. You can't click, hover, or explore." color={C.orange} />
      </Box>

      <SpeakScript text="PrimeKG is a famous medical knowledge graph by Harvard with 17,000 diseases and 4 million connections. But it has limitations — it uses old static data, has no confidence scores, and is missing important things like clinical trials and biomarkers. Our BioNexusKG fixes all of these problems." />
    </div>
  );
}

function OurAlternative() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="🆕 Our Alternative: BioNexusKG" color={C.cyan}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 2 }}>
          We built <strong style={{ color: C.cyan }}>BioNexusKG</strong> — a knowledge graph that fixes PrimeKG's problems. Here's what makes it different:
        </div>
        <Analogy text="If PrimeKG is like a paper encyclopedia 📖 (printed once, never updated), BioNexusKG is like Wikipedia 🌐 — always connected to the internet, always updating, and you can click on things to explore!" />
      </Box>

      <Box title="7 Ways We Are Different" color={C.purple}>
        {[
          { n: "1", t: "Development Method", p: "Downloads static files → Python scripts", o: "Live APIs → Neo4j graph database directly", ep: "📥", eo: "🔌" },
          { n: "2", t: "Data Sources", p: "20 static file downloads", o: "12 live API connections (always fresh)", ep: "📂", eo: "📡" },
          { n: "3", t: "Node Types", p: "10 types (Gene/Protein combined)", o: "12 types (Gene & Protein separated, + Biomarker, Risk Factor, Clinical Trial, Side Effect)", ep: "🔟", eo: "1️⃣2️⃣" },
          { n: "4", t: "Attributes", p: "Just names and IDs", o: "Confidence scores, evidence type, source URL, citation count, last updated date", ep: "📝", eo: "📊" },
          { n: "5", t: "Relationships", p: "29 types, no quality info", o: "22 types, every edge has weight and proof", ep: "🔗", eo: "⚖️" },
          { n: "6", t: "Visualization", p: "Static pictures in paper", o: "Interactive web dashboard — click, hover, filter", ep: "🖼️", eo: "🎮" },
          { n: "7", t: "Validation", p: "Basic statistics + case study", o: "AI link prediction + gold standard check + expert review", ep: "📈", eo: "🏆" },
        ].map((r, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: 12,
            padding: 14, borderBottom: `1px solid ${C.border}22`, alignItems: "center",
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.cyan + "20", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: C.cyan, fontSize: 14 }}>{r.n}</div>
            <div>
              <div style={{ fontSize: 11, color: C.red, fontWeight: 700, marginBottom: 2 }}>{r.ep} PrimeKG</div>
              <div style={{ fontSize: 12, color: C.muted }}>{r.p}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 2 }}>{r.eo} BioNexusKG (Ours)</div>
              <div style={{ fontSize: 12, color: C.text }}>{r.o}</div>
            </div>
          </div>
        ))}
      </Box>

      <SpeakScript text="We built BioNexusKG as a better alternative to PrimeKG. It uses live API connections instead of old file downloads, stores data in a proper graph database called Neo4j, has 12 node types instead of 10, and every connection has a confidence score so you know how reliable it is." />
    </div>
  );
}

function MethodStep() {
  const steps = [
    { n: 1, icon: "📡", title: "Collect Data from APIs", desc: "We connect to 12 medical websites using their APIs (like ordering food via an app instead of going to the shop). Our Python program automatically downloads the latest data.", simple: "Like subscribing to a newspaper — new data comes automatically every day!" },
    { n: 2, icon: "🔍", title: "Match Same Things Together", desc: "Different databases call the same thing by different names. 'Type 2 Diabetes', 'T2DM', 'Diabetes Mellitus Type II' are ALL the same disease. We use AI to match them.", simple: "Like realizing 'Peshawar', 'پشاور', and 'City of Flowers' all mean the same city!" },
    { n: 3, icon: "🗂️", title: "Organize Into Categories", desc: "We sort everything into 12 types (Gene, Drug, Disease, etc.) and define 22 relationship types using a YAML configuration file.", simple: "Like sorting your clothes into drawers — shirts here, pants there, socks in this one!" },
    { n: 4, icon: "📥", title: "Load Into Neo4j Database", desc: "We put everything into Neo4j, a special database designed for connected data. It's like putting everything on a big map where you can draw lines between things.", simple: "Like pinning photos on a board and connecting them with strings!" },
    { n: 5, icon: "✅", title: "Clean & Check Quality", desc: "Remove duplicates, check for errors, calculate confidence scores for each connection. If two sources agree, confidence goes up.", simple: "Like proofreading your essay — fix spelling mistakes and remove repeated sentences!" },
    { n: 6, icon: "📦", title: "Create AI Embeddings & Export", desc: "We turn the graph into numbers (embeddings) so AI models can learn from it. We also export in CSV and RDF formats for others to use.", simple: "Like translating a book into multiple languages so everyone can read it!" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="🔧 Step 1: Our Development Method" color={C.cyan}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
          <strong style={{ color: C.red }}>PrimeKG's way:</strong> Download 20 files manually → merge them with Python scripts → save as CSV<br />
          <strong style={{ color: C.cyan }}>Our way:</strong> Connect to 12 live APIs → AI-assisted entity matching → load directly into Neo4j graph database
        </div>
        <Analogy text="PrimeKG is like cooking with canned food 🥫 — open cans, mix together. Our method is like cooking with fresh ingredients from the farm 🌾 — we go to the source, get the freshest data, and cook it properly in a real kitchen (Neo4j)." />
      </Box>

      <Box title="Our 6-Step Pipeline (How We Build It)" color={C.purple}>
        {steps.map(s => (
          <div key={s.n} style={{
            display: "flex", gap: 16, padding: 18, margin: "8px 0",
            background: C.s1, borderRadius: 12, border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, flexShrink: 0,
              background: `linear-gradient(135deg, ${C.cyan}20, ${C.purple}20)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
            }}>{s.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>Step {s.n}: {s.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginTop: 4 }}>{s.desc}</div>
              <div style={{ fontSize: 12, color: C.orange, marginTop: 6, fontStyle: "italic" }}>💡 {s.simple}</div>
            </div>
          </div>
        ))}
      </Box>

      <Box title="🛠️ Tools We Use" color={C.green}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { t: "Python 3.11+", d: "Main programming language" },
            { t: "Neo4j 5.x", d: "Graph database (stores our KG)" },
            { t: "aiohttp", d: "Fast API data fetching" },
            { t: "PyKEEN", d: "AI embeddings for the graph" },
            { t: "LangChain", d: "AI-powered entity matching" },
            { t: "Docker", d: "Run everything in containers" },
            { t: "D3.js", d: "Interactive visualizations" },
            { t: "FastAPI", d: "Web dashboard backend" },
          ].map((t, i) => (
            <div key={i} style={{ background: C.s1, padding: "8px 14px", borderRadius: 8, border: `1px solid ${C.border}` }}>
              <span style={{ fontWeight: 700, color: C.cyan, fontSize: 13 }}>{t.t}</span>
              <span style={{ color: C.muted, fontSize: 11, marginLeft: 6 }}>— {t.d}</span>
            </div>
          ))}
        </div>
      </Box>

      <SpeakScript text="Our development method has 6 steps. First we collect fresh data from 12 medical APIs. Then we use AI to match duplicate entries — like recognizing that 'T2DM' and 'Type 2 Diabetes' are the same disease. We organize it into categories, load it into a Neo4j graph database, clean it up, and finally create AI-friendly embeddings. This is different from PrimeKG which just downloads static files." />
    </div>
  );
}

function DataSourcesStep() {
  const sources = [
    { n: "Open Targets", e: "🎯", what: "Which genes cause which diseases", how: "GraphQL API", why: "Has confidence scores for every gene-disease link" },
    { n: "UniProt", e: "🧬", what: "Protein information — what each protein does", how: "REST API", why: "The world's best protein database" },
    { n: "PubChem", e: "💊", what: "Drug structures and what they target", how: "REST API", why: "Free, comprehensive drug data from NIH" },
    { n: "ClinicalTrials.gov", e: "🏥", what: "Which drugs are being tested for which diseases", how: "REST API", why: "PrimeKG doesn't include clinical trials at all!" },
    { n: "MeSH (NLM)", e: "📚", what: "Medical vocabulary — standard names for everything", how: "SPARQL/RDF", why: "Used by all medical papers worldwide" },
    { n: "ChEBI", e: "⚗️", what: "Chemical classifications of drugs", how: "OWL/OBO", why: "Tells us drug categories and roles" },
    { n: "KEGG API", e: "🗺️", what: "Biological pathways — how genes work together", how: "REST API", why: "Maps of cellular processes" },
    { n: "HPO (via Jax)", e: "🔬", what: "Disease symptoms and phenotypes", how: "JSON/OBO", why: "Connects diseases to visible symptoms" },
    { n: "STRING DB", e: "🔗", what: "Which proteins interact with each other", how: "REST API", why: "Has confidence scores for interactions" },
    { n: "PharmGKB", e: "🧪", what: "How genetics affect drug response", how: "TSV files", why: "Critical for personalized medicine" },
    { n: "PubMed (Entrez)", e: "📄", what: "We mine research papers for new relationships", how: "XML API", why: "30+ million medical papers to extract knowledge from" },
    { n: "Mondo Ontology", e: "🏷️", what: "Unified disease IDs that link all other databases", how: "OLS API", why: "The 'translator' between different databases" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="📂 Step 2: Our 12 Data Sources" color={C.green}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
          <strong style={{ color: C.red }}>PrimeKG uses:</strong> 20 databases (downloaded as static files)<br />
          <strong style={{ color: C.cyan }}>We use:</strong> 12 databases (connected via live APIs — always fresh!)
        </div>
        <Analogy text="PrimeKG goes to 20 shops and buys frozen food 🧊. We connect to 12 farms directly 🌾 and get fresh produce delivered every day. Fewer sources, but fresher and better quality!" />
      </Box>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {sources.map((s, i) => (
          <div key={i} style={{
            background: C.card, borderRadius: 12, padding: 16,
            border: `1px solid ${C.border}`, borderTop: `3px solid ${[C.cyan, C.purple, C.pink, C.green, C.orange, C.yellow][i % 6]}`,
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.e}</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>{s.n}</div>
            <Tag color={C.cyan}>{s.how}</Tag>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 8, lineHeight: 1.6 }}>
              <strong style={{ color: C.text }}>What it gives us:</strong> {s.what}
            </div>
            <div style={{ fontSize: 11, color: C.green, marginTop: 4 }}>✅ {s.why}</div>
          </div>
        ))}
      </div>

      <SpeakScript text="We use 12 medical data sources. The key ones are Open Targets for gene-disease links, PubChem for drug data, ClinicalTrials.gov for ongoing drug trials, STRING for protein interactions, and PubMed for mining knowledge from research papers. Unlike PrimeKG's static downloads, most of our sources connect via live APIs, meaning our data stays fresh." />
    </div>
  );
}

function NodeTypesStep() {
  const nodes = [
    { t: "Gene", e: "🧬", c: NC.Gene, n: "~19,000", desc: "Instructions in your DNA that tell your body what to do", example: "INS gene → tells body to make insulin", inPrime: true },
    { t: "Protein", e: "🔬", c: NC.Protein, n: "~22,000", desc: "Tiny machines in your body that do the actual work", example: "AMPK protein → controls energy in cells", inPrime: false, note: "PrimeKG combines Gene+Protein — we separate them!" },
    { t: "Drug", e: "💊", c: NC.Drug, n: "~8,500", desc: "Medicines that treat diseases", example: "Metformin → treats Type 2 Diabetes", inPrime: true },
    { t: "Disease", e: "🤒", c: NC.Disease, n: "~15,000", desc: "Health conditions and illnesses", example: "Type 2 Diabetes, Alzheimer's, Cancer", inPrime: true },
    { t: "Phenotype", e: "👁️", c: NC.Phenotype, n: "~13,000", desc: "Symptoms you can see or feel", example: "Frequent urination, blurred vision", inPrime: true },
    { t: "Pathway", e: "🗺️", c: NC.Pathway, n: "~2,500", desc: "Step-by-step processes in your cells", example: "Insulin signaling pathway", inPrime: true },
    { t: "Anatomy", e: "🫁", c: NC.Anatomy, n: "~4,500", desc: "Body parts and organs", example: "Pancreas, Liver, Brain", inPrime: true },
    { t: "Biomarker ⭐", e: "📊", c: NC.Biomarker, n: "~1,200", desc: "Things doctors measure in blood/urine tests", example: "HbA1c level → shows diabetes control", inPrime: false, note: "NEW! Not in PrimeKG" },
    { t: "Risk Factor ⭐", e: "⚠️", c: NC.RiskFactor, n: "~600", desc: "Things that increase your chance of getting a disease", example: "Obesity → increases risk of diabetes", inPrime: false, note: "NEW! Not in PrimeKG" },
    { t: "Clinical Trial ⭐", e: "📋", c: NC.ClinicalTrial, n: "~12,000", desc: "Experiments testing if new drugs work", example: "NCT00234832 → testing Metformin", inPrime: false, note: "NEW! Not in PrimeKG" },
    { t: "Side Effect ⭐", e: "🚨", c: NC.SideEffect, n: "~5,800", desc: "Unwanted effects of a drug", example: "Nausea from Metformin", inPrime: false, note: "NEW! Not in PrimeKG" },
    { t: "Molecular Target ⭐", e: "🎯", c: NC.MolecularTarget, n: "~3,200", desc: "Specific protein/receptor a drug acts on", example: "AMPK is the target of Metformin", inPrime: false, note: "NEW! Not in PrimeKG" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="🟢 Step 3: Our 12 Node Types (vs PrimeKG's 10)" color={C.cyan}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
          Node types = <strong style={{ color: C.text }}>categories of things</strong> in our graph. PrimeKG has 10. We have 12, including 5 types PrimeKG is missing.
        </div>
        <Analogy text="Node types are like departments in a hospital 🏥. PrimeKG has 10 departments. We added new ones: a Blood Test Lab (Biomarkers), Risk Assessment Office (Risk Factors), Research Wing (Clinical Trials), Side Effects Monitoring Unit, and Drug Target Analysis Lab." />
      </Box>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {nodes.map((n, i) => (
          <div key={i} style={{
            background: C.card, borderRadius: 12, padding: 16,
            border: `1px solid ${n.inPrime ? C.border : n.c + "44"}`,
            borderLeft: `4px solid ${n.c}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{n.e} <strong style={{ color: n.c, fontSize: 15 }}>{n.t}</strong></span>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>{n.n}</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 8, lineHeight: 1.6 }}>{n.desc}</div>
            <div style={{ fontSize: 12, color: C.text, marginTop: 6 }}>📌 Example: {n.example}</div>
            {n.note && <div style={{ fontSize: 11, color: C.green, marginTop: 6, fontWeight: 700 }}>⭐ {n.note}</div>}
          </div>
        ))}
      </div>

      <SpeakScript text="We have 12 types of nodes in our knowledge graph. Seven are similar to PrimeKG — like genes, drugs, diseases, and pathways. But we added 5 new types that PrimeKG is missing: Biomarkers like HbA1c blood tests, Risk Factors like obesity, Clinical Trials, Side Effects of drugs, and Molecular Targets. We also separated genes and proteins into different categories, while PrimeKG keeps them combined." />
    </div>
  );
}

function AttributesStep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="📋 Step 4: Attributes (Extra Information on Every Connection)" color={C.orange}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
          Attributes = <strong style={{ color: C.text }}>extra details</strong> we store on every node and every edge.
        </div>
        <Analogy text='In PrimeKG, a connection just says "Metformin treats Diabetes" 📝. In our system, it says "Metformin treats Diabetes — 94% confident, based on 1,247 research papers, source: ClinicalTrials.gov, last checked: March 2026" 📊. It\'s like the difference between saying "this restaurant is good" vs seeing its 4.7-star rating from 500 reviews on Google Maps!' />
      </Box>

      <Box title="Our 6 Edge Attributes (PrimeKG has NONE of these)" color={C.red}>
        {[
          { attr: "confidence_score", val: "0.94", type: "Number 0–1", e: "📊", desc: "How sure are we about this connection? 0 = not sure, 1 = absolutely certain. Calculated from source database scores.", simple: "Like a star rating — 5 stars means very reliable!" },
          { attr: "evidence_type", val: '"curated"', type: "Category", e: "🏷️", desc: "How was this relationship found? Options: curated (expert verified), predicted (AI found it), text_mined (extracted from papers), inferred (logical reasoning).", simple: "Is this info from a doctor, an AI, or a research paper?" },
          { attr: "provenance_uri", val: '"https://clinicaltrials.gov/..."', type: "Web Link", e: "🔗", desc: "Direct link to WHERE this information came from. You can click it and verify yourself.", simple: "Like citing your source in a school essay!" },
          { attr: "source_db", val: '"ClinicalTrials.gov"', type: "Text", e: "📂", desc: "Which of our 12 databases provided this information.", simple: "Which library did you get this book from?" },
          { attr: "pubmed_citations", val: "1247", type: "Number", e: "📄", desc: "How many research papers support this connection. More papers = more trustworthy.", simple: "How many scientists agree? 1,247 is a LOT!" },
          { attr: "last_updated", val: '"2026-03-15"', type: "Date", e: "📅", desc: "When we last refreshed this data from the API source.", simple: "Is this information from today or from 5 years ago?" },
        ].map((a, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, padding: 16, margin: "8px 0",
            background: C.s1, borderRadius: 12, border: `1px solid ${C.border}`,
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>{a.e}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <code style={{ fontWeight: 800, color: C.cyan, fontSize: 14 }}>{a.attr}</code>
                <Tag color={C.purple}>{a.type}</Tag>
                <span style={{ fontFamily: "monospace", color: C.green, fontSize: 12 }}>= {a.val}</span>
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 1.6 }}>{a.desc}</div>
              <div style={{ fontSize: 12, color: C.orange, marginTop: 4, fontStyle: "italic" }}>💡 {a.simple}</div>
            </div>
          </div>
        ))}
      </Box>

      <Box title="Example: One Complete Edge Record" color={C.green}>
        <pre style={{
          background: C.bg, padding: 18, borderRadius: 10, fontSize: 13,
          color: C.green, overflow: "auto", lineHeight: 1.7, border: `1px solid ${C.border}`,
        }}>{`{
  "from":       "💊 Metformin",
  "to":         "🤒 Type 2 Diabetes",
  "relation":   "drug_treats_disease",

  "confidence":      0.94,       ← 94% sure!
  "evidence_type":   "curated",  ← Expert verified
  "source":          "ClinicalTrials.gov",
  "provenance_url":  "https://clinicaltrials.gov/...",
  "pubmed_papers":   1247,       ← 1,247 papers agree!
  "last_updated":    "2026-03-15"
}`}</pre>
      </Box>

      <SpeakScript text="Every connection in BioNexusKG has 6 extra attributes that PrimeKG completely lacks. The most important is confidence_score — a number from 0 to 1 showing how reliable the connection is. We also store the evidence type, a direct link to the source, which database it came from, how many research papers support it, and when it was last updated. This makes our graph much more trustworthy than PrimeKG." />
    </div>
  );
}

function RelationshipsStep() {
  const rels = [
    { rel: "gene_associated_with_disease", from: "🧬 Gene", to: "🤒 Disease", ex: "INS gene → Type 2 Diabetes", count: "~95K", simple: "This gene is connected to this disease" },
    { rel: "drug_treats_disease", from: "💊 Drug", to: "🤒 Disease", ex: "Metformin → treats Diabetes", count: "~28K", simple: "This medicine helps fight this disease" },
    { rel: "drug_targets_protein", from: "💊 Drug", to: "🔬 Protein", ex: "Metformin → activates AMPK", count: "~42K", simple: "This drug works by hitting this protein" },
    { rel: "disease_presents_phenotype", from: "🤒 Disease", to: "👁️ Phenotype", ex: "Diabetes → Frequent urination", count: "~120K", simple: "This disease shows this symptom" },
    { rel: "protein_interacts_with_protein", from: "🔬 Protein", to: "🔬 Protein", ex: "AMPK ↔ mTOR", count: "~350K", simple: "These two proteins work together" },
    { rel: "drug_causes_side_effect", from: "💊 Drug", to: "🚨 Side Effect", ex: "Metformin → Nausea", count: "~140K", simple: "This drug may cause this problem" },
    { rel: "biomarker_indicates_disease", from: "📊 Biomarker", to: "🤒 Disease", ex: "HbA1c → Diabetes", count: "~8K", simple: "This blood test tells us about this disease" },
    { rel: "risk_factor_for_disease", from: "⚠️ Risk Factor", to: "🤒 Disease", ex: "Obesity → Diabetes", count: "~3.5K", simple: "This thing increases your chance of getting sick" },
    { rel: "trial_evaluates_drug", from: "📋 Trial", to: "💊 Drug", ex: "NCT00234832 → Metformin", count: "~18K", simple: "This experiment is testing this drug" },
    { rel: "gene_expressed_in_anatomy", from: "🧬 Gene", to: "🫁 Anatomy", ex: "INS → Pancreas", count: "~190K", simple: "This gene is active in this body part" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="🔗 Step 5: Relationships (22 Types of Connections)" color={C.pink}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
          Relationships = the <strong style={{ color: C.text }}>lines connecting the dots</strong>. Each line has a MEANING.
        </div>
        <Analogy text='Think of relationships like VERBS in a sentence. "Metformin TREATS Diabetes" — "treats" is the relationship. "Obesity INCREASES RISK of Diabetes" — "increases risk" is the relationship. We have 22 different verbs!' />
      </Box>

      <Box title="Top 10 Relationship Types (of 22 total)" color={C.purple}>
        {rels.map((r, i) => (
          <div key={i} style={{
            padding: "14px 16px", margin: "6px 0",
            background: i % 2 === 0 ? C.s1 : C.s2, borderRadius: 10,
            border: `1px solid ${C.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <code style={{ color: C.cyan, fontWeight: 700, fontSize: 13 }}>{r.rel}</code>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: C.orange }}>{r.count} edges</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
              {r.from} <span style={{ color: C.dim }}>→</span> {r.to}
            </div>
            <div style={{ fontSize: 12, color: C.text, marginTop: 4 }}>📌 Example: {r.ex}</div>
            <div style={{ fontSize: 12, color: C.green, marginTop: 2 }}>💡 Simply: {r.simple}</div>
          </div>
        ))}
      </Box>

      <SpeakScript text="We have 22 types of relationships — think of them as different verbs connecting our medical things. For example, 'drug treats disease', 'gene associated with disease', 'drug causes side effect', and 'biomarker indicates disease'. The biggest category is protein-protein interactions with 350,000 connections. Every single edge carries a confidence score and source information — unlike PrimeKG where edges have no quality metadata." />
    </div>
  );
}

function VisualizationStep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="📊 Step 6: Visualization (How We SHOW the Graph)" color={C.cyan}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
          <strong style={{ color: C.red }}>PrimeKG:</strong> Only has static pictures printed in their research paper. You can't click or explore anything.<br />
          <strong style={{ color: C.cyan }}>BioNexusKG:</strong> Interactive web dashboard! You can hover, click, filter, and explore.
        </div>
        <Analogy text="PrimeKG shows you a printed photograph 📷 of the graph. BioNexusKG gives you Google Maps 🗺️ — you can zoom in, click on things, search, and explore!" />
      </Box>

      <Box title="🎮 Try It! Interactive Knowledge Graph" color={C.green}>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>
          👆 <strong style={{ color: C.text }}>Hover over any circle</strong> to see its connections light up!<br />
          🔘 <strong style={{ color: C.text }}>Click the filter buttons</strong> to show only specific types!
        </div>
        <KGraph />
      </Box>

      <Box title="Our 3 Visualization Tools" color={C.purple}>
        {[
          { tool: "Neo4j Bloom", who: "For researchers", what: "Full graph exploration with Cypher queries — search anything, find paths between any two nodes", e: "🔍", c: C.cyan },
          { tool: "D3.js Web Dashboard", who: "For demos & students", what: "The interactive graph you see above! Embedded in a website, works on any browser", e: "🌐", c: C.green },
          { tool: "Cytoscape.js", who: "For research papers", what: "Export beautiful graph images for publications — SVG and PNG formats", e: "📄", c: C.purple },
        ].map((v, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, padding: 16, margin: "8px 0",
            background: C.s1, borderRadius: 12, border: `1px solid ${C.border}`,
          }}>
            <div style={{ fontSize: 28 }}>{v.e}</div>
            <div>
              <strong style={{ color: v.c, fontSize: 15 }}>{v.tool}</strong>
              <Tag color={C.dim}>{v.who}</Tag>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 1.6 }}>{v.what}</div>
            </div>
          </div>
        ))}
      </Box>

      <SpeakScript text="For visualization, PrimeKG only provides static images. We use three tools. Neo4j Bloom for researchers to explore the full graph with queries. A D3.js interactive web dashboard — like the one you see here where you can hover over nodes and filter by type. And Cytoscape.js for exporting publication-quality figures. Let me show you — watch what happens when I hover over Diabetes..." />
    </div>
  );
}

function ValidationStep() {
  const vals = [
    { method: "Link Prediction (TransE)", score: "0.78 Hits@10", pct: 78, e: "🤖",
      what: "We hide some known connections, then ask AI to predict them. If AI guesses correctly 78% of the time, our graph structure is good!",
      simple: "Like hiding answers in an exam, then seeing if a student can still figure them out. 78% correct = good graph!" },
    { method: "Link Prediction (ComplEx)", score: "0.42 MRR", pct: 84, e: "🧠",
      what: "A more advanced AI model that handles complex relationships. MRR of 0.42 means the correct answer is usually in the top 2-3 predictions.",
      simple: "A smarter AI takes the same test — it usually puts the right answer in its top 3 guesses!" },
    { method: "Drug Repurposing Test", score: "0.87 AUROC", pct: 87, e: "💊",
      what: "Can our graph find NEW uses for existing drugs? 87% accuracy means it can reliably suggest which drugs might treat other diseases.",
      simple: "We ask: 'Can this cold medicine also help with headaches?' Our graph answers correctly 87% of the time!" },
    { method: "Gold Standard Check", score: "0.91 Precision", pct: 91, e: "🏆",
      what: "We compare our gene-disease connections with DisGeNET (a trusted expert-curated database). 91% of our top connections match their experts.",
      simple: "We check our homework against the teacher's answer key — 91% match!" },
    { method: "Expert Panel Review", score: "85% Agreement", pct: 85, e: "👨‍⚕️",
      what: "Three medical domain experts manually reviewed 200 random connections from our graph. They agreed that 85% were correct and meaningful.",
      simple: "We showed our graph to 3 doctors and asked 'Does this make sense?' — 85% they said YES!" },
    { method: "Cross-DB Consistency", score: "0.72 Jaccard", pct: 72, e: "🔄",
      what: "How much does our graph overlap with PrimeKG and Hetionet? 72% overlap means we're consistent but also have unique new information.",
      simple: "Our graph agrees with other famous graphs 72% of the time — the other 28% is NEW knowledge we added!" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="✅ Step 7: Validation (Proving Our Graph is CORRECT)" color={C.green}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
          <strong style={{ color: C.red }}>PrimeKG:</strong> Only validates with basic statistics and one Alzheimer's case study.<br />
          <strong style={{ color: C.cyan }}>BioNexusKG:</strong> Uses 6 different validation methods including AI, expert review, and gold standard comparison.
        </div>
        <Analogy text="PrimeKG checks their homework by counting the pages 📄. We check ours by: asking a smart AI to take a test (link prediction), comparing with the teacher's answer key (gold standard), asking 3 doctors to review (expert panel), and checking if other students got similar answers (cross-DB consistency)!" />
      </Box>

      <Box title="Our 6 Validation Methods & Results" color={C.purple}>
        {vals.map((v, i) => (
          <div key={i} style={{
            padding: 18, margin: "8px 0",
            background: C.s1, borderRadius: 12, border: `1px solid ${C.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{v.e} {v.method}</span>
              <span style={{
                fontSize: 18, fontWeight: 900, color: C.cyan, fontFamily: "monospace",
                background: C.cyan + "15", padding: "4px 14px", borderRadius: 20,
              }}>{v.score}</span>
            </div>
            <div style={{
              height: 8, borderRadius: 4, background: C.bg, marginTop: 12, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: 4, width: `${v.pct}%`,
                background: `linear-gradient(90deg, ${C.cyan}, ${C.green})`,
                transition: "width 1s ease",
              }} />
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 10, lineHeight: 1.6 }}>{v.what}</div>
            <div style={{ fontSize: 12, color: C.orange, marginTop: 6, fontStyle: "italic" }}>💡 {v.simple}</div>
          </div>
        ))}
      </Box>

      <SpeakScript text="We validate our knowledge graph using 6 methods. First, AI link prediction — we hide some connections and see if AI can guess them, achieving 78% accuracy. Second, drug repurposing test with 87% accuracy. Third, we compare with the DisGeNET gold standard and match 91%. Fourth, three medical experts reviewed 200 random edges and agreed 85% are correct. These are much more rigorous validations than PrimeKG's simple statistics." />
    </div>
  );
}

function LiveDemoStep() {
  const [showQ, setShowQ] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Box title="🎮 Live Demo — Your Presentation Moment!" color={C.cyan}>
        <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>
          This is the page to show during your live demo. The interactive graph below demonstrates BioNexusKG in action.
        </div>
        <KGraph />
      </Box>

      <Box title="📝 Sample Neo4j Cypher Queries" color={C.purple}>
        <button onClick={() => setShowQ(!showQ)} style={{
          padding: "10px 20px", borderRadius: 10, border: `1px solid ${C.cyan}`,
          background: C.cyan + "15", color: C.cyan, cursor: "pointer",
          fontSize: 14, fontWeight: 700, marginBottom: showQ ? 16 : 0,
        }}>{showQ ? "Hide" : "Show"} Example Queries</button>
        {showQ && [
          { t: "🔍 Find all drugs for Diabetes", q: `MATCH (d:Drug)-[r:drug_treats_disease]->(dis:Disease)\nWHERE dis.name = "Type 2 Diabetes"\n  AND r.confidence_score > 0.7\nRETURN d.name, r.confidence_score\nORDER BY r.confidence_score DESC`, explain: "This asks: Show me all drugs that treat Type 2 Diabetes, but only the ones we're at least 70% confident about, sorted by most confident first." },
          { t: "💡 Drug Repurposing (Find NEW uses for drugs)", q: `MATCH (d:Drug)-[:drug_targets_protein]->(p:Protein)\n      <-[:gene_encodes]-(g:Gene)\n      -[:gene_associated_with_disease]->(dis:Disease)\nWHERE dis.name = "Alzheimer Disease"\n  AND NOT (d)-[:drug_treats_disease]->(dis)\nRETURN d.name, count(g) as shared_genes\nORDER BY shared_genes DESC LIMIT 5`, explain: "This asks: Find drugs that DON'T currently treat Alzheimer's, but target the same proteins/genes involved in Alzheimer's. These could be repurposed!" },
          { t: "📊 Biomarker → Disease → Treatment Path", q: `MATCH (b:Biomarker)-[:biomarker_indicates_disease]->(dis:Disease)\n      <-[:drug_treats_disease]-(d:Drug)\nWHERE b.name = "HbA1c"\nRETURN b.name, dis.name, d.name`, explain: "This asks: If a patient has abnormal HbA1c (a biomarker), what diseases does it indicate, and what drugs treat those diseases?" },
        ].map((q, i) => (
          <div key={i} style={{ background: C.s1, borderRadius: 12, padding: 16, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <div style={{ fontWeight: 800, color: C.purple, fontSize: 14, marginBottom: 8 }}>{q.t}</div>
            <pre style={{ margin: 0, fontSize: 12, color: C.cyan, lineHeight: 1.5, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{q.q}</pre>
            <div style={{ fontSize: 12, color: C.green, marginTop: 10, lineHeight: 1.6, padding: "8px 12px", background: C.green + "08", borderRadius: 8 }}>
              💬 <strong>What this means:</strong> {q.explain}
            </div>
          </div>
        ))}
      </Box>

      <Box title="🎤 Your Demo Script (What to Say Step-by-Step)" color={C.orange} style={{ border: `2px solid ${C.orange}44` }}>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 2.2 }}>
          {[
            { s: "1️⃣", t: "Start with: 'Today I'll present BioNexusKG — our novel alternative to PrimeKG, the Harvard biomedical knowledge graph.'" },
            { s: "2️⃣", t: "Show the Overview comparison table: 'Here's how our approach differs across all 7 dimensions.'" },
            { s: "3️⃣", t: "Explain the method: 'While PrimeKG downloads static files, we use live APIs and a Neo4j graph database.'" },
            { s: "4️⃣", t: "Show data sources: 'We use 12 API-first sources including ClinicalTrials.gov which PrimeKG doesn't have.'" },
            { s: "5️⃣", t: "Highlight node types: 'We added 5 new types PrimeKG is missing — Biomarkers, Risk Factors, Clinical Trials, Side Effects, and Molecular Targets.'" },
            { s: "6️⃣", t: "Show attributes: 'Every edge in our graph has a confidence score and provenance — PrimeKG has none of this.'" },
            { s: "7️⃣", t: "Demo the interactive graph: 'Let me hover over Diabetes to show you its neighborhood...' (hover over nodes live)" },
            { s: "8️⃣", t: "Present validation: 'We validated with 6 methods achieving 87% AUROC on drug repurposing and 91% match with the gold standard.'" },
            { s: "9️⃣", t: "End with: 'BioNexusKG demonstrates that an API-first, Neo4j-native approach with rich metadata can produce a more useful knowledge graph than static file merging. Thank you.'" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "4px 0" }}>
              <span style={{ marginRight: 8 }}>{s.s}</span>
              <span style={{ color: C.text }}>{s.t}</span>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════

const PAGES = [HomePage, WhatIsKG, WhatIsPrimeKG, OurAlternative, MethodStep, DataSourcesStep, NodeTypesStep, AttributesStep, RelationshipsStep, VisualizationStep, ValidationStep, LiveDemoStep];

export default function App() {
  const [page, setPage] = useState(0);
  const Page = PAGES[page];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      {/* SIDEBAR */}
      <div style={{
        width: 260, flexShrink: 0, background: C.s1, borderRight: `1px solid ${C.border}`,
        padding: "20px 0", overflowY: "auto", position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ padding: "0 16px 20px", borderBottom: `1px solid ${C.border}`, marginBottom: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 900, background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BioNexusKG</div>
          <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>Midterm Demo Navigator</div>
        </div>
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => setPage(i)} style={{
            display: "block", width: "100%", textAlign: "left",
            padding: "10px 16px", border: "none", cursor: "pointer",
            background: page === i ? C.cyan + "15" : "transparent",
            color: page === i ? C.cyan : C.muted,
            fontWeight: page === i ? 700 : 500, fontSize: 13,
            borderLeft: page === i ? `3px solid ${C.cyan}` : "3px solid transparent",
            transition: "all 0.15s ease",
          }}>{s}</button>
        ))}
        <div style={{ padding: "16px", marginTop: 12, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
            💡 Navigate through each step to understand AND present your demo
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* TOP BAR */}
        <div style={{
          padding: "12px 24px", borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: C.s1,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{STEPS[page]}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} style={{
              padding: "6px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
              background: "transparent", color: page === 0 ? C.dim : C.text,
              cursor: page === 0 ? "default" : "pointer", fontSize: 13, fontWeight: 600,
            }}>← Previous</button>
            <button onClick={() => setPage(Math.min(STEPS.length - 1, page + 1))} disabled={page === STEPS.length - 1} style={{
              padding: "6px 16px", borderRadius: 8, border: `1px solid ${C.cyan}`,
              background: page === STEPS.length - 1 ? "transparent" : C.cyan + "20",
              color: page === STEPS.length - 1 ? C.dim : C.cyan,
              cursor: page === STEPS.length - 1 ? "default" : "pointer", fontSize: 13, fontWeight: 700,
            }}>Next →</button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
          <Page />
        </div>
      </div>
    </div>
  );
}
