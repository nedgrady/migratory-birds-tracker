import { compareAsc,  } from "date-fns"

export interface Event {
	location: {
		latitude: number
		longitude: number
		description: string
	}
	timestamp: Date
}

export type Sighting = Event & {
	bird: "Waxwing"
	source: string
}

const sightings: Sighting[] = [
	{ bird: "Waxwing", source: "WLUK", timestamp: new Date(2023, 0, 9), location: { latitude: 52.0586235933561, longitude: 1.16248352209037, description: "Blanche Street, Ipswich", } },
	{ bird: "Waxwing", source: "WLUK", timestamp: new Date(2023, 0, 9), location: { latitude: 53.3775602001747, longitude: -1.51725284567091, description: "Crosspool, Sheffield", } },
	{ bird: "Waxwing", source: "WLUK", timestamp: new Date(2023, 0, 1), location: { latitude: 52.3421326849805, longitude: 1.66134364362756, description: "Reydon Suffolk", } },
	{ bird: "Waxwing", source: "WLUK", timestamp: new Date(2023, 0, 9), location: { latitude: 52.4706329814595, longitude: 1.70393232331895, description: "Oulton broad, suffolk", } },
	{ bird: "Waxwing", source: "WLUK", timestamp: new Date(2022, 11, 15), location: { latitude: 54.2835657996553, longitude: -0.406249351463868, description: "Scarborough | North Yorkshire", } },
	{ bird: "Waxwing", source: "WSUK", timestamp: new Date(2023, 0, 9), location: { latitude: 57.2048784152022, longitude: -3.8261626431647, description: "Aviemore, Dougal Drive", } },
	{ bird: "Waxwing", source: "WSUK", timestamp: new Date(2023, 0, 9), location: { latitude: 55.8057644580282, longitude: -4.27077231621384, description: "Glasgow on Clarkston Road", } },
]

export default sightings.sort((a, b) => compareAsc(a.timestamp, b.timestamp))