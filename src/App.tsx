
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import birdNames from "./birdNames"
import { add } from "date-fns"
import BirdLegendItem from "./BirdLegendItem"
import sightings from "./birdData"
import SightingList from "./SightingsList"
type LatLngCollection = google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | (google.maps.LatLng | google.maps.visualization.WeightedLocation)[]



export interface Bird {
	name: string
	sightings: Event[]
}

export type BirdDisplay = Bird & {
	heatmapColors: string[]
}

function range(start: number, count: number): number[] {
	return [...Array(count)].map((_, index) => start + index)
}

function randomHeatMapRange() {
	const ran = () => Math.floor(Math.random() * 256)
	return [
		`rgba(0, 255, 255, 0)`,
		`rgba(${ran()}, ${ran()}, ${ran()}, 1)`,
		`rgba(${ran()}, ${ran()}, ${ran()}, 1)`
	]
}

function App() {
	const { isLoaded } = useLoadScript({
		// TODO - add to secrets
		googleMapsApiKey: "AIzaSyAryrchXqhY1TtykuGeKPA0BjjOZMcyyAM",
		libraries: ["visualization"]
	})

	if (isLoaded) {
		return <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
			<GoogleMap
				center={{ lat: 53.55153, lng: -2.009018 }}
				zoom={6}
				onLoad={(map) => {
					var heatmap = new google.maps.visualization.HeatmapLayer({
						data: sightings.map(sighting => new google.maps.LatLng(sighting.location.latitude, sighting.location.longitude)),
						radius: 8,
						opacity: 0.9
					});

					heatmap.setMap(map);
				}}
				mapContainerStyle={{ height: "98vh", width: "50%" }}
			/>
			<div>
				<SightingList sightings={sightings} />
			</div>
		</div>
	}

	return <>Loading or something went wrong</>
}

export default App
