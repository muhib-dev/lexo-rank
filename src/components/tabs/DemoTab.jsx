import { COST_CARDS } from "../../constants/content";
import { DraggableList } from "../DraggableList";
import { WriteLog } from "../WriteLog";

function CostBanner({ numCost, lexCost }) {
  const costs = { numCost, lexCost };

  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      {COST_CARDS.map(({ label, color, costKey }) => (
        <div
          key={label}
          className="rounded-lg border bg-white p-4 text-center"
          style={{ borderColor: `${color}44` }}
        >
          <div className="text-xs text-slate-500">{label}</div>
          <div className="mt-1 text-3xl font-semibold" style={{ color }}>
            {costs[costKey]}
          </div>
          <div className="text-xs text-slate-500">DB writes per drag</div>
        </div>
      ))}
    </div>
  );
}

function RankingColumn({
  title,
  accentColor,
  badgeText,
  badgeBackground,
  items,
  onReorder,
  mode,
  rows,
  summary,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold" style={{ color: accentColor }}>
          {title}
        </h3>
        <span
          className="rounded-full px-2 py-1 text-[11px]"
          style={{ color: accentColor, background: badgeBackground }}
        >
          {badgeText}
        </span>
      </div>
      <DraggableList items={items} onReorder={onReorder} mode={mode} />
      <WriteLog rows={rows} accentColor={accentColor} summary={summary} />
    </div>
  );
}

export function DemoTab({
  numItems,
  lexItems,
  numLog,
  lexLog,
  numCost,
  lexCost,
  onNumericReorder,
  onLexoReorder,
}) {
  return (
    <>
      <CostBanner numCost={numCost} lexCost={lexCost} />
      <div className="grid gap-4 lg:grid-cols-2">
        <RankingColumn
          title="Numeric Ranking"
          accentColor="#e11d48"
          badgeText="rank = 1, 2, 3..."
          badgeBackground="#ffe4e6"
          items={numItems}
          onReorder={onNumericReorder}
          mode="numeric"
          rows={numLog}
          summary={`${numLog.length} rows updated - cascading updates`}
        />
        <RankingColumn
          title="LexoRank"
          accentColor="#059669"
          badgeText='rank = "G", "N", "an"...'
          badgeBackground="#d1fae5"
          items={lexItems}
          onReorder={onLexoReorder}
          mode="lexo"
          rows={lexLog}
          summary="1 row updated per move"
        />
      </div>
    </>
  );
}
