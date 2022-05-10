
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
    focused: boolean,
    type: string,
    style:any
}

// 组件列表
export interface WidgetList {
    type: string
    components: string
    label: string
    default: {
        w: number
        h: number
        data: any
    }
    styles: any
    styleForm: any
}
