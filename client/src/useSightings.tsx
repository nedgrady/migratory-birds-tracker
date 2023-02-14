import { parseISO } from "date-fns"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Sighting, SightingDto } from "server"

export default function useSightings(): Sighting[] {
	const url = "https://migratory-birds-tracker.azurewebsites.net/api/sightings-get"
	const { isLoading, data } = useQuery<SightingDto[]>(["sightings"], () => fetch(url).then(res => res.json()))
	if (isLoading || !data) return []

	return data.map<Sighting>(sightingDto => ({
		...sightingDto,
		timestamp: parseISO(sightingDto.timestamp),
	}))
}

export function useAddSighting() {
	const queryClient = useQueryClient()

	return useMutation(
		(newSighting: Sighting) =>
			new Promise<void>(resolve => {
				console.log(`Adding ${newSighting}`)
				resolve()
			}),
		{
			onSettled: () => queryClient.invalidateQueries("sightings"),
		}
	)
}
