import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { useMemo } from "react"
import BirdTracker from "./BirdTracker"
import Layout from "./Layout"
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom"

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout>
				<BrowserRouter basename="migratory-birds-tracker">
					<Routes>
						<Route path="" element={<BirdTracker />} />
						<Route path="/version" element={<>{__COMMIT_HASH__}</>} />
						<Route
							path="*"
							element={
								<>
									<p>That's a 404 not found 🤔</p>
									<Link to="/">Go back home</Link>
								</>
							}
						/>
					</Routes>
				</BrowserRouter>
			</Layout>
		</ThemeProvider>
	)
}

export default App
