import React, { useMemo } from "react";

const COLORS = ["#1D4ED8", "#EF4444", "#0EA5E9", "#22C55E", "#A855F7", "#F59E0B", "#14B8A6", "#64748B"];

function getLabel(item, idx) {
  return (
    item?.display_name ||
    item?.name ||
    item?.label ||
    item?.candidate_name ||
    `Candidate ${idx + 1}`
  );
}

function getValue(item) {
  const v = item?.count ?? item?.value ?? item?.votes ?? item?.support_count ?? 0;
  return Number.isFinite(Number(v)) ? Number(v) : 0;
}

export default function DonutOpinion({ items = [], total = 0 }) {
  const normalized = useMemo(() => {
    const arr = Array.isArray(items) ? items : [];
    return arr.map((it, idx) => ({
      label: getLabel(it, idx),
      value: getValue(it),
      color: COLORS[idx % COLORS.length],
    }));
  }, [items]);

  const sum = useMemo(() => normalized.reduce((acc, x) => acc + (x.value || 0), 0), [normalized]);


  const shownTotal = Number.isFinite(Number(total)) ? Number(total) : sum;

 
  const donutStyle = useMemo(() => {
    if (!sum) return { background: "conic-gradient(#E2E8F0 0deg, #E2E8F0 360deg)" };

    let current = 0;
    const parts = normalized
      .filter((x) => x.value > 0)
      .map((x) => {
        const deg = (x.value / sum) * 360;
        const start = current;
        const end = current + deg;
        current = end;
        return `${x.color} ${start}deg ${end}deg`;
      });

 
    if (current < 360) parts.push(`#E2E8F0 ${current}deg 360deg`);

    return { background: `conic-gradient(${parts.join(", ")})` };
  }, [normalized, sum]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">People&apos;s Opinion</div>
        <div className="text-sm text-slate-600">Total: {shownTotal}</div>
      </div>

      {!sum ? (
        <div className="mt-3 text-sm text-slate-600">No votes yet</div>
      ) : (
        <div className="mt-6 flex justify-center">
          <div className="relative h-56 w-56">
            <div className="h-full w-full rounded-full" style={donutStyle} />
            <div className="absolute inset-8 rounded-full bg-white/90" />
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {normalized.map((x, idx) => (
          <div
            key={`${x.label}-${idx}`}
            className="flex items-center justify-between rounded-xl bg-slate-50/70 px-4 py-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: x.color }} />
                <div className="truncate text-sm font-semibold text-slate-800">{x.label}</div>
              </div>
            </div>
            <div className="ml-3 shrink-0 text-sm font-bold text-slate-900">{x.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
