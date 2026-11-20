"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, PageHeader, Section } from "@/components/ui/Layout";

interface SparqlResponse {
  head?: { vars: string[] };
  results?: { bindings: Record<string, { value: string; type: string }>[] };
  error?: string;
}

interface HealthResponse {
  status: string;
  services?: {
    fuseki?: {
      status: "connected" | "disconnected";
      message: string;
    };
  };
}

const SAMPLE_QUERIES = [
  {
    label: "1. Karakter dan Versi Game (hasVersion & appearsIn)",
    query: `PREFIX mk: <https://example.org/mk/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?character ?name ?versionName ?gameTitle
WHERE {
  ?character a mk:Character ;
             mk:name ?name ;
             mk:hasVersion ?version .
  ?version mk:name ?versionName ;
           mk:appearsIn ?game .
  ?game mk:name ?gameTitle .
}
ORDER BY ?name
LIMIT 20`,
  },
  {
    label: "2. Karakter dengan Kemampuan Elemen Api (hasAbility → hasElement)",
    query: `PREFIX mk: <https://example.org/mk/>

SELECT ?charName ?abilityName ?elementName
WHERE {
  ?version a mk:CharacterVersion ;
           mk:name ?charName ;
           mk:hasAbility ?ability .
  ?ability mk:name ?abilityName ;
           mk:hasElement ?element .
  ?element mk:name ?elementName .
  FILTER(regex(?elementName, "Fire", "i"))
}
LIMIT 20`,
  },
  {
    label: "3. Anggota Klan Lin Kuei (memberOf)",
    query: `PREFIX mk: <https://example.org/mk/>

SELECT ?charName ?clanName
WHERE {
  ?version a mk:CharacterVersion ;
           mk:name ?charName ;
           mk:memberOf ?clan .
  ?clan mk:name ?clanName .
  FILTER(regex(?clanName, "Lin Kuei", "i"))
}
LIMIT 20`,
  },
  {
    label: "4. Musuh & Rivalitas Scorpion (enemyOf / rivalOf)",
    query: `PREFIX mk: <https://example.org/mk/>

SELECT ?scorpionName ?enemyName
WHERE {
  ?scorpion a mk:CharacterVersion ;
            mk:name ?scorpionName ;
            mk:enemyOf ?enemy .
  ?enemy mk:name ?enemyName .
  FILTER(regex(?scorpionName, "Scorpion", "i"))
}
LIMIT 20`,
  },
  {
    label: "5. Peristiwa Cerita Melibatkan Sub-Zero di Reboot Timeline",
    query: `PREFIX mk: <https://example.org/mk/>

SELECT ?title ?summary ?timelineName
WHERE {
  ?event a mk:Event ;
         mk:eventTitle ?title ;
         mk:eventSummary ?summary ;
         mk:involvesCharacter ?version ;
         mk:occursIn ?timeline .
  ?version mk:name ?charName .
  ?timeline mk:name ?timelineName .
  FILTER(regex(?charName, "Sub-Zero", "i"))
  FILTER(regex(?timelineName, "Reboot", "i"))
}
LIMIT 20`,
  },
];

const NODES = [
  { id: "scorpion", label: "Scorpion", type: "character", x: 260, y: 160, color: "#b51f2b" },
  { id: "subzero", label: "Sub-Zero", type: "character", x: 440, y: 160, color: "#3b82f6" },
  { id: "raiden", label: "Raiden", type: "character", x: 350, y: 60, color: "#eab308" },
  { id: "hellfire", label: "Hellfire", type: "ability", x: 140, y: 90, color: "#f97316" },
  { id: "cryomancy", label: "Cryomancy", type: "ability", x: 560, y: 90, color: "#06b6d4" },
  { id: "shirai", label: "Shirai Ryu", type: "clan", x: 150, y: 260, color: "#10b981" },
  { id: "linkuei", label: "Lin Kuei", type: "clan", x: 550, y: 260, color: "#10b981" },
  { id: "mk11", label: "Mortal Kombat 11", type: "game", x: 350, y: 270, color: "#8b5cf6" },
];

const EDGES = [
  { from: "scorpion", to: "hellfire", label: "hasAbility" },
  { from: "subzero", to: "cryomancy", label: "hasAbility" },
  { from: "scorpion", to: "subzero", label: "rivalOf / enemyOf" },
  { from: "scorpion", to: "shirai", label: "memberOf" },
  { from: "subzero", to: "linkuei", label: "memberOf" },
  { from: "scorpion", to: "mk11", label: "appearsIn" },
  { from: "subzero", to: "mk11", label: "appearsIn" },
  { from: "raiden", to: "scorpion", label: "alliedWith" },
];

export default function KnowledgeGraphPage() {
  const [selectedNode, setSelectedNode] = useState<string>("scorpion");
  const [sparqlQuery, setSparqlQuery] = useState(SAMPLE_QUERIES[0].query);
  const [fusekiStatus, setFusekiStatus] = useState<"checking" | "connected" | "disconnected">("checking");
  const [sparqlLoading, setSparqlLoading] = useState(false);
  const [sparqlResult, setSparqlResult] = useState<SparqlResponse | null>(null);

  // Check health of Fuseki endpoint
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: HealthResponse) => {
        const fStatus = data?.services?.fuseki?.status;
        setFusekiStatus(fStatus === "connected" ? "connected" : "disconnected");
      })
      .catch(() => {
        setFusekiStatus("disconnected");
      });
  }, []);

  const executeSparql = async () => {
    setSparqlLoading(true);
    setSparqlResult(null);
    try {
      const res = await fetch("/api/sparql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: sparqlQuery }),
      });
      const data = await res.json();
      setSparqlResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengeksekusi SPARQL.";
      setSparqlResult({ error: msg });
    } finally {
      setSparqlLoading(false);
    }
  };

  const activeNodeData = NODES.find((n) => n.id === selectedNode);
  const connectedEdges = EDGES.filter((e) => e.from === selectedNode || e.to === selectedNode);

  return (
    <>
      <PageHeader
        eyebrow="Knowledge Graph &amp; SPARQL"
        title="Knowledge Graph &amp; SPARQL Explorer"
        description="Visualisasi hubungan antar-entitas (FR-16) dan console eksekusi query SPARQL langsung terhadap Knowledge Base (FR-17)."
        crumbs={[{ label: "Knowledge Graph" }]}
      />

      <Container className="space-y-12 py-10">
        {/* SECTION 1: INTERACTIVE GRAPH EXPLORER (FR-16) */}
        <Section
          title="Interactive Knowledge Graph Preview"
          action={
            <span className="text-xs text-mk-muted">Klik node untuk melihat relasi terhubung</span>
          }
        >
          <div className="grid gap-6 lg:grid-cols-12">
            {/* SVG Graph Canvas */}
            <div className="panel overflow-hidden rounded-sm p-4 lg:col-span-8">
              <svg viewBox="0 0 700 340" className="w-full h-auto select-none">
                {/* Edges */}
                {EDGES.map((e, idx) => {
                  const fromNode = NODES.find((n) => n.id === e.from)!;
                  const toNode = NODES.find((n) => n.id === e.to)!;
                  const isConnected = e.from === selectedNode || e.to === selectedNode;
                  const midX = (fromNode.x + toNode.x) / 2;
                  const midY = (fromNode.y + toNode.y) / 2;

                  return (
                    <g key={idx}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isConnected ? "#b51f2b" : "#292b35"}
                        strokeWidth={isConnected ? "2" : "1"}
                        strokeDasharray={isConnected ? "none" : "2,2"}
                      />
                      <rect
                        x={midX - 28}
                        y={midY - 7}
                        width="56"
                        height="14"
                        fill="#08090d"
                        rx="2"
                        className="opacity-80"
                      />
                      <text
                        x={midX}
                        y={midY + 3}
                        fontSize="8"
                        fill={isConnected ? "#c6a15b" : "#a0a2aa"}
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {e.label}
                      </text>
                    </g>
                  );
                })}

                {/* Nodes */}
                {NODES.map((n) => {
                  const isSelected = n.id === selectedNode;
                  return (
                    <g
                      key={n.id}
                      onClick={() => setSelectedNode(n.id)}
                      className="cursor-pointer transition transform"
                    >
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isSelected ? "22" : "18"}
                        fill="#11131a"
                        stroke={n.color}
                        strokeWidth={isSelected ? "3" : "1.5"}
                        className={isSelected ? "filter drop-shadow-[0_0_8px_rgba(181,31,43,0.7)]" : ""}
                      />
                      <text
                        x={n.x}
                        y={n.y + 4}
                        fontSize={isSelected ? "9" : "8"}
                        fill="#f5f5f5"
                        fontWeight={isSelected ? "bold" : "normal"}
                        textAnchor="middle"
                      >
                        {n.label}
                      </text>
                      <text
                        x={n.x}
                        y={n.y + 32}
                        fontSize="7"
                        fill="#a0a2aa"
                        textAnchor="middle"
                        className="uppercase tracking-wider"
                      >
                        {n.type}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Node Details Panel */}
            <div className="panel rounded-sm p-5 space-y-4 lg:col-span-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-mk-gold">Node Terpilih:</span>
                <h3 className="font-heading text-2xl font-bold text-mk-text">
                  {activeNodeData?.label}
                </h3>
                <span className="mt-1 inline-block rounded-sm border border-mk-border bg-mk-bg px-2 py-0.5 text-xs uppercase text-mk-muted">
                  Tipe: {activeNodeData?.type}
                </span>
              </div>

              <div className="border-t border-mk-border pt-3 space-y-2">
                <p className="text-xs font-semibold text-mk-gold uppercase tracking-wider">
                  Relasi Terhubung ({connectedEdges.length}):
                </p>
                <ul className="space-y-1.5 text-xs">
                  {connectedEdges.map((e, idx) => {
                    const otherId = e.from === selectedNode ? e.to : e.from;
                    const otherNode = NODES.find((n) => n.id === otherId);
                    const isOutgoing = e.from === selectedNode;

                    return (
                      <li
                        key={idx}
                        className="flex items-center justify-between rounded border border-mk-border bg-mk-bg px-2.5 py-1.5"
                      >
                        <span className="text-mk-muted font-mono">{e.label}</span>
                        <span className="flex items-center gap-1 font-medium text-mk-text">
                          <span>{isOutgoing ? "→" : "←"}</span>
                          <span>{otherNode?.label}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {activeNodeData?.type === "character" && (
                <div className="pt-2">
                  <Link
                    href={`/characters/${activeNodeData.id}`}
                    className="btn-primary !w-full justify-center !text-xs"
                  >
                    Buka Detail Karakter →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* SECTION 2: SPARQL EXPLORER (FR-17) */}
        <Section
          title="SPARQL Query Explorer"
          action={
            <div className="flex items-center gap-2 text-xs">
              <span className="text-mk-muted">Status Fuseki:</span>
              <span
                className={`flex items-center gap-1 rounded-sm px-2 py-0.5 font-medium ${
                  fusekiStatus === "connected"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : fusekiStatus === "checking"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-red-500/20 text-red-300 border border-red-500/40"
                }`}
              >
                <span>{fusekiStatus === "connected" ? "● Online" : fusekiStatus === "checking" ? "○ Checking…" : "✕ Offline"}</span>
              </span>
            </div>
          }
        >
          <div className="panel rounded-sm p-6 space-y-5">
            {/* Status note if Fuseki is offline */}
            {fusekiStatus === "disconnected" && (
              <div className="rounded-sm border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200 space-y-1">
                <p className="font-semibold">⚠️ Fuseki SPARQL Endpoint Belum Aktif di localhost:3030</p>
                <p className="text-amber-300/80">
                  Untuk menjalankan Fuseki lokal: jalankan script <code className="text-mk-gold">fuseki/run-fuseki.bat</code> atau <code className="text-mk-gold">fuseki/setup-fuseki.ps1</code> yang telah disediakan tim.
                </p>
              </div>
            )}

            {/* Query Presets */}
            <div className="space-y-1.5">
              <label htmlFor="query-presets" className="text-xs font-semibold uppercase tracking-wider text-mk-gold">
                Pilih Contoh Query SPARQL (Sample Queries):
              </label>
              <select
                id="query-presets"
                onChange={(e) => {
                  const chosen = SAMPLE_QUERIES.find((q) => q.label === e.target.value);
                  if (chosen) setSparqlQuery(chosen.query);
                }}
                className="w-full rounded-sm border border-mk-border bg-mk-bg px-3 py-2 text-sm text-mk-text focus:border-mk-red focus:outline-none"
              >
                {SAMPLE_QUERIES.map((q) => (
                  <option key={q.label} value={q.label}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Query Editor */}
            <div className="space-y-1.5">
              <label htmlFor="sparql-editor" className="text-xs font-semibold uppercase tracking-wider text-mk-muted">
                SPARQL Query Editor:
              </label>
              <textarea
                id="sparql-editor"
                value={sparqlQuery}
                onChange={(e) => setSparqlQuery(e.target.value)}
                rows={9}
                className="w-full font-mono text-xs rounded-sm border border-mk-border bg-mk-bg p-3 text-mk-text focus:border-mk-red focus:outline-none"
                spellCheck={false}
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs text-mk-muted">Endpoint: <code className="text-mk-text">/api/sparql</code></p>
              <button
                type="button"
                onClick={executeSparql}
                disabled={sparqlLoading}
                className="btn-primary"
              >
                {sparqlLoading ? "Mengeksekusi…" : "▶ Jalankan SPARQL"}
              </button>
            </div>

            {/* SPARQL Query Results Table */}
            {sparqlResult && (
              <div className="border-t border-mk-border pt-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-mk-gold">Hasil Query SPARQL:</p>

                {sparqlResult.error ? (
                  <div className="rounded-sm border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-200">
                    <p className="font-semibold">Terjadi Kesalahan Eksekusi:</p>
                    <p className="mt-1 font-mono">{sparqlResult.error}</p>
                    {fusekiStatus === "disconnected" && (
                      <p className="mt-2 text-mk-muted">
                        Pastikan Apache Jena Fuseki sedang berjalan di port 3030 dengan dataset <code className="text-mk-gold">/mk_nexus</code>.
                      </p>
                    )}
                  </div>
                ) : sparqlResult.results?.bindings?.length === 0 ? (
                  <p className="text-sm text-mk-muted">Query berhasil dijalankan, tetapi tidak ada hasil (0 bindings).</p>
                ) : sparqlResult.results?.bindings ? (
                  <div className="overflow-x-auto scrollbar-thin rounded border border-mk-border">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-mk-card border-b border-mk-border">
                        <tr>
                          {sparqlResult.head?.vars.map((v) => (
                            <th key={v} className="px-4 py-2 font-mono font-semibold text-mk-gold uppercase">
                              ?{v}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-mk-border bg-mk-bg">
                        {sparqlResult.results.bindings.map((row, idx) => (
                          <tr key={idx} className="hover:bg-mk-card/50">
                            {sparqlResult.head?.vars.map((v) => (
                              <td key={v} className="px-4 py-2 font-mono text-mk-text/90 truncate max-w-xs">
                                {row[v]?.value ?? "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </Section>
      </Container>
    </>
  );
}
