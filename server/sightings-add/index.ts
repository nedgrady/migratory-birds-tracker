import { AzureFunction, Context, HttpRequest } from "@azure/functions"
// import { SightingSchema } from "types"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	const newSighting = req.body //SightingSchema.parse(req.body)

	newSighting.id = new Date().toISOString()

	context.bindings.outSighting = {
		id: new Date(),
		...req.body,
	}
}

export default httpTrigger
