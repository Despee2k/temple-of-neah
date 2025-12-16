import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Explorer from "./pages/explorer/Explorer";
import Modules from "./pages/modules/Modules";
import BlocksModule from "./pages/modules/blocks/BlocksModule";
import TransactionsModule from "./pages/modules/transactions/TransactionsModule";
import AiChatWidget from "./components/ai-chat-widget";

function App() {
  return (
    <>
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
      </HashRouter>

      {/* Persistent floating AI chat widget */}
      <AiChatWidget />
    </>
  )
}

export default App;
