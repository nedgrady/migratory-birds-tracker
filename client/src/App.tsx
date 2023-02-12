import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { createContext, useContext, useMemo } from "react"
import BirdTracker from "./BirdTracker"
import Layout from "./Layout"
import { Routes, Route, Link, HashRouter, BrowserRouter } from "react-router-dom"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { RecoilRoot } from "recoil"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { QueryClientProvider, QueryClient } from "react-query"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCdRI3H5GWGHRPHPZJO3IkGQaTOvmFcjxw",
	authDomain: "migratory-birds-tracker.firebaseapp.com",
	projectId: "migratory-birds-tracker",
	storageBucket: "migratory-birds-tracker.appspot.com",
	messagingSenderId: "676194961578",
	appId: "1:676194961578:web:7c13a1696bc77e4edde8d3",
	measurementId: "G-EP1CJY6K5Q",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

app.automaticDataCollectionEnabled = false

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
		},
	},
})

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
