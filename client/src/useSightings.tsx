import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Sighting, SightingDto, SightingSchema } from "migratory-birds-tracker-types/types"

export default function useSightings(): Sighting[] {
	const url = import.meta.env.VITE_MIGRATORY_BIRDS_TRACKER_API_BASE_URI + "/sightings-get"

	console.log(url)
	const { isLoading, data } = useQuery<SightingDto[]>(["sightings"], () => fetch(url).then(res => res.json()))
	if (isLoading || !data) return []

	return data.filter(dto => SightingSchema.safeParse(dto).success).map<Sighting>(dto => SightingSchema.parse(dto))
}

export function useAddSighting() {
	const queryClient = useQueryClient()

	const url = import.meta.env.VITE_MIGRATORY_BIRDS_TRACKER_API_BASE_URI + "/sightings-add"

	return useMutation(
		(newSighting: Sighting) =>
			axios.post(url, newSighting, {
				headers: {
					"x-functions-key": import.meta.env.VITE_MIGRATORY_BIRDS_TRACKER_SIGHTINGS_ADD_FUNCITON_KEY,
				},
			}),
		{
			onSettled: () => queryClient.invalidateQueries("sightings"),
		}
	)
}
