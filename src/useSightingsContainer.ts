import { Container, CosmosClient } from "@azure/cosmos"
import { createContext, useContext } from "react"

const endpoint = "https://migratory-birds-tracker.documents.azure.com:443/"
const key = "UMNgSoJs5zNCLEsfbGnHLJ9pIxsBQmUHyegVdppzzcu1c5TtA6tm4SX001g7KSm1NNpBGwsRFm1ZACDbiaKDDA=="

const client = new CosmosClient({ endpoint, key })

const { database } = await client.databases.createIfNotExists({ id: "migratory-birds-tracker" })
console.log(database.id)

export const { container } = await database.containers.createIfNotExists({ id: "sightings" })
console.log(container.id)

export const SightingsContainerContext = createContext<Container>(container)

export default function useSightingsContainer() {
	const sightingsContainer = useContext(SightingsContainerContext)
	return sightingsContainer
}
