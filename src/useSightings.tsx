import { parseISO } from "date-fns"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Sighting } from "./birdData"
import useSightingsContainer from "./useSightingsContainer"

type SightingDto = Sighting &
	Omit<Sighting, "timestamp"> & {
		timestamp: string
	}

export default function useSightings() {
	const container = useSightingsContainer()

	const { isLoading, data } = useQuery<Sighting[]>(["sightings"], () =>
		container.items
			.query<SightingDto>("SELECT * from c")
			.fetchAll()
			.then(feedResponse =>
				feedResponse.resources.map(sightingDto => {
					parseISO(sightingDto.timestamp)
					console.log(sightingDto)

					return {
						...sightingDto,
						timestamp: parseISO(sightingDto.timestamp),
					}
				})
			)
	)

	if (isLoading || !data) return []

	return data
}

export function useAddSighting() {
	const container = useSightingsContainer()
	const queryClient = useQueryClient()

	return useMutation((newSighting: Sighting) => container.items.create<SightingDto>(newSighting as SightingDto), {
		onSettled: () => queryClient.invalidateQueries("sightings"),
	})
}
