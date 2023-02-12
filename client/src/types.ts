export type Serialized<TModel> = {
	[Property in keyof TModel]: TModel[Property] extends Date ? string : Serialized<TModel[Property]>
}
