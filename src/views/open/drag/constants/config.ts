// 组件列表配置项
export const WIDGET_LIST = [
    {
        type: 'area-chart',
        components: 'AreaChart',
        label: '面积图',
        default: {
            w: 150,
            h: 150
        }
    },
    {
        type: 'bar-chart',
        components: 'BarChart',
        label: '柱状图',
        default: {
            w: 300,
            h: 150
        }
    },
    {
        type: 'text',
        components: 'AreaChart',
        label: '文字',
        default: {
            w: 200,
            h: 50
        }
    }
]
