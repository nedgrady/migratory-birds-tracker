
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { useMemo } from "react";
import BirdTracker from "./BirdTracker"
import Layout from "./Layout";

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	);

	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<Layout>
			<BirdTracker />
		</Layout>
	</ThemeProvider>
}

export default App
