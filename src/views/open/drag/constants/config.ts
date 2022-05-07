import * as defaultData from './default'
// 组件列表配置项
export const WIDGET_LIST = [
    {
        type: 'area-chart',
        components: 'AreaChart',
        label: '面积图',
        default: defaultData.AREA_CHART
    },
    {
        type: 'bar-chart',
        components: 'BarChart',
        label: '柱状图',
        default: defaultData.BAR_CHART
    },
    {
        type: 'text',
        components: 'CustomText',
        label: '文字',
        default: defaultData.TEXT
    }
]
