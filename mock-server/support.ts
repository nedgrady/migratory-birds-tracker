// src/mocks/support.js
import { RestHandler, RESTMethods } from "msw"

// const BASE_URL = "https://api.github.com"

// function createRestHandler(method) {
// 	return (url, resolver) => {
// 		const absoluteUrl = new URL(mask, BASE_URL).toString()
// 		return new RestHandler(method, absoluteUrl, resolver)
// 	}
// }

// export const rest = {
// 	head: createRestHandler(RESTMethods.HEAD),
// 	get: createRestHandler(RESTMethods.GET),
// 	post: createRestHandler(RESTMethods.POST),
// 	put: createRestHandler(RESTMethods.PUT),
// 	delete: createRestHandler(RESTMethods.DELETE),
// 	patch: createRestHandler(RESTMethods.PATCH),
// 	options: createRestHandler(RESTMethods.OPTIONS),
// }
