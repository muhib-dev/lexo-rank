import { useState } from "react";
import { INITIAL_ITEMS } from "../constants/content";
import { buildLexo, buildNumeric, lexMid } from "../utils/ranking";

export function useRankingDemo() {
  const [numItems, setNumItems] = useState(buildNumeric(INITIAL_ITEMS));
  const [lexItems, setLexItems] = useState(buildLexo(INITIAL_ITEMS));
  const [numLog, setNumLog] = useState([]);
  const [lexLog, setLexLog] = useState([]);
  const [numCost, setNumCost] = useState(0);
  const [lexCost, setLexCost] = useState(0);
  const [activeTab, setActiveTab] = useState("demo");

  function handleNumericReorder(newItems, _fromIdx, toIdx) {
    const reranked = newItems.map((item, i) => ({ ...item, rank: i + 1 }));
    setNumItems(reranked);

    const ops = reranked.map((item, i) => ({
      op: "UPDATE",
      id: item.id,
      text: item.text,
      rank: item.rank,
      isNew: i === toIdx,
      isCascade: i !== toIdx,
    }));

    setNumLog(ops);
    setNumCost(ops.length);
  }

  function handleLexoReorder(newItems, _fromIdx, toIdx) {
    const updated = [...newItems];
    const prevRank = toIdx > 0 ? updated[toIdx - 1].rank : null;
    const nextRank = toIdx < updated.length - 1 ? updated[toIdx + 1].rank : null;
    const newRank = lexMid(prevRank || "0", nextRank || "z");

    updated[toIdx] = { ...updated[toIdx], rank: newRank };
    setLexItems(updated);

    setLexLog([
      {
        op: "UPDATE",
        id: updated[toIdx].id,
        text: updated[toIdx].text,
        rank: newRank,
        isNew: true,
        isCascade: false,
      },
    ]);
    setLexCost(1);
  }

  return {
    numItems,
    lexItems,
    numLog,
    lexLog,
    numCost,
    lexCost,
    activeTab,
    setActiveTab,
    handleNumericReorder,
    handleLexoReorder,
  };
}
