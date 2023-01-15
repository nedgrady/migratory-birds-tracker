//import Grid from '@mui/material/Unstable_Grid2'
import { Grid } from "@mui/material"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import sightings from "./birdData"
import SightingList from "./SightingsList"

export default function BirdTracker() {
	const { isLoaded } = useLoadScript({
		// TODO - add to secrets
		googleMapsApiKey: "AIzaSyAryrchXqhY1TtykuGeKPA0BjjOZMcyyAM",
		libraries: ["visualization"],
	})

	if (isLoaded) {
		return (
			<Grid container spacing={4}>
				<Grid xs={12} md={6} item>
					<GoogleMap
						center={{ lat: 53.55153, lng: -2.009018 }}
						zoom={6}
						onLoad={(map) => {
							var heatmap = new google.maps.visualization.HeatmapLayer({
								data: sightings.map(
									(sighting) =>
										new google.maps.LatLng(sighting.location.latitude, sighting.location.longitude)
								),
								radius: 8,
								opacity: 0.9,
							})

							heatmap.setMap(map)
						}}
						mapContainerStyle={{ height: "95vh" }}
					/>
				</Grid>
				<Grid xs={12} md={6} item>
					<SightingList sightings={sightings} />
				</Grid>
			</Grid>
		)
	}

	return <>Loading or something went wrong</>
}
