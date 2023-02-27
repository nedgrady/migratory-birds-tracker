import Grid from "@mui/material/Unstable_Grid2"
import { GoogleMap, useLoadScript, MarkerF, useGoogleMap } from "@react-google-maps/api"
import { useEffect, useRef, useState } from "react"
import SightingList from "./SightingsList"
import useSightings from "./useSightings"
import _ from "lodash"
import { Sighting } from "migratory-birds-tracker-types/types"
import { formatRelative, isWithinInterval, sub, min, endOfDay } from "date-fns"
import DateSlider from "./DateSlider"
import { Paper, useTheme } from "@mui/material"
import { scaleDate } from "./scaleDate"

type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]

const libraries: Libraries = ["visualization", "places"]

export default function BirdTracker() {
	const now = endOfDay(new Date())
	const sightings = useSightings()
	const timestamps = sightings.map(sighting => sighting.timestamp)

	const firstSighting = min([...timestamps, sub(now, { days: 30 })])
	const [[minSelectedDate, maxSelectedDate], setSelectedDates] = useState<Date[]>([firstSighting, now])

	const sightingsToDisplay = sightings.filter(sighting =>
		isWithinInterval(sighting.timestamp, {
			start: minSelectedDate,
			end: maxSelectedDate,
		})
	)

	return (
		<Grid container spacing={4}>
			<Grid xs={12} md={7}>
				<BirdsMap>
					{sightingsToDisplay.map(sighting => (
						<MarkerF
							key={sighting.id}
							position={new google.maps.LatLng(sighting.location.latitude, sighting.location.longitude)}
							opacity={scaleDate(sighting.timestamp, firstSighting, now, 0.5, 1)}
							title={formatRelative(sighting.timestamp, now)}
							icon={"bird-small.svg"}
						/>
					))}
					<CustomControl>
						<DateSlider
							minDate={firstSighting}
							maxDate={now}
							value={[minSelectedDate, maxSelectedDate]}
							onChange={setSelectedDates}
						/>
					</CustomControl>
				</BirdsMap>
			</Grid>
			<Grid xs={12} md={5}>
				<SightingList />
			</Grid>
		</Grid>
	)
}

function BirdsMap(props: React.PropsWithChildren) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_MIGRATORY_BIRDS_TRACKER_GOOGLE_MAPS_API_KEY,
		libraries: libraries,
	})

	const [map, setMap] = useState<google.maps.Map | null>()

	if (!isLoaded) return <>Loading Google Maps...</>

	return (
		<GoogleMap
			center={map?.getCenter() ?? { lat: 53.55153, lng: -2.009018 }}
			zoom={6}
			mapContainerStyle={{ height: "95vh" }}
			onLoad={setMap}
		>
			{props?.children}
		</GoogleMap>
	)
}

function CustomControl(props: React.PropsWithChildren) {
	const map = useGoogleMap()
	const ref = useRef<HTMLDivElement>(null)
	const theme = useTheme()

	useEffect(() => {
		if (map && ref && ref.current) {
			const controls = map.controls[google.maps.ControlPosition.TOP_CENTER]

			controls.push(ref.current)
		}
	}, [map, ref])

	return <div ref={ref}>{props.children}</div>
}
