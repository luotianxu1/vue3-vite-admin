interface ImportMetaEnv {
	readonly VITE_APP_CURRENTMODE: string
	readonly VITE_APP_BASE_URL: string
}

declare global {
	const $globalStaticAssets: typeof import("@/utils/global")["globalStaticAssets"]
}
