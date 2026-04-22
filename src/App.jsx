import { CodeTab } from "./components/tabs/CodeTab";
import { DemoTab } from "./components/tabs/DemoTab";
import { ExplainTab } from "./components/tabs/ExplainTab";
import { useRankingDemo } from "./hooks/useRankingDemo";

export default function App() {
  const {
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
  } = useRankingDemo();

  const tabClass = (tab) =>
    `rounded-md px-4 py-2 text-sm font-medium transition ${
      activeTab === tab
        ? "bg-slate-900 text-white"
        : "bg-white text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Numeric Ranking vs LexoRank
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Drag items to reorder and compare database writes for both approaches.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button className={tabClass("demo")} onClick={() => setActiveTab("demo")}>
            Demo
          </button>
          <button
            className={tabClass("explain")}
            onClick={() => setActiveTab("explain")}
          >
            How It Works
          </button>
          <button className={tabClass("code")} onClick={() => setActiveTab("code")}>
            Code
          </button>
        </div>

        {activeTab === "demo" && (
          <DemoTab
            numItems={numItems}
            lexItems={lexItems}
            numLog={numLog}
            lexLog={lexLog}
            numCost={numCost}
            lexCost={lexCost}
            onNumericReorder={handleNumericReorder}
            onLexoReorder={handleLexoReorder}
          />
        )}

        {activeTab === "explain" && <ExplainTab />}

        {activeTab === "code" && <CodeTab />}

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
          Numeric ranking is easy to start with, but large lists cause cascading
          updates. LexoRank keeps each reorder to a single write by assigning a
          new value between neighboring ranks.
        </div>
      </div>
    </div>
  );
}
