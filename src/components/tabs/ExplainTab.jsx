import { EXPLAIN_SECTIONS } from "../../constants/content";

export function ExplainTab() {
  return (
    <div className="mt-4 grid gap-4">
      {EXPLAIN_SECTIONS.map(({ title, color, content }) => (
        <div
          key={title}
          className="rounded-lg border bg-white p-5"
          style={{ borderColor: `${color}44` }}
        >
          <h3 className="mb-4 text-sm font-semibold" style={{ color }}>
            {title}
          </h3>
          {content.map(({ label, code }) => (
            <div key={label} className="mb-3">
              <div className="mb-1 text-xs text-slate-500">{label}</div>
              <pre className="overflow-x-auto rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-700">
                {code}
              </pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
