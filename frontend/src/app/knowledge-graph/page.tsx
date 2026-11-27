"use client";

import Link from "next/link";
import { useState } from "react";
import { Container, PageHeader, Section } from "@/components/ui/Layout";

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
  const [viewMode, setViewMode] = useState<"graph" | "table">("graph");

  const activeNodeData = NODES.find((n) => n.id === selectedNode);
  const connectedEdges = EDGES.filter((e) => e.from === selectedNode || e.to === selectedNode);

  return (
    <>
      <PageHeader
        eyebrow="Knowledge Graph &amp; SPARQL"
        title="Knowledge Graph &amp; SPARQL Explorer"
        description="Visualisasi hubungan antar-entitas dan konsol eksekusi query SPARQL langsung terhadap Knowledge Base."
        crumbs={[{ label: "Knowledge Graph" }]}
      />

      <Container className="space-y-12 py-8 sm:py-10">
        {/* SECTION 1: INTERACTIVE GRAPH EXPLORER (with mobile table alternative) */}
        <Section
          title="Interactive Knowledge Graph Preview"
          action={
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-mk-muted">Tampilan:</span>
              <div className="flex rounded-sm border border-mk-border bg-mk-bg p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("graph")}
                  className={`rounded-sm px-2.5 py-1 font-medium transition ${
                    viewMode === "graph" ? "bg-mk-red text-mk-text shadow" : "text-mk-muted hover:text-mk-text"
                  }`}
                >
                  Visual Canvas
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`rounded-sm px-2.5 py-1 font-medium transition ${
                    viewMode === "table" ? "bg-mk-red text-mk-text shadow" : "text-mk-muted hover:text-mk-text"
                  }`}
                >
                  Daftar Relasi (Mobile)
                </button>
              </div>
            </div>
          }
        >
          {viewMode === "graph" ? (
            <div className="grid gap-6 lg:grid-cols-12">
              {/* SVG Graph Canvas with responsive horizontal pan hint on narrow mobile */}
              <div className="panel overflow-hidden rounded-sm p-2 sm:p-4 lg:col-span-8 flex flex-col justify-center">
                <div className="w-full overflow-x-auto scrollbar-thin">
                  <div className="min-w-[480px] sm:min-w-0">
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
                </div>
                <p className="mt-2 text-center text-[11px] text-mk-muted sm:hidden">
                  💡 Tips: Geser atau ketuk node untuk melihat relasi terhubung di panel bawah.
                </p>
              </div>

              {/* Selected Node Details Panel */}
              <div className="panel rounded-sm p-4 sm:p-5 space-y-4 lg:col-span-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-mk-gold">Node Terpilih:</span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-mk-text break-words">
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
                  <ul className="space-y-1.5 text-xs max-h-48 overflow-y-auto scrollbar-thin">
                    {connectedEdges.map((e, idx) => {
                      const otherId = e.from === selectedNode ? e.to : e.from;
                      const otherNode = NODES.find((n) => n.id === otherId);
                      const isOutgoing = e.from === selectedNode;

                      return (
                        <li
                          key={idx}
                          className="flex items-center justify-between rounded border border-mk-border bg-mk-bg px-2.5 py-1.5 gap-2"
                        >
                          <span className="text-mk-muted font-mono truncate">{e.label}</span>
                          <span className="flex items-center gap-1 font-medium text-mk-text shrink-0">
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
                      className="btn-primary !w-full justify-center !text-xs !py-2"
                    >
                      Buka Detail Karakter →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Table / List Alternative View (Mobile Alternative) */
            <div className="panel rounded-sm p-4 sm:p-5 space-y-4">
              <p className="text-xs text-mk-muted">
                Daftar entitas dan relasi Knowledge Graph dalam format tabel interaktif:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {NODES.map((node) => {
                  const nodeEdges = EDGES.filter((e) => e.from === node.id || e.to === node.id);
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className={`panel rounded-sm p-4 cursor-pointer transition border ${
                        selectedNode === node.id ? "border-mk-red glow-red bg-mk-card" : "hover:border-mk-gold"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-heading font-bold text-base text-mk-text">{node.label}</h4>
                        <span className="text-[10px] uppercase tracking-wider rounded border border-mk-border px-1.5 py-0.5 text-mk-gold">
                          {node.type}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-mk-muted">
                        {nodeEdges.length} relasi terhubung
                      </p>
                      <ul className="mt-2 space-y-1 text-[11px] border-t border-mk-border/50 pt-2 text-mk-muted">
                        {nodeEdges.slice(0, 3).map((e, i) => {
                          const otherId = e.from === node.id ? e.to : e.from;
                          const other = NODES.find((n) => n.id === otherId);
                          return (
                            <li key={i} className="truncate">
                              <span className="text-mk-gold font-mono">{e.label}</span> {other?.label}
                            </li>
                          );
                        })}
                      </ul>
                      {node.type === "character" && (
                        <Link
                          href={`/characters/${node.id}`}
                          className="mt-3 block text-[11px] text-mk-red hover:text-mk-gold uppercase tracking-wider font-semibold"
                        >
                          Lihat Detail →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Section>
      </Container>
    </>
  );
}
