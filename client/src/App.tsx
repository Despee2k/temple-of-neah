import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Explorer from "./pages/explorer/Explorer";
import Modules from "./pages/modules/Modules";
import BlocksModule from "./pages/modules/blocks/BlocksModule";
import TransactionsModule from "./pages/modules/transactions/TransactionsModule";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/modules">
          <Route index element={<Modules />} />
          <Route path="blocks" element={<BlocksModule />} />
          <Route path="transactions" element={<TransactionsModule />} />
        </Route>
      </Routes>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">Built with real Cardano data via <a href="https://docs.saib.dev/docs/argus/getting-started/overview">Argus</a> indexer.</p>
          <p className="text-center text-sm text-muted-foreground">&copy; <a href="https://github.com/Despee2k/temple-of-neah">Temple of Neah</a></p>
        </div>
      </footer>
    </HashRouter>
  )
}

export default App;
