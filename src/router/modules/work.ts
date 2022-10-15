import { RouteRecordRaw } from 'vue-router'
import LayoutOpen from '@/components/layoutOpen/index.vue'

const openRouter: RouteRecordRaw[] = [
    {
        path: '/work',
        component: LayoutOpen,
        name: '工作台',
        meta: { title: '工作台' },
        redirect: '/work/index',
        children: [
            {
                path: 'index',
                name: '工作台',
                component: () => import('@/views/work/index.vue')
            },
            {
                path: 'characterRecognition',
                name: '文字识别',
                component: () =>
                    import(
                        '@/views/work/function/characterRecognition/CharacterRecognition.vue'
                    )
            }
        ]
    }
]

export default openRouter
