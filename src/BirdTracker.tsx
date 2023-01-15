import Grid from "@mui/material/Unstable_Grid2"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { useState } from "react"
import { sightingsAtom } from "./birdData"
import SightingList from "./SightingsList"
import useRecoilArray from "./useRecoilArray"
type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]

const libraries: Libraries = ["visualization", "places"]
export default function BirdTracker() {
	const { isLoaded } = useLoadScript({
		// TODO - add to secrets
		googleMapsApiKey: "AIzaSyAryrchXqhY1TtykuGeKPA0BjjOZMcyyAM",
		libraries: libraries,
	})

	const { array: sightings } = useRecoilArray(sightingsAtom)
	const [map, setMap] = useState<google.maps.Map | null>()

	if (isLoaded) {
		return (
			<Grid container spacing={4}>
				<Grid xs={12} md={6}>
					<GoogleMap
						center={map?.getCenter() ?? { lat: 53.55153, lng: -2.009018 }}
						zoom={6}
						mapContainerStyle={{ height: "95vh" }}
						onLoad={setMap}
					>
						{sightings.map(sighting => (
							<MarkerF
								key={sighting.id}
								position={
									new google.maps.LatLng(sighting.location.latitude, sighting.location.longitude)
								}
							/>
						))}
					</GoogleMap>
				</Grid>
				<Grid xs={12} md={6}>
					<SightingList />
				</Grid>
			</Grid>
		)
	}

	return <>Loading or something went wrong</>
}
