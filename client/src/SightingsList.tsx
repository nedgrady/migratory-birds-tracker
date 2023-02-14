import { format } from "date-fns"
import { Stack, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import useRecoilArray from "./useRecoilArray"
import { AddSighting } from "./AddSighting"
import useSightings from "./useSightings"
import { Sighting } from "migratory-birds-tracker-types/types"

const columns: GridColDef<Sighting>[] = [
	{ field: "source", headerName: "Source" },
	{
		field: "timestamp",
		headerName: "Timestamp",
		valueFormatter: col => format(col.value, "dd/MM/yyyy"),
	},
	{
		field: "location",
		headerName: "Location",
		valueFormatter: col => col.value.description,
		flex: 1,
	},
]

export default function SightingList() {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.up("xs"))
	const sightings = useSightings()

	const dataGridStyles: React.CSSProperties = {
		height: isMobile ? "600px" : "100%",
		flex: isMobile ? "auto" : 1,
	}

	return (
		<Grid spacing={2} container direction={{ xs: "column", md: "row" }}>
			<Grid md={12}>
				<AddSighting />
			</Grid>
			<Grid md={12} flex={1}>
				<DataGrid rows={sightings} columns={columns} autoHeight={true} />
			</Grid>
		</Grid>
	)
}
