import { DbRow } from "./DbRow";

export function WriteLog({ rows, accentColor, summary }) {
  return (
    <div className="mt-4">
      <div className="mb-2 text-xs font-medium tracking-wide text-slate-500">
        DATABASE WRITES
      </div>
      {rows.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-300 py-5 text-center text-sm text-slate-500">
          Drag an item to see writes...
        </div>
      ) : (
        <div className="max-h-52 overflow-y-auto rounded-md border border-slate-200 bg-white p-2">
          {rows.map((row, i) => (
            <DbRow key={i} {...row} />
          ))}
        </div>
      )}
      {rows.length > 0 && (
        <div className="mt-2 text-right text-xs" style={{ color: accentColor }}>
          {summary}
        </div>
      )}
    </div>
  );
}
