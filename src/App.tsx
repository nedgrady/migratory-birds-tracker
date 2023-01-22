import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { useMemo } from "react"
import BirdTracker from "./BirdTracker"
import Layout from "./Layout"
import { Routes, Route, Link, HashRouter, BrowserRouter } from "react-router-dom"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { RecoilRoot } from "recoil"

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

	document.title = `${document.title} (${__COMMIT_HASH__})`

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<RecoilRoot>
					<CssBaseline />
					<Layout>
						<BrowserRouter>
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
				</RecoilRoot>
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default App
