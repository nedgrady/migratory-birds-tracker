import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, inSightings): Promise<void> {
	context.log("HTTP trigger function processed a request.")

	context.res = {
		body: inSightings,
	}
}

export default httpTrigger
