import LayoutOpen from "@/components/layoutOpen/index.vue"
import { RouteRecordRaw } from "vue-router"

const cesiumRouter: RouteRecordRaw[] = [
	{
		path: "/cesium",
		component: LayoutOpen,
		name: "cesium",
		meta: { title: "cesium" },
		redirect: "/system/user",
		children: [
			{
				path: "cesium",
				name: "cesium",
				meta: { title: "cesium", keepAlive: true },
				component: () => import("@/views/cesium/init/Cesium.vue")
			}
		]
	}
]

export default cesiumRouter
