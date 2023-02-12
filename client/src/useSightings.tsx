import { parseISO } from "date-fns"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Sighting } from "./birdData"
import useSightingsContainer from "./useSightingsContainer"
import { Serialized } from "./types"

type SightingDto = Serialized<Sighting>

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
	const container = useSightingsContainer()
	const queryClient = useQueryClient()

	return useMutation((newSighting: Sighting) => container.items.create<SightingDto>(newSighting as any), {
		onSettled: () => queryClient.invalidateQueries("sightings"),
	})
}
