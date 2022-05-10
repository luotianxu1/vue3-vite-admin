import * as defaultData from './default'
import * as styleFormConfig from './styleFormConfig'
// 组件列表配置项
export const WIDGET_LIST = [
    {
        type: 'area-chart',
        components: 'AreaChart',
        label: '面积图',
        default: defaultData.AREA_CHART_DATA,
        styles: defaultData.AREA_CHART_STYLE,
        styleForm: styleFormConfig.AREA_CHART
    },
    {
        type: 'bar-chart',
        components: 'BarChart',
        label: '柱状图',
        default: defaultData.BAR_CHART_DATA,
        styles: defaultData.BAR_CHART_STYLE,
        styleForm: styleFormConfig.BAR_CHART
    },
    {
        type: 'text',
        components: 'CustomText',
        label: '文字',
        default: defaultData.TEXT_DATA,
        styles: defaultData.TEXT_STYLE,
        styleForm: styleFormConfig.TEXT
    }
]
