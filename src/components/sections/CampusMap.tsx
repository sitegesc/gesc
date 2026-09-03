"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import data from "@/data/ft-campus.json";

type Kind = "ft" | "sala" | "cotil" | "gate" | "sport" | "outros";

type Building = {
  id: number;
  short: string | null;
  name: string;
  desc: string | null;
  rooms: string[] | null;
  unit: string | null;
  floors: number | null;
  kind: string;
  always: boolean;
  cx: number;
  cy: number;
  w: number;
  h: number;
  d: string;
};

type View = { x: number; y: number; w: number; h: number };

const buildings = data.buildings as Building[];
const FW = data.w;
const FH = data.h;
const MAX_Z = 6;
const SALA_ZOOM = 2.4;
const BASE_FS = 13;
const FULL: View = { x: 0, y: 0, w: FW, h: FH };

const FILL: Record<Kind, string> = {
  ft: "#002266",
  sala: "#2f6fb3",
  cotil: "#b3801f",
  gate: "#e3000f",
  sport: "#3f7d3f",
  outros: "#8a94a3",
};

const LEGEND: { k: Kind; label: string }[] = [
  { k: "ft", label: "FT" },
  { k: "sala", label: "Salas de aula" },
  { k: "cotil", label: "COTIL" },
  { k: "gate", label: "Portaria" },
  { k: "sport", label: "Quadras" },
  { k: "outros", label: "Apoio" },
];

const KIND_LIST = ["ft", "sala", "cotil", "gate", "sport", "outros"] as const;
const asKind = (k: string): Kind =>
  (KIND_LIST as readonly string[]).includes(k) ? (k as Kind) : "outros";

const ALWAYS_BIG = new Set([
  "FT",
  "Biblioteca",
  "COTIL",
  "COTIL Adm.",
  "RU",
  "Anfiteatro",
  "Cantina",
  "CECOM",
  "Campo",
]);

function clampView(v: View): View {
  const w = Math.min(FW, Math.max(FW / MAX_Z, v.w));
  const h = w * (FH / FW);
  const x = Math.min(FW - w, Math.max(0, v.x));
  const y = Math.min(FH - h, Math.max(0, v.y));
  return { x, y, w, h };
}

export function CampusMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(FULL);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{
    x: number;
    y: number;
    view: View;
    id: number;
  } | null>(null);
  const movedRef = useRef(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tip, setTip] = useState<{ id: number; x: number; y: number } | null>(
    null,
  );

  const zoom = FW / view.w;
  const fs = BASE_FS / zoom;
  const selected = buildings.find((b) => b.id === selectedId) ?? null;
  const tipBld = tip ? (buildings.find((b) => b.id === tip.id) ?? null) : null;

  const salaCluster = useMemo(() => {
    const s = buildings.filter((b) => b.kind === "sala");
    return {
      cx: s.reduce((a, b) => a + b.cx, 0) / s.length,
      cy: s.reduce((a, b) => a + b.cy, 0) / s.length,
    };
  }, []);

  const zoomAt = useCallback((factor: number, fx: number, fy: number) => {
    setView((v) => {
      const nw = Math.min(FW, Math.max(FW / MAX_Z, v.w / factor));
      const nh = nw * (FH / FW);
      const rx = (fx - v.x) / v.w;
      const ry = (fy - v.y) / v.h;
      return clampView({ x: fx - rx * nw, y: fy - ry * nh, w: nw, h: nh });
    });
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const r = el.getBoundingClientRect();
      const fx = view.x + ((event.clientX - r.left) / r.width) * view.w;
      const fy = view.y + ((event.clientY - r.top) / r.height) * view.h;
      zoomAt(event.deltaY < 0 ? 1.2 : 1 / 1.2, fx, fy);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [view, zoomAt]);

  const localXY = (clientX: number, clientY: number) => {
    const r = wrapRef.current?.getBoundingClientRect();
    return r ? { x: clientX - r.left, y: clientY - r.top } : { x: 0, y: 0 };
  };

  const openBuilding = (id: number) =>
    setSelectedId((c) => (c === id ? null : id));

  const centerZoom = (factor: number) =>
    zoomAt(factor, view.x + view.w / 2, view.y + view.h / 2);

  const showShort = (b: Building) => {
    if (!b.short) return false;
    if (b.kind === "sala") return zoom >= SALA_ZOOM;
    if (b.kind === "gate" || ALWAYS_BIG.has(b.short)) return true;
    return b.short.length * fs * 0.58 <= b.w * 1.2 || zoom >= 3.2;
  };

  return (
    <div className="relative" onMouseLeave={() => setTip(null)}>
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
        {LEGEND.map((l) => (
          <span key={l.k} className="flex items-center gap-1">
            <span
              className="inline-block h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: FILL[l.k] }}
            />
            {l.label}
          </span>
        ))}
        <span className="ml-auto text-zinc-400">
          role = zoom · arraste para mover
        </span>
      </div>

      <div
        ref={wrapRef}
        className="relative touch-none overflow-hidden rounded-lg border border-zinc-200 bg-[#eef2f4]"
        onPointerDown={(event) => {
          dragRef.current = {
            x: event.clientX,
            y: event.clientY,
            view,
            id: event.pointerId,
          };
          movedRef.current = false;
        }}
        onPointerMove={(event) => {
          const d = dragRef.current;
          if (d) {
            const dist =
              Math.abs(event.clientX - d.x) + Math.abs(event.clientY - d.y);
            if (dist <= 4) return; // ainda pode ser um clique
            if (!movedRef.current) {
              movedRef.current = true;
              setDragging(true);
              try {
                event.currentTarget.setPointerCapture(d.id);
              } catch {
                /* noop */
              }
            }
            const r = wrapRef.current!.getBoundingClientRect();
            const dx = ((event.clientX - d.x) / r.width) * d.view.w;
            const dy = ((event.clientY - d.y) / r.height) * d.view.h;
            setView(clampView({ ...d.view, x: d.view.x - dx, y: d.view.y - dy }));
          } else {
            const local = localXY(event.clientX, event.clientY);
            setTip((t) => (t ? { ...t, ...local } : t));
          }
        }}
        onPointerUp={(event) => {
          dragRef.current = null;
          setDragging(false);
          event.currentTarget.releasePointerCapture?.(event.pointerId);
        }}
        onPointerCancel={() => {
          dragRef.current = null;
          setDragging(false);
        }}
      >
        <svg
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          className={`block h-auto max-h-[62vh] w-full select-none ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          role="img"
          aria-label="Mapa do campus da FT-UNICAMP em Limeira"
        >
          <path
            d={data.boundary}
            fill="#ffffff"
            stroke="#c9d2da"
            strokeWidth={2}
          />
          <path d={data.green} fill="#dcebd6" />
          <path d={data.roads} fill="#e4e8ec" />

          {buildings.map((b) => {
            const isSel = b.id === selectedId;
            const isHot = tip?.id === b.id;
            return (
              <path
                key={b.id}
                d={b.d}
                role="button"
                tabIndex={0}
                aria-label={b.name}
                aria-pressed={isSel}
                onClick={() => {
                  if (!movedRef.current) openBuilding(b.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openBuilding(b.id);
                  }
                }}
                onMouseEnter={(event) =>
                  setTip({ id: b.id, ...localXY(event.clientX, event.clientY) })
                }
                onMouseLeave={() => setTip((t) => (t?.id === b.id ? null : t))}
                onFocus={() => setTip({ id: b.id, x: 14, y: 14 })}
                onBlur={() => setTip((t) => (t?.id === b.id ? null : t))}
                fill={FILL[asKind(b.kind)]}
                fillOpacity={isSel ? 1 : isHot ? 0.95 : 0.8}
                stroke={isSel ? "#111111" : "#ffffff"}
                strokeWidth={(isSel ? 2 : 0.8) / zoom}
                className="cursor-pointer outline-none"
              />
            );
          })}

          {zoom < SALA_ZOOM && (
            <text
              x={salaCluster.cx}
              y={salaCluster.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none"
              fontSize={16 / zoom}
              fontWeight={700}
              fill="#ffffff"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth={4 / zoom}
              style={{
                paintOrder: "stroke",
                fontFamily: "'Segoe UI', Tahoma, sans-serif",
              }}
            >
              Salas de Aula
            </text>
          )}

          {buildings
            .filter(
              (b) =>
                b.short &&
                (showShort(b) || b.id === selectedId || b.id === tip?.id),
            )
            .map((b) => (
              <text
                key={`label-${b.id}`}
                x={b.cx}
                y={b.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none"
                fontSize={(b.kind === "gate" ? BASE_FS + 1 : BASE_FS) / zoom}
                fontWeight={700}
                fill="#ffffff"
                stroke="rgba(0,0,0,0.45)"
                strokeWidth={3 / zoom}
                style={{
                  paintOrder: "stroke",
                  fontFamily: "'Segoe UI', Tahoma, sans-serif",
                }}
              >
                {b.short}
              </text>
            ))}
        </svg>

        <div className="absolute right-2 top-2 flex flex-col overflow-hidden rounded-md border border-zinc-300 bg-white leading-none shadow">
          <button
            type="button"
            onClick={() => centerZoom(1.5)}
            aria-label="Aproximar"
            className="h-8 w-8 text-lg hover:bg-zinc-100"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => centerZoom(1 / 1.5)}
            aria-label="Afastar"
            className="h-8 w-8 border-t border-zinc-200 text-lg hover:bg-zinc-100"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setView(FULL)}
            aria-label="Ver o campus inteiro"
            className="flex h-8 w-8 items-center justify-center border-t border-zinc-200 text-sm hover:bg-zinc-100"
          >
            ⟲
          </button>
        </div>

        {selected && (
          <div className="absolute left-3 top-3 max-w-[70%] rounded-md bg-white/95 px-3 py-2 text-xs shadow-md">
            <p className="font-bold text-brand-blue">{selected.name}</p>
            <p className="text-zinc-600">
              {[
                selected.unit,
                selected.floors ? `${selected.floors} pav.` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {selected.desc && (
              <p className="mt-0.5 text-zinc-500">{selected.desc}</p>
            )}
            {selected.rooms && selected.rooms.length > 0 && (
              <p className="mt-0.5 text-zinc-500">
                Salas: {selected.rooms.join(", ")}
              </p>
            )}
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="mt-1 text-[11px] font-semibold text-brand-red hover:underline"
            >
              fechar
            </button>
          </div>
        )}

        {tipBld && tip && tipBld.id !== selectedId && (
          <div
            className="pointer-events-none absolute z-10 max-w-[240px] rounded bg-zinc-900/90 px-2 py-1 text-[11px] leading-tight text-white shadow-lg"
            style={{ left: tip.x + 12, top: tip.y + 12 }}
          >
            <span className="font-semibold">{tipBld.name}</span>
            {tipBld.unit && (
              <span className="block text-white/70">{tipBld.unit}</span>
            )}
          </div>
        )}
      </div>

      <p className="mt-2 text-[10px] leading-snug text-zinc-400">
        Base: Prefeitura Universitária da UNICAMP — Campus Limeira (2019). Uso
        educacional.
      </p>
    </div>
  );
}
