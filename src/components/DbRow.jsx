export function DbRow({ op, id, text, rank, isNew, isCascade }) {
  return (
    <div
      className={`mb-1 grid grid-cols-[70px_42px_1fr_90px] items-center gap-x-3 rounded px-2 py-1 text-xs ${
        isNew
          ? "border-l-2 border-indigo-500 bg-indigo-50"
          : isCascade
            ? "border-l-2 border-rose-500 bg-rose-50"
            : "border-l-2 border-transparent bg-slate-50"
      }`}
    >
      <span className="font-semibold text-slate-700">
        {op}
      </span>
      <span className="text-slate-500">{id}</span>
      <span className="truncate text-slate-700">{text}</span>
      <span className="text-right text-slate-500">
        rank={rank}
      </span>
    </div>
  );
}
