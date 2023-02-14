/// <reference types="vite/client" />
// vite-env.d.ts
declare const __COMMIT_HASH__: string
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_MIGRATORY_BIRDS_TRACKER_API_BASE_URI: string
	readonly VITE_MIGRATORY_BIRDS_TRACKER_SIGHTINGS_ADD_FUNCITON_KEY: string
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
