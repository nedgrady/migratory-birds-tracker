import { CosmosClient } from "@azure/cosmos"
import Grid from "@mui/material/Unstable_Grid2"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import SightingList from "./SightingsList"
import useRecoilArray from "./useRecoilArray"
import useSightings from "./useSightings"
import _ from "lodash"
import { Sighting } from "migratory-birds-tracker-types/types"
import { formatRelative } from "date-fns"

type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]

const libraries: Libraries = ["visualization", "places"]

export default function BirdTracker() {
	const { isLoaded } = useLoadScript({
		// TODO - add to secrets
		googleMapsApiKey: "AIzaSyAryrchXqhY1TtykuGeKPA0BjjOZMcyyAM",
		libraries: libraries,
	})

	const [map, setMap] = useState<google.maps.Map | null>()
	const sightings = useSightings()
	const sorted = _.orderBy<Sighting>(sightings, ["timestamp"], ["asc"])

	const firstSighting = sorted[0]
	const lastSighting = sorted.at(-1)

	// Thanks Chat GPT
	function scaleDate(dateToScale: Date, minDate: Date, maxDate: Date, minScale: number, maxScale: number) {
		const dateRange = maxDate.getTime() - minDate.getTime()
		const scaledRange = maxScale - minScale
		const dateDiff = dateToScale.getTime() - minDate.getTime()
		const scaleDiff = (dateDiff / dateRange) * scaledRange
		return minScale + scaleDiff
	}

	if (isLoaded) {
		return (
			<Grid container spacing={4}>
				<Grid xs={12} md={7}>
					<GoogleMap
						center={map?.getCenter() ?? { lat: 53.55153, lng: -2.009018 }}
						zoom={6}
						mapContainerStyle={{ height: "95vh" }}
						onLoad={setMap}
					>
						{sorted.map(sighting => (
							<MarkerF
								key={sighting.id}
								position={
									new google.maps.LatLng(sighting.location.latitude, sighting.location.longitude)
								}
								opacity={scaleDate(
									sighting.timestamp,
									firstSighting.timestamp,
									lastSighting?.timestamp ?? new Date(),
									0.5,
									1
								)}
								title={formatRelative(sighting.timestamp, new Date())}
								icon={"bird-small.svg"}
							/>
						))}
					</GoogleMap>
				</Grid>
				<Grid xs={12} md={5}>
					<SightingList />
				</Grid>
			</Grid>
		)
	}

	return <>Loading or something went wrong</>
}
