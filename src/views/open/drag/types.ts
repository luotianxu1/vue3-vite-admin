export interface List {
    id: number
    x: number
    y: number
    w: number
    h: number
    z: number
    label: string
    component: string,
    data: any,
    focused: Boolean
}

// 组件列表
export interface WidgetList {
    type: string
    label: string
    components: string
    default: {
        w: number,
        h: number,
        data: any
    }
}
