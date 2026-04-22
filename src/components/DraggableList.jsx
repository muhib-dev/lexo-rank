import { useRef, useState } from "react";

export function DraggableList({ items, onReorder, mode }) {
  const dragIdx = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  function handleDragStart(i) {
    dragIdx.current = i;
  }

  function handleDrop(i) {
    if (dragIdx.current === null || dragIdx.current === i) return;

    const newItems = [...items];
    const [moved] = newItems.splice(dragIdx.current, 1);
    newItems.splice(i, 0, moved);
    onReorder(newItems, dragIdx.current, i);
    dragIdx.current = null;
    setDragOver(null);
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(i);
          }}
          onDragLeave={() => setDragOver(null)}
          onDrop={() => handleDrop(i)}
          className={`flex cursor-grab items-center gap-3 rounded-md border px-3 py-2 transition ${
            dragOver === i
              ? "border-slate-400 bg-slate-100"
              : "border-slate-200 bg-white"
          }`}
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="flex-1 text-sm text-slate-800">{item.text}</span>
          <span
            className={`rounded px-2 py-0.5 text-xs ${
              mode === "numeric"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {item.rank}
          </span>
        </div>
      ))}
    </div>
  );
}
