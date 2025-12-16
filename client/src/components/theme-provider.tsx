import { createContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";

export type ThemeContextValue = {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "ton-theme";

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "dark";

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
		root.style.colorScheme = theme;
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			toggleTheme: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
		}),
		[theme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
