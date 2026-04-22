import { CODE_SECTIONS } from "../../constants/content";

export function CodeTab() {
  return (
    <div className="mt-4 grid gap-4">
      {CODE_SECTIONS.map(({ title, code }) => (
        <div
          key={title}
          className="rounded-lg border border-slate-200 bg-white p-5"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-800">{title}</h3>
          <pre className="overflow-x-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-700">
            <code>{code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}
