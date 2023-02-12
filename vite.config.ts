import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { execSync } from "child_process"

const commitHash = execSync("git rev-parse HEAD").toString()

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/migratory-birds-tracker/#/",
	define: {
		__COMMIT_HASH__: JSON.stringify(commitHash),
	},
})
