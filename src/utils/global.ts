export function globalStaticAssets(url) {
    return new URL(`../assets/img/${url}`, import.meta.url).href
}

export function getStyle(el, prop) {
    return parseInt(window.getComputedStyle(el, null)[prop], 0)
}
