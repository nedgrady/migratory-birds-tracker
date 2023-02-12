import { Autocomplete, Button, FormControl, FormGroup, TextField } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { usePlacesWidget } from "react-google-autocomplete"
import { useState } from "react"
import { useAddSighting } from "./useSightings"

export function AddSighting() {
	const [location, setLocation] = useState<google.maps.places.PlaceResult>()

	const { ref } = usePlacesWidget({
		apiKey: "AIzaSyAebPD-cVB7CLMGNCeQMlKYykd3U1xiCnk",
		onPlaceSelected: placeResult => {
			setLocation(placeResult)
			console.log(placeResult)
		},
	})

	const { mutate, isLoading } = useAddSighting()

	const [date, setDate] = useState<Date | null>(new Date())
	const [source, setSource] = useState<string>("No Source")

	const handleChange = (newValue: Date | null) => {
		setDate(newValue)
	}

	function handleSightingAdded() {
		const newSighting: Sighting = {
			bird: "Waxwing",
			id: new Date().toISOString(),
			location: {
				description: location?.formatted_address ?? "Nowhere",
				latitude: location?.geometry?.location?.lat() ?? 0,
				longitude: location?.geometry?.location?.lng() ?? 0,
			},
			source: source,
			timestamp: date ?? new Date(),
		}

		mutate(newSighting)
	}

	return (
		<form>
			<FormGroup row={true}>
				<Grid container margin={0} gap={1}>
					<FormControl component={Grid}>
						<Autocomplete
							options={["WLUK", "WSUK"]}
							renderInput={params => <TextField {...params} label="Source" />}
							onChange={(_, value) => setSource(value ?? "Nowhere")}
						/>
					</FormControl>

					<FormControl component={Grid}>
						<DesktopDatePicker
							label="Date"
							inputFormat="MM/dd/yyyy"
							renderInput={params => <TextField {...params} />}
							value={date}
							onChange={handleChange}
						/>
					</FormControl>

					<FormControl component={Grid}>
						<TextField inputRef={ref} label="Location" />
					</FormControl>

					<FormControl component={Grid}>
						<Button
							variant="outlined"
							size="large"
							style={{ height: "100%" }}
							onClick={handleSightingAdded}
						>
							Add
						</Button>
					</FormControl>
				</Grid>
			</FormGroup>
		</form>
	)
}
