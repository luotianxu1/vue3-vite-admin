declare namespace Menu {
    interface MenuOptions {
        path: string
        title: string
        icon?: string
        isLink?: string
        close?: boolean
        children?: MenuOptions[]
    }
}

interface ImportMetaEnv {
    readonly VITE_APP_CURRENTMODE: string
    readonly VITE_APP_BASE_URL: string
}
