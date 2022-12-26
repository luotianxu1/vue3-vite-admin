export type TBlock = {
    top?: number
    left?: number
    zIndex?: number
    key?: string
    alignCenter?: boolean
    width: number
    height: number
    focus?: false
    props?: any
    model?: any
    hasResize?: any
}

export type TStateOPtion = {
    width: number
    height: number
}

export type TState = {
    container: TStateOPtion
    blocks: Array<TBlock>
}

export type TOptions = {
    label: string
    value: string
}

export type TEditData = {
    label: string
    type: string
    options: Array<TOptions>
}

export type TComponentProps = {
    text?: () => any
    type?: () => any
    size?: () => any
    options?: () => any
}

export type TComponent = {
    label: string
    preview: () => string
    render: () => any
    key: string
    props: TComponentProps
    model: any
}

export type TComponentMap = {
    [propName: string]: any
}

export type TConfig = {
    componentList: Array<TComponent>
    componentMap: TComponentMap
    register: any
}

export type TFocusData = {
    focus: TBlock[]
    unfocused: TBlock[]
}
