import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.documentElement;
if (!rootElement.classList.contains("dark")) {
	rootElement.classList.add("dark");
}
rootElement.style.colorScheme = "dark";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
