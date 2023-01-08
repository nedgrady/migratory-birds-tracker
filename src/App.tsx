
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import birdNames from "./birdNames"
import { add } from "date-fns"
import BirdLegendItem from "./BirdLegendItem"

type LatLngCollection = google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | (google.maps.LatLng | google.maps.visualization.WeightedLocation)[]

export interface Event {
	location: {
		coorinates: google.maps.LatLng
		description: string
	}
	timestamp: Date
}

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

function createFakeBirdData() {

	const birds: Bird[] = range(1, 4).map<Bird>((_, birdIndex) => {
		var birdName = birdNames[Math.floor(Math.random() * birdNames.length)]

		const sightings = range(0, Math.ceil(Math.random() * 20) + 5).map<Event>((_, sightingIndex) => ({
			location: {
				coorinates: new google.maps.LatLng({ lat: 53.55150  - (sightingIndex / 100)  + Math.random() / 50, lng: -2.009010 + 5 * (birdIndex / 100) + Math.random() / 50 }),
				description: "somewhere"
			},
			timestamp: add(new Date(), { days: -sightingIndex })
		}))

		return {
			name: birdName,
			sightings
		}
	})

	return birds
}

function App() {
	const { isLoaded } = useLoadScript({
		// TODO - add to secrets
		googleMapsApiKey: "AIzaSyAryrchXqhY1TtykuGeKPA0BjjOZMcyyAM",
		libraries: ["visualization"]
	})

	if (isLoaded) {
		const birdData = createFakeBirdData()
		const birdDisplay : BirdDisplay[] = birdData.map((bird, _) => ({
			name: bird.name,
			sightings: bird.sightings,
			heatmapColors: randomHeatMapRange()
		}))

		return <div style={{display: "flex", gap:"10px"}}><GoogleMap
			center={{ lat: 53.55153, lng: -2.009018 }}
			zoom={12}
			onLoad={(map) => {
				for (const birdDatum of birdDisplay) {
					const heatMapData: LatLngCollection = birdDatum.sightings.map(sighting => ({
						location: sighting.location.coorinates,
						weight: Math.random()
					}));

					var heatmap = new google.maps.visualization.HeatmapLayer({
						data: heatMapData,
						gradient: randomHeatMapRange(),
						radius: 25,
						opacity: 0.9
					});

					heatmap.setMap(map);
				}

			}}
			mapContainerStyle={{ height: "98vh", width: "50%" }}
		/>
		<div>
			{birdDisplay.map(birdDisplay => <BirdLegendItem bird={birdDisplay} key={birdDisplay.name} />)}
		</div>
		</div>
	}

	return <>Loading or something went wrong</>
}

export default App
