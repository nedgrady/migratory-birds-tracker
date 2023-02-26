import { PathParams, ResponseResolver, rest, setupWorker } from "msw"
import { SightingDto } from "migratory-birds-tracker-types/types"

const sightings: SightingDto[] = [
	{
		id: "0",
		bird: "Waxwing",
		source: "WLUK",
		timestamp: "2023-01-09T00:00:00.000Z",
		location: {
			latitude: 52.0586235933561,
			longitude: 1.16248352209037,
			description: "Blanche Street, Ipswich",
		},
	},
	{
		id: "1",
		bird: "Waxwing",
		source: "WLUK",
		timestamp: "2023-01-09T00:00:00.000Z",
		location: {
			latitude: 53.3775602001747,
			longitude: -1.51725284567091,
			description: "Crosspool, Sheffield",
		},
	},
]

const sightingsGet = rest.get<never, PathParams, SightingDto[]>(
	"http://localhost:7071/api/sightings-get",
	async (request, response, context) => {
		return response(context.status(200), context.json(sightings))
	}
)

const sightingsAdd = rest.post<SightingDto>(
	"http://localhost:7071/api/sightings-add",
	async (request, response, context) => {
		const sightingJson = (await request.json()) as SightingDto
		sightings.push(sightingJson)
		return response(context.status(201))
	}
)

const worker = setupWorker(sightingsGet, sightingsAdd)
export default worker
