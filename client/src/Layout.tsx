import Grid from "@mui/material/Unstable_Grid2"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Grid container padding={2} sx={{ height: "100vh", width: "100vw" }}>
			<Grid xs={12}>{children}</Grid>
		</Grid>
	)
}
