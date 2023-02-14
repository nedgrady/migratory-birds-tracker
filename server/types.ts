import { z } from "zod"

export type Serialized<TModel> = {
	[Property in keyof TModel]: TModel[Property] extends Date ? string : Serialized<TModel[Property]>
}

export const LocationSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	description: z.string(),
})

export const EventSchema = z.object({
	location: LocationSchema,
	timestamp: z.date(),
})

export const SightingSchema = z.intersection(
	EventSchema,
	z.object({
		id: z.optional(z.string()),
		bird: z.literal("Waxwing"),
		source: z.string(),
	})
)

export type Event = z.infer<typeof EventSchema>

export type Sighting = z.infer<typeof SightingSchema>

export type SightingDto = Serialized<Sighting>
