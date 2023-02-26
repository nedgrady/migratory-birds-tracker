import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { useMemo } from "react"
import BirdTracker from "./BirdTracker"
import Layout from "./Layout"
import { Routes, Route, Link, HashRouter } from "react-router-dom"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { RecoilRoot } from "recoil"
import { QueryClientProvider, QueryClient } from "react-query"
import server from "mock-server"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
		},
	},
})

if (import.meta.env.DEV) server.start()

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
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<RecoilRoot>
						<CssBaseline />
						<Layout>
							<HashRouter>
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
							</HashRouter>
						</Layout>
					</RecoilRoot>
				</LocalizationProvider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
