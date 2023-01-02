import mockjs, { Random } from "mockjs"
import { IResponseData } from "@/api/interface/type"
import { ILoginParams, ILoginData, IRegisterParams, IRegisterData, IUserListData } from "@/api/system/userApi"

const userInfo = mockjs.mock({
	id: "@id",
	name: "@cname",
	age: "@integer( 18, 60)",
	sex: "@integer( 0, 1)",
	phone: "@phone",
	email: "@email",
	city: "@county(true)",
	status: "@integer( 0, 1)",
	type: "@integer( 0, 1)",
	img: Random.image("200x100"),
	addTime: "@datetime",
	editTime: "@datetime"
})

export default [
	// 用户列表
	{
		url: "/testApi/api/userList",
		method: "post",
		response: () => {
			return <IResponseData<IUserListData>>{
				status: 200,
				message: "查询用户列表成功！",
				data: mockjs.mock({
					"list|100": [userInfo]
				})
			}
		}
	},
	// 用户登陆
	{
		url: "/testApi/api/login",
		method: "post",
		response: ({ body }) => {
			let res = body as ILoginParams
			if (res.username === "admin") {
				return <IResponseData<ILoginData>>{
					status: 200,
					message: "登陆成功！",
					data: {
						isLogin: true,
						token: "123465789"
					}
				}
			}
			return <IResponseData<ILoginData>>{
				status: 200,
				message: "用户名或密码错误！",
				data: {
					isLogin: false
				}
			}
		}
	},
	// 用户注册
	{
		url: "/testApi/api/register",
		method: "post",
		response: ({ body }) => {
			let res = body as IRegisterParams
			if (res.password === res.passwordAgain) {
				return <IResponseData<IRegisterData>>{
					status: 200,
					message: "注册成功！",
					data: {
						isRegister: true
					}
				}
			}
			return <IResponseData<IRegisterData>>{
				status: 200,
				message: "注册失败!",
				data: {
					isRegister: false
				}
			}
		}
	},
	// 用户信息
	{
		url: "/testApi/api/getUserInfo",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "查询用户信息成功！",
				data: {
					...userInfo
				}
			}
		}
	},
	// 菜单列表
	{
		url: "/testApi/api/pageListV2",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "获取菜单成功!",
				data: {
					list: [
						{
							id: 1,
							name: "高德地图",
							icon: "icon-ditu",
							path: "/map",
							meta: { isFull: false },
							children: [
								{
									id: 2,
									name: "地图状态",
									icon: "icon-locus",
									path: "/map/aMapStatus",
									meta: { isFull: false },
									component: "/map/AMapStatus"
								},
								{
									id: 2,
									name: "地图切换",
									icon: "icon-locus",
									path: "/map/mapChange",
									meta: { isFull: false },
									component: "/map/leaflet/MapChange"
								},
								{
									id: 3,
									name: "类型",
									icon: "icon-locus",
									path: "/map/type",
									meta: { isFull: false },
									children: [
										{
											id: 4,
											name: "简易行政区",
											icon: "icon-locus",
											path: "/map/aMapAdministrative",
											meta: { isFull: false },
											component: "/map/mapType/AMapAdministrative"
										},
										{
											id: 5,
											name: "世界地图",
											icon: "icon-locus",
											path: "/map/aMapArea",
											meta: { isFull: false },
											component: "/map/mapType/AMapArea"
										},
										{
											id: 7,
											name: "区域掩模",
											icon: "icon-locus",
											path: "/map/aMapAreaMask",
											meta: { isFull: false },
											component: "/map/mapType/AMapAreaMask"
										}
									]
								},
								{
									id: 8,
									name: "事件",
									icon: "icon-locus",
									path: "/map/event",
									meta: { isFull: false },
									children: [
										{
											id: 9,
											name: "地图事件",
											icon: "icon-locus",
											path: "/map/aMapEvent",
											meta: { isFull: false },
											component: "/map/mapEvent/AMapEvent"
										},
										{
											id: 10,
											name: "覆盖物事件",
											icon: "icon-locus",
											path: "/map/aMapCoverEvent",
											meta: { isFull: false },
											component: "/map/mapEvent/AMapCoverEvent"
										}
									]
								},
								{
									id: 11,
									name: "覆盖物",
									icon: "icon-locus",
									path: "/map/Marker",
									meta: { isFull: false },
									children: [
										{
											id: 12,
											name: "点标记",
											icon: "icon-locus",
											path: "/map/aMapMarker",
											meta: { isFull: false },
											component: "/map/mapCover/AMapMarker"
										},
										{
											id: 13,
											name: "轨迹回放",
											icon: "icon-locus",
											path: "/map/aMapTrackPlayback",
											meta: { isFull: false },
											component: "/map/mapCover/AMapTrackPlayback"
										},
										{
											id: 14,
											name: "避让标注图层",
											icon: "icon-locus",
											path: "/map/aMapAvoidLayers",
											meta: { isFull: false },
											component: "/map/mapCover/AMapAvoidLayers"
										},
										{
											id: 15,
											name: "文字标注",
											icon: "icon-locus",
											path: "/map/aMapTextMarker",
											meta: { isFull: false },
											component: "/map/mapCover/AMapTextMarker"
										},
										{
											id: 16,
											name: "海量点",
											icon: "icon-locus",
											path: "/map/aMapMassPointMarkers",
											meta: { isFull: false },
											component: "/map/mapCover/AMapMassPointMarkers"
										},
										{
											id: 17,
											name: "海量点2",
											icon: "icon-locus",
											path: "/map/aMapMassMarkers",
											meta: { isFull: false },
											component: "/map/mapCover/AMapMassMarkers"
										},
										{
											id: 18,
											name: "聚合",
											icon: "icon-locus",
											path: "/map/aMapPointAggregation",
											meta: { isFull: false },
											component: "/map/mapCover/AMapPointAggregation"
										},
										{
											id: 19,
											name: "按索引聚合",
											icon: "icon-locus",
											path: "/map/aMapPointAggregation2",
											meta: { isFull: false },
											component: "/map/mapCover/AMapPointAggregation2"
										},
										{
											id: 20,
											name: "矢量图形",
											icon: "icon-locus",
											path: "/map/aMapVectorGraphics",
											meta: { isFull: false },
											component: "/map/mapCover/AMapVectorGraphics"
										},
										{
											id: 21,
											name: "右键菜单",
											icon: "icon-locus",
											path: "/map/aMapMenu",
											meta: { isFull: false },
											component: "/map/mapCover/AMapMenu"
										},
										{
											id: 22,
											name: "信息窗体",
											icon: "icon-locus",
											path: "/map/aMapInfoWindow",
											meta: { isFull: false },
											component: "/map/mapCover/AMapInfoWindow"
										}
									]
								},
								{
									id: 23,
									name: "搜索服务",
									icon: "icon-locus",
									path: "/map/InputHint",
									meta: { isFull: false },
									children: [
										{
											id: 24,
											name: "输入提示",
											icon: "icon-locus",
											path: "/map/aMapInputHint",
											meta: { isFull: false },
											component: "/map/mapSearch/AMapInputHint"
										}
									]
								},
								{
									id: 25,
									name: "路线规划",
									icon: "icon-locus",
									path: "/map/Planning",
									meta: { isFull: false },
									children: [
										{
											id: 26,
											name: "驾车路线规划",
											icon: "icon-locus",
											path: "/map/aMapPlanning",
											meta: { isFull: false },
											component: "/map/mapPlanning/AMapPlanning"
										},
										{
											id: 27,
											name: "拖拽路线规划",
											icon: "icon-locus",
											path: "/map/aMapDragPlanning",
											meta: { isFull: false },
											component: "/map/mapPlanning/AMapDragPlanning"
										}
									]
								},
								{
									id: 28,
									name: "其他",
									icon: "icon-locus",
									path: "/map/Geocoding",
									meta: { isFull: false },
									children: [
										{
											id: 29,
											name: "地理编码",
											icon: "icon-locus",
											path: "/map/aMapGeocoding",
											meta: { isFull: false },
											component: "/map/mapOther/AMapGeocoding"
										},
										{
											id: 30,
											name: "行政区查询",
											icon: "icon-locus",
											path: "/map/aMapAdministrativeArea",
											meta: { isFull: false },
											component: "/map/mapOther/AMapAdministrativeArea"
										},
										{
											id: 31,
											name: "定位",
											icon: "icon-locus",
											path: "/map/aMapLocation",
											meta: { isFull: false },
											component: "/map/mapOther/AMapLocation"
										},
										{
											id: 32,
											name: "天气",
											icon: "icon-locus",
											path: "/map/aMapWeather",
											meta: { isFull: false },
											component: "/map/mapOther/AMapWeather"
										}
									]
								},
								{
									id: 33,
									name: "计算",
									icon: "icon-locus",
									path: "/map/aMapCalculate",
									meta: { isFull: false },
									children: [
										{
											id: 34,
											name: "两点间距离",
											icon: "icon-locus",
											path: "/map/aMapPointCalculate",
											meta: { isFull: false },
											component: "/map/mapCalculate/AMapPointCalculate"
										},
										{
											id: 35,
											name: "点到直线的距离",
											icon: "icon-locus",
											path: "/map/aMapLineCalculate",
											meta: { isFull: false },
											component: "/map/mapCalculate/AMapLineCalculate"
										},
										{
											id: 36,
											name: "折线长度",
											icon: "icon-locus",
											path: "/map/aMapPathLength",
											meta: { isFull: false },
											component: "/map/mapCalculate/AMapPathLength"
										},
										{
											id: 37,
											name: "面积",
											icon: "icon-locus",
											path: "/map/aMapAreaNum",
											meta: { isFull: false },
											component: "/map/mapCalculate/AMapArea"
										},
										{
											id: 38,
											name: "点是否在线上",
											icon: "icon-locus",
											path: "/map/aMapIsOnLine",
											meta: { isFull: false },
											component: "/map/mapCalculate/AMapIsOnLine"
										},
										{
											id: 39,
											name: "点是否在多边形内",
											icon: "icon-locus",
											path: "/map/aMapIsOnPolygon",
											meta: { isFull: false },
											component: "/map/mapCalculate/AMapIsOnPolygon"
										},
										{
											id: 40,
											name: "几何关系",
											icon: "icon-locus",
											path: "/map/aMapGeometricRelationship",
											meta: { isFull: false },
											component: "/map/mapCalculate/AMapGeometricRelationship"
										}
									]
								},
								{
									id: 41,
									name: "可视化",
									icon: "icon-locus",
									path: "/map/cellular",
									meta: { isFull: false },
									children: [
										{
											id: 42,
											name: "蜂窝热力图",
											icon: "icon-locus",
											path: "/map/cellularHeatmap",
											meta: { isFull: false },
											component: "/map/mapVisualization/CellularHeatmap"
										},
										{
											id: 43,
											name: "网格热力图",
											icon: "icon-locus",
											path: "/map/gridHeatmap",
											meta: { isFull: false },
											component: "/map/mapVisualization/GridHeatmap"
										},
										{
											id: 44,
											name: "热力图",
											icon: "icon-locus",
											path: "/map/heatmap",
											meta: { isFull: false },
											component: "/map/mapVisualization/Heatmap"
										},
										{
											id: 45,
											name: "脉冲线",
											icon: "icon-locus",
											path: "/map/pulseLine",
											meta: { isFull: false },
											component: "/map/mapVisualization/PulseLine"
										},
										{
											id: 46,
											name: "飞线",
											icon: "icon-locus",
											path: "/map/flyingLine",
											meta: { isFull: false },
											component: "/map/mapVisualization/FlyingLine"
										},
										{
											id: 47,
											name: "连接线",
											icon: "icon-locus",
											path: "/map/connectingLine",
											meta: { isFull: false },
											component: "/map/mapVisualization/ConnectingLine"
										},
										{
											id: 48,
											name: "线图层",
											icon: "icon-locus",
											path: "/map/lineLayer",
											meta: { isFull: false },
											component: "/map/mapVisualization/LineLayer"
										},
										{
											id: 49,
											name: "图标图层",
											icon: "icon-locus",
											path: "/map/iconLayer",
											meta: { isFull: false },
											component: "/map/mapVisualization/IconLayer"
										},
										{
											id: 50,
											name: "贴地点",
											icon: "icon-locus",
											path: "/map/postLocation",
											meta: { isFull: false },
											component: "/map/mapVisualization/PostLocation"
										},
										{
											id: 51,
											name: "棱柱图层",
											icon: "icon-locus",
											path: "/map/prismLayer",
											meta: { isFull: false },
											component: "/map/mapVisualization/PrismLayer"
										},
										{
											id: 52,
											name: "圆点图层",
											icon: "icon-locus",
											path: "/map/dotLayer",
											meta: { isFull: false },
											component: "/map/mapVisualization/DotLayer"
										},
										{
											id: 53,
											name: "标牌点",
											icon: "icon-locus",
											path: "/map/signagePoint",
											meta: { isFull: false },
											component: "/map/mapVisualization/SignagePoint"
										}
									]
								}
							]
						},
						{
							id: 100,
							name: "系统管理",
							icon: "icon-setting",
							path: "/system",
							meta: { isFull: false },
							children: [
								{
									id: 101,
									name: "用户管理",
									icon: "icon-yonghu",
									path: "/system/user",
									meta: { isFull: false },
									component: "/system/user/User"
								},
								{
									id: 102,
									name: "菜单管理",
									icon: "icon-caidan",
									path: "/system/menu",
									meta: { isFull: false },
									component: "/system/menu/Menu"
								}
							]
						},
						{
							id: 200,
							name: "样式",
							icon: "icon-dangedemoban",
							path: "/style",
							meta: { isFull: false },
							children: [
								{
									id: 28,
									name: "导航栏",
									icon: "icon-locus",
									path: "/style/navigation",
									meta: { isFull: false },
									children: [
										{
											id: 201,
											name: "导航栏1",
											icon: "icon-mulu",
											path: "/style/navigation1",
											meta: { isFull: false },
											component: "/style/navigation/Navigation1"
										},
										{
											id: 201,
											name: "导航栏2",
											icon: "icon-mulu",
											path: "/style/navigation2",
											meta: { isFull: false },
											component: "/style/navigation/Navigation2"
										},
										{
											id: 201,
											name: "导航栏3",
											icon: "icon-mulu",
											path: "/style/navigation3",
											meta: { isFull: false },
											component: "/style/navigation/Navigation3"
										}
									]
								},
								{
									id: 28,
									name: "卡片",
									icon: "icon-locus",
									path: "/style/card",
									meta: { isFull: false },
									children: [
										{
											id: 202,
											name: "卡片1",
											icon: "icon-kapian",
											path: "/style/card1",
											meta: { isFull: false },
											component: "/style/card/Card1"
										},
										{
											id: 203,
											name: "卡片2",
											icon: "icon-kapian",
											path: "/style/card2",
											meta: { isFull: false },
											component: "/style/card/Card2"
										},
										{
											id: 204,
											name: "卡片3",
											icon: "icon-kapian",
											path: "/style/card3",
											meta: { isFull: false },
											component: "/style/card/Card3"
										},
										{
											id: 205,
											name: "卡片4",
											icon: "icon-kapian",
											path: "/style/card4",
											meta: { isFull: false },
											component: "/style/card/Card4"
										},
										{
											id: 206,
											name: "卡片5",
											icon: "icon-kapian",
											path: "/style/card5",
											meta: { isFull: false },
											component: "/style/card/Card5"
										},
										{
											id: 207,
											name: "卡片6",
											icon: "icon-kapian",
											path: "/style/card6",
											meta: { isFull: false },
											component: "/style/card/Card6"
										}
									]
								},
								{
									id: 28,
									name: "按钮",
									icon: "icon-locus",
									path: "/style/button",
									meta: { isFull: false },
									children: [
										{
											id: 208,
											name: "按钮1",
											icon: "icon-anniu",
											path: "/style/button1",
											meta: { isFull: false },
											component: "/style/button/Button1"
										},
										{
											id: 209,
											name: "按钮2",
											icon: "icon-anniu",
											path: "/style/button2",
											meta: { isFull: false },
											component: "/style/button/Button2"
										}
									]
								},
								{
									id: 28,
									name: "加载图标",
									icon: "icon-locus",
									path: "/style/loading",
									meta: { isFull: false },
									children: [
										{
											id: 210,
											name: "加载图标1",
											icon: "icon-loading",
											path: "/style/loading1",
											meta: { isFull: false },
											component: "/style/loading/Loading1"
										},
										{
											id: 210,
											name: "加载图标2",
											icon: "icon-loading",
											path: "/style/loading2",
											meta: { isFull: false },
											component: "/style/loading/Loading2"
										}
									]
								},
								{
									id: 28,
									name: "输入框",
									icon: "icon-locus",
									path: "/style/input",
									meta: { isFull: false },
									children: [
										{
											id: 212,
											name: "动态输入框",
											icon: "icon-beijingtupian",
											path: "/style/input1",
											meta: { isFull: false },
											component: "/style/input/Input1"
										},
										{
											id: 212,
											name: "打字特效",
											icon: "icon-beijingtupian",
											path: "/style/input2",
											meta: { isFull: false },
											component: "/style/input/Input2"
										}
									]
								},
								{
									id: 211,
									name: "背景渐变",
									icon: "icon-beijingtupian",
									path: "/style/gradient",
									meta: { isFull: false },
									component: "/style/gradient/Gradient"
								}
							]
						},
						{
							id: 300,
							name: "threejs",
							icon: "icon-threejs",
							path: "/three",
							meta: { isFull: false },
							children: [
								{
									id: 301,
									name: "基础",
									icon: "icon-threejs",
									path: "/three/base",
									meta: { isFull: false },
									children: [
										{
											id: 301,
											name: "第一个场景",
											icon: "icon-threejs",
											path: "/three/baseScene",
											meta: { isFull: false },
											component: "/three/gettingStarted/Base"
										},
										{
											id: 303,
											name: "阴影",
											icon: "icon-threejs",
											path: "/three/shadow",
											meta: { isFull: false },
											component: "/three/gettingStarted/Shadow"
										},
										{
											id: 304,
											name: "运动",
											icon: "icon-threejs",
											path: "/three/sport",
											meta: { isFull: false },
											component: "/three/gettingStarted/Sport"
										}
									]
								},
								{
									id: 305,
									name: "基本组件",
									icon: "icon-threejs",
									path: "/three/scene",
									meta: { isFull: false },
									children: [
										{
											id: 306,
											name: "场景",
											icon: "icon-threejs",
											path: "/three/scene1",
											meta: { isFull: false },
											component: "/three/basicComponents/Scene"
										}
									]
								},
								{
									id: 307,
									name: "光源",
									icon: "icon-threejs",
									path: "/three/light",
									meta: { isFull: false },
									children: [
										{
											id: 308,
											name: "环境光",
											icon: "icon-threejs",
											path: "/three/ambientLight",
											meta: { isFull: false },
											component: "/three/light/AmbientLight"
										},
										{
											id: 309,
											name: "聚光灯光源",
											icon: "icon-threejs",
											path: "/three/spotLight",
											meta: { isFull: false },
											component: "/three/light/SpotLight"
										},
										{
											id: 310,
											name: "点光源",
											icon: "icon-threejs",
											path: "/three/pointLight",
											meta: { isFull: false },
											component: "/three/light/PointLight"
										},
										{
											id: 311,
											name: "平行光",
											icon: "icon-threejs",
											path: "/three/directionLight",
											meta: { isFull: false },
											component: "/three/light/DirectionalLight"
										},
										{
											id: 312,
											name: "半球光",
											icon: "icon-threejs",
											path: "/three/hemisphereLight",
											meta: { isFull: false },
											component: "/three/light/HemisphereLight"
										},
										{
											id: 313,
											name: "光晕",
											icon: "icon-threejs",
											path: "/three/lensFlare",
											meta: { isFull: false },
											component: "/three/light/LensFlare"
										}
									]
								},
								{
									id: 314,
									name: "材质",
									icon: "icon-threejs",
									path: "/three/mesh",
									meta: { isFull: false },
									children: [
										{
											id: 315,
											name: "网格基础材质",
											icon: "icon-threejs",
											path: "/three/meshBasicMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshBasicMaterial"
										},
										{
											id: 316,
											name: "网格深度材质",
											icon: "icon-threejs",
											path: "/three/meshDepthMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshDepthMaterial"
										},
										{
											id: 317,
											name: "联合材质",
											icon: "icon-threejs",
											path: "/three/multiMaterialObject",
											meta: { isFull: false },
											component: "/three/material/MultiMaterialObject"
										},
										{
											id: 318,
											name: "网格法向材质",
											icon: "icon-threejs",
											path: "/three/meshNormalMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshNormalMaterial"
										},
										{
											id: 319,
											name: "使用不同材质",
											icon: "icon-threejs",
											path: "/three/meshFaceMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshFaceMaterial"
										},
										{
											id: 320,
											name: "网格Lambert材质",
											icon: "icon-threejs",
											path: "/three/meshLambertMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshLambertMaterial"
										},
										{
											id: 321,
											name: "网格Phong材质",
											icon: "icon-threejs",
											path: "/three/meshPhongMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshPhongMaterial"
										},
										{
											id: 322,
											name: "网格标准材质",
											icon: "icon-threejs",
											path: "/three/meshStandardMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshStandardMaterial"
										},
										{
											id: 323,
											name: "网格物理材质",
											icon: "icon-threejs",
											path: "/three/meshPhysicalMaterial",
											meta: { isFull: false },
											component: "/three/material/MeshPhysicalMaterial"
										},
										{
											id: 323,
											name: "网格物理材质2",
											icon: "icon-threejs",
											path: "/three/meshPhysicalMaterial2",
											meta: { isFull: false },
											component: "/three/material/MeshPhysicalMaterial2"
										},
										{
											id: 324,
											name: "直线基础材质",
											icon: "icon-threejs",
											path: "/three/lineBasicMaterial",
											meta: { isFull: false },
											component: "/three/material/LineBasicMaterial"
										},
										{
											id: 325,
											name: "虚线材质",
											icon: "icon-threejs",
											path: "/three/lineDashedMaterial",
											meta: { isFull: false },
											component: "/three/material/LineDashedMaterial"
										}
									]
								},
								{
									id: 326,
									name: "几何体",
									icon: "icon-threejs",
									path: "/three/geometry",
									meta: { isFull: false },
									children: [
										{
											id: 327,
											name: "几何体",
											icon: "icon-threejs",
											path: "/three/bufferGeometry",
											meta: { isFull: false },
											component: "/three/geometry/BufferGeometry"
										},
										{
											id: 327,
											name: "三角形",
											icon: "icon-threejs",
											path: "/three/triangle",
											meta: { isFull: false },
											component: "/three/geometry/Triangle"
										},
										{
											id: 327,
											name: "平面",
											icon: "icon-threejs",
											path: "/three/planeGeometry",
											meta: { isFull: false },
											component: "/three/geometry/PlaneGeometry"
										},
										{
											id: 328,
											name: "圆形",
											icon: "icon-threejs",
											path: "/three/circleGeometry",
											meta: { isFull: false },
											component: "/three/geometry/CircleGeometry"
										},
										{
											id: 329,
											name: "环形",
											icon: "icon-threejs",
											path: "/three/ringGeometry",
											meta: { isFull: false },
											component: "/three/geometry/RingGeometry"
										},
										{
											id: 330,
											name: "任意图形",
											icon: "icon-threejs",
											path: "/three/shapeGeometry",
											meta: { isFull: false },
											component: "/three/geometry/ShapeGeometry"
										},
										{
											id: 331,
											name: "长方体",
											icon: "icon-threejs",
											path: "/three/boxGeometry",
											meta: { isFull: false },
											component: "/three/geometry/BoxGeometry"
										},
										{
											id: 332,
											name: "球体",
											icon: "icon-threejs",
											path: "/three/sphereGeometry",
											meta: { isFull: false },
											component: "/three/geometry/SphereGeometry"
										},
										{
											id: 333,
											name: "圆柱体",
											icon: "icon-threejs",
											path: "/three/cylinderGeometry",
											meta: { isFull: false },
											component: "/three/geometry/CylinderGeometry"
										},
										{
											id: 334,
											name: "圆锥体",
											icon: "icon-threejs",
											path: "/three/coneGeometry",
											meta: { isFull: false },
											component: "/three/geometry/ConeGeometry"
										},
										{
											id: 335,
											name: "圆环",
											icon: "icon-threejs",
											path: "/three/torusGeometry",
											meta: { isFull: false },
											component: "/three/geometry/TorusGeometry"
										},
										{
											id: 336,
											name: "环状扭结",
											icon: "icon-threejs",
											path: "/three/torusKnotGeometry",
											meta: { isFull: false },
											component: "/three/geometry/TorusKnotGeometry"
										},
										{
											id: 337,
											name: "多面体",
											icon: "icon-threejs",
											path: "/three/polyhedron",
											meta: { isFull: false },
											component: "/three/geometry/Polyhedron"
										},
										{
											id: 338,
											name: "凸包几何体",
											icon: "icon-threejs",
											path: "/three/convexGeometry",
											meta: { isFull: false },
											component: "/three/geometry/ConvexGeometry"
										},
										{
											id: 339,
											name: "车削缓冲几何体",
											icon: "icon-threejs",
											path: "/three/latheGeometry",
											meta: { isFull: false },
											component: "/three/geometry/LatheGeometry"
										},
										{
											id: 340,
											name: "挤压缓冲几何体",
											icon: "icon-threejs",
											path: "/three/extrudeGeometry",
											meta: { isFull: false },
											component: "/three/geometry/ExtrudeGeometry"
										},
										{
											id: 341,
											name: "管道缓冲几何体",
											icon: "icon-threejs",
											path: "/three/tubeGeometry",
											meta: { isFull: false },
											component: "/three/geometry/TubeGeometry"
										},
										{
											id: 342,
											name: "对象组合",
											icon: "icon-threejs",
											path: "/three/group",
											meta: { isFull: false },
											component: "/three/geometry/Group"
										},
										{
											id: 342,
											name: "合并网络",
											icon: "icon-threejs",
											path: "/three/merge",
											meta: { isFull: false },
											component: "/three/geometry/Merge"
										},
										{
											id: 342,
											name: "JSON",
											icon: "icon-threejs",
											path: "/three/json",
											meta: { isFull: false },
											component: "/three/geometry/Json"
										},
										{
											id: 342,
											name: "检测",
											icon: "icon-threejs",
											path: "/three/detect",
											meta: { isFull: false },
											component: "/three/geometry/Detect"
										}
									]
								},
								{
									id: 343,
									name: "粒子和精灵",
									icon: "icon-threejs",
									path: "/three/particle",
									meta: { isFull: false },
									children: [
										{
											id: 344,
											name: "点精灵材质1",
											icon: "icon-threejs",
											path: "/three/spriteMaterial1",
											meta: { isFull: false },
											component: "/three/particle/SpriteMaterial1"
										},
										{
											id: 344,
											name: "点精灵材质2",
											icon: "icon-threejs",
											path: "/three/spriteMaterial2",
											meta: { isFull: false },
											component: "/three/particle/SpriteMaterial2"
										},
										{
											id: 345,
											name: "点材质1",
											icon: "icon-threejs",
											path: "/three/pointsMaterial1",
											meta: { isFull: false },
											component: "/three/particle/PointsMaterial1"
										},
										{
											id: 345,
											name: "点材质2",
											icon: "icon-threejs",
											path: "/three/pointsMaterial2",
											meta: { isFull: false },
											component: "/three/particle/PointsMaterial2"
										},
										{
											id: 345,
											name: "点材质3",
											icon: "icon-threejs",
											path: "/three/pointsMaterial3",
											meta: { isFull: false },
											component: "/three/particle/PointsMaterial3"
										},
										{
											id: 345,
											name: "点材质4",
											icon: "icon-threejs",
											path: "/three/pointsMaterial4",
											meta: { isFull: false },
											component: "/three/particle/PointsMaterial4"
										},
										{
											id: 345,
											name: "点材质5",
											icon: "icon-threejs",
											path: "/three/pointsMaterial5",
											meta: { isFull: false },
											component: "/three/particle/PointsMaterial5"
										},
										{
											id: 345,
											name: "点材质6",
											icon: "icon-threejs",
											path: "/three/pointsMaterial6",
											meta: { isFull: false },
											component: "/three/particle/PointsMaterial6"
										}
									]
								},
								{
									id: 343,
									name: "贴图",
									icon: "icon-threejs",
									path: "/three/bump",
									meta: { isFull: false },
									children: [
										{
											id: 344,
											name: "凹凸贴图",
											icon: "icon-threejs",
											path: "/three/bump",
											meta: { isFull: false },
											component: "/three/texture/Bump"
										},
										{
											id: 344,
											name: "法向贴图",
											icon: "icon-threejs",
											path: "/three/normal",
											meta: { isFull: false },
											component: "/three/texture/Normal"
										},
										{
											id: 344,
											name: "移位贴图",
											icon: "icon-threejs",
											path: "/three/displacement",
											meta: { isFull: false },
											component: "/three/texture/Displacement"
										},
										{
											id: 344,
											name: "光泽度贴图",
											icon: "icon-threejs",
											path: "/three/setalness",
											meta: { isFull: false },
											component: "/three/texture/Metalness"
										},
										{
											id: 344,
											name: "透明度贴图",
											icon: "icon-threejs",
											path: "/three/alpha",
											meta: { isFull: false },
											component: "/three/texture/Alpha"
										},
										{
											id: 344,
											name: "自发光贴图",
											icon: "icon-threejs",
											path: "/three/emissive",
											meta: { isFull: false },
											component: "/three/texture/Emissive"
										},
										{
											id: 344,
											name: "高光贴图",
											icon: "icon-threejs",
											path: "/three/specular",
											meta: { isFull: false },
											component: "/three/texture/Specular"
										},
										{
											id: 344,
											name: "环境贴图",
											icon: "icon-threejs",
											path: "/three/env",
											meta: { isFull: false },
											component: "/three/texture/Env"
										},
										{
											id: 344,
											name: "贴图",
											icon: "icon-threejs",
											path: "/three/door",
											meta: { isFull: false },
											component: "/three/texture/Door"
										},
										{
											id: 344,
											name: "纹理显示",
											icon: "icon-threejs",
											path: "/three/texture",
											meta: { isFull: false },
											component: "/three/texture/Texture"
										},
										{
											id: 344,
											name: "canvas",
											icon: "icon-threejs",
											path: "/three/canvas",
											meta: { isFull: false },
											component: "/three/texture/Canvas"
										},
										{
											id: 344,
											name: "video",
											icon: "icon-threejs",
											path: "/three/video",
											meta: { isFull: false },
											component: "/three/texture/Video"
										},
										{
											id: 501,
											name: "青联",
											icon: "icon-yidong",
											path: "/three/test",
											meta: { isFull: false },
											component: "/three/geometry/Test"
										}
									]
								},
								{
									id: 343,
									name: "物理",
									icon: "icon-threejs",
									path: "/three/physics",
									meta: { isFull: false },
									children: [
										{
											id: 344,
											name: "小球下落",
											icon: "icon-threejs",
											path: "/three/physics1",
											meta: { isFull: false },
											component: "/three/physics/Physics1"
										},
										{
											id: 344,
											name: "碰撞",
											icon: "icon-threejs",
											path: "/three/physics2",
											meta: { isFull: false },
											component: "/three/physics/Physics2"
										}
									]
								},
								{
									id: 343,
									name: "着色器",
									icon: "icon-threejs",
									path: "/three/webGL",
									meta: { isFull: false },
									children: [
										{
											id: 344,
											name: "WebGL",
											icon: "icon-threejs",
											path: "/three/webGL1",
											meta: { isFull: false },
											component: "/three/shader/WebGL"
										},
										{
											id: 344,
											name: "原始着色器材质",
											icon: "icon-threejs",
											path: "/three/rowShaderMaterial",
											meta: { isFull: false },
											component: "/three/shader/rawShaderMaterial/RawShadermaterial"
										},
										{
											id: 344,
											name: "着色器",
											icon: "icon-threejs",
											path: "/three/deep",
											meta: { isFull: false },
											component: "/three/shader/deep/Deep"
										},
										{
											id: 344,
											name: "孔明灯",
											icon: "icon-threejs",
											path: "/three/flyLight",
											meta: { isFull: false },
											component: "/three/shader/flyLight/FlyLight"
										},
										{
											id: 344,
											name: "水",
											icon: "icon-threejs",
											path: "/three/water",
											meta: { isFull: false },
											component: "/three/shader/water/Water"
										},
										{
											id: 344,
											name: "水2",
											icon: "icon-threejs",
											path: "/three/water2",
											meta: { isFull: false },
											component: "/three/shader/water2/Water2"
										},
										{
											id: 344,
											name: "点",
											icon: "icon-threejs",
											path: "/three/point",
											meta: { isFull: false },
											component: "/three/shader/point/Point"
										},
										{
											id: 344,
											name: "修改Shader",
											icon: "icon-threejs",
											path: "/three/customShader",
											meta: { isFull: false },
											component: "/three/shader/custom/CustomShader"
										},
										{
											id: 344,
											name: "效果合成",
											icon: "icon-threejs",
											path: "/three/effect",
											meta: { isFull: false },
											component: "/three/shader/effect/Effect"
										}
									]
								},
								{
									id: 343,
									name: "CSS",
									icon: "icon-threejs",
									path: "/three/css",
									meta: { isFull: false },
									children: [
										{
											id: 344,
											name: "Moon",
											icon: "icon-threejs",
											path: "/three/moon",
											meta: { isFull: false },
											component: "/three/css/moon/Moon"
										}
									]
								},
								{
									id: 343,
									name: "demo",
									icon: "icon-threejs",
									path: "/three/demo",
									meta: { isFull: false },
									children: [
										{
											id: 344,
											name: "汽车",
											icon: "icon-threejs",
											path: "/three/car",
											meta: { isFull: false },
											component: "/three/demo/car/Car"
										},
										{
											id: 344,
											name: "烟花",
											icon: "icon-threejs",
											path: "/three/fireWork",
											meta: { isFull: false },
											component: "/three/demo/firework/FireWork"
										},
										{
											id: 344,
											name: "导弹轨迹",
											icon: "icon-threejs",
											path: "/three/missile",
											meta: { isFull: false },
											component: "/three/demo/missile/Missile"
										},
										{
											id: 344,
											name: "地球",
											icon: "icon-threejs",
											path: "/three/earch",
											meta: { isFull: false },
											component: "/three/demo/earch/Earch"
										},
										{
											id: 344,
											name: "机器人",
											icon: "icon-threejs",
											path: "/three/robot",
											meta: { isFull: false },
											component: "/three/demo/robot/Robot"
										},
										{
											id: 401,
											name: "智慧城市",
											icon: "icon-threejs",
											path: "/open/smartCity",
											meta: { isFull: false },
											component: "/open/smartCity/SmartCity"
										},
										{
											id: 401,
											name: "智慧城市2",
											icon: "icon-threejs",
											path: "/open/smartCity2",
											meta: { isFull: false },
											component: "/open/smartCity2/HomeView"
										},
										{
											id: 402,
											name: "智慧园区",
											icon: "icon-threejs",
											path: "/open/smartPark",
											meta: { isFull: false },
											component: "/open/smartPark/SmartPark"
										},
										{
											id: 402,
											name: "日夜交替",
											icon: "icon-threejs",
											path: "/open/hotel",
											meta: { isFull: false },
											component: "/open/hotel/Hotel"
										},
										{
											id: 344,
											name: "智慧工厂",
											icon: "icon-threejs",
											path: "/open/smartFactory",
											meta: { isFull: false },
											component: "/open/smartFactory/SmartFactory"
										},
										{
											id: 344,
											name: "全景看房",
											icon: "icon-threejs",
											path: "/open/homeViewing",
											meta: { isFull: false },
											component: "/three/demo/houseViewing/HomeViewing"
										},
										{
											id: 344,
											name: "3D地图",
											icon: "icon-threejs",
											path: "/open/map",
											meta: { isFull: false },
											component: "/open/map/Map"
										},
										{
											id: 344,
											name: "3D官网",
											icon: "icon-threejs",
											path: "/open/website",
											meta: { isFull: false },
											component: "/open/website/Website"
										},
										{
											id: 344,
											name: "飞机",
											icon: "icon-threejs",
											path: "/open/plane",
											meta: { isFull: false },
											component: "/open/plane/Plane"
										},
										{
											id: 344,
											name: "轮廓",
											icon: "icon-threejs",
											path: "/open/click",
											meta: { isFull: false },
											component: "/open/click/Click"
										}
									]
								}
							]
						},
						{
							id: 400,
							name: "功能",
							icon: "icon-dangedemoban",
							path: "/function",
							meta: { isFull: false },
							children: [
								{
									id: 403,
									name: "穿梭框",
									icon: "icon-chuansuokuang",
									path: "/function/transfer",
									meta: { isFull: false },
									component: "/function/transfer/Transfer"
								},
								{
									id: 403,
									name: "数字",
									icon: "icon-number",
									path: "/function/number",
									meta: { isFull: false },
									component: "/function/number/Number"
								},
								{
									id: 404,
									name: "引导页",
									icon: "icon-xinshouyindao",
									path: "/function/driver",
									meta: { isFull: false },
									component: "/function/driver/Driver"
								},
								{
									id: 405,
									name: "富文本编辑器",
									icon: "icon-fuwenbenbianjiqi",
									path: "/function/richText",
									meta: { isFull: false },
									component: "/function/richText/RichText"
								},
								{
									id: 406,
									name: "拖拽组件",
									icon: "icon-rili",
									path: "/function/drag",
									meta: { isFull: false },
									component: "/function/drag/Draggable"
								},
								{
									id: 407,
									name: "内嵌页面",
									icon: "icon-beijingtupian",
									path: "/function/embedded",
									meta: { isFull: false },
									component: "/function/embedded/index"
								},
								{
									id: 407,
									name: "复制指令",
									icon: "icon-beijingtupian",
									path: "/function/copyDirect",
									meta: { isFull: false },
									component: "/function/copyDirect/index"
								},
								{
									id: 407,
									name: "水印指令",
									icon: "icon-beijingtupian",
									path: "/function/waterMark",
									meta: { isFull: false },
									component: "/function/waterMarkDirect/index"
								},
								{
									id: 407,
									name: "拖拽指令",
									icon: "icon-beijingtupian",
									path: "/function/dragDirect",
									meta: { isFull: false },
									component: "/function/dragDirect/index"
								},
								{
									id: 407,
									name: "长按指令",
									icon: "icon-beijingtupian",
									path: "/function/longPress",
									meta: { isFull: false },
									component: "/function/longPressDirect/index"
								},
								{
									id: 407,
									name: "节流指令",
									icon: "icon-beijingtupian",
									path: "/function/throttle",
									meta: { isFull: false },
									component: "/function/throttle/index"
								},
								{
									id: 407,
									name: "防抖指令",
									icon: "icon-beijingtupian",
									path: "/function/debounce",
									meta: { isFull: false },
									component: "/function/debounce/index"
								},
								{
									id: 407,
									name: "图片预览",
									icon: "icon-beijingtupian",
									path: "/function/imageView",
									meta: { isFull: false },
									component: "/function/imageView/ImageView"
								}
							]
						},
						{
							id: 344,
							name: "游戏",
							icon: "icon-threejs",
							path: "/game",
							meta: { isFull: false },
							children: [
								{
									id: 401,
									name: "菜了个菜",
									icon: "icon-choujiang",
									path: "/game/sheep",
									meta: { isFull: false },
									component: "/game/sheep/Sheep"
								},
								{
									id: 401,
									name: "跳一跳",
									icon: "icon-choujiang",
									path: "/game/jump",
									meta: { isFull: false },
									component: "/game/jump/Jump"
								},
								{
									id: 401,
									name: "扫雷",
									icon: "icon-choujiang",
									path: "/game/minesweeper",
									meta: { isFull: false },
									component: "/game/minesweeper/Minesweeper"
								}
							]
						},
						{
							id: 400,
							name: "Canvas",
							icon: "icon-dangedemoban",
							path: "/canvas",
							meta: { isFull: false },
							children: [
								{
									id: 401,
									name: "Canvas1",
									icon: "icon-choujiang",
									path: "/canvas/canvas1",
									meta: { isFull: false },
									component: "/canvas/Canvas1"
								},
								{
									id: 401,
									name: "抽奖",
									icon: "icon-choujiang",
									path: "/canvas/canvas2",
									meta: { isFull: false },
									component: "/canvas/Canvas2"
								},
								{
									id: 401,
									name: "画板",
									icon: "icon-choujiang",
									path: "/canvas/canvas3",
									meta: { isFull: false },
									component: "/canvas/Canvas3"
								},
								{
									id: 401,
									name: "时钟",
									icon: "icon-choujiang",
									path: "/canvas/canvas4",
									meta: { isFull: false },
									component: "/canvas/Canvas4"
								},
								{
									id: 401,
									name: "碰撞",
									icon: "icon-choujiang",
									path: "/canvas/canvas5",
									meta: { isFull: false },
									component: "/canvas/Canvas5"
								}
							]
						},
						{
							id: 400,
							name: "Echarts",
							icon: "icon-dangedemoban",
							path: "/echarts",
							meta: { isFull: false },
							children: [
								{
									id: 343,
									name: "饼图",
									icon: "icon-threejs",
									path: "/echarts/pie",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "饼图1",
											icon: "icon-choujiang",
											path: "/echarts/pie1",
											meta: { isFull: false },
											component: "/echarts/pie/Pie1"
										},
										{
											id: 401,
											name: "饼图2",
											icon: "icon-choujiang",
											path: "/echarts/pie2",
											meta: { isFull: false },
											component: "/echarts/pie/Pie2"
										},
										{
											id: 401,
											name: "饼图3",
											icon: "icon-choujiang",
											path: "/echarts/pie3",
											meta: { isFull: false },
											component: "/echarts/pie/Pie3"
										}
									]
								},
								{
									id: 343,
									name: "仪表盘",
									icon: "icon-threejs",
									path: "/echarts/gauge",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "仪表盘1",
											icon: "icon-choujiang",
											path: "/echarts/gauge1",
											meta: { isFull: false },
											component: "/echarts/gauge/Gauge1"
										},
										{
											id: 401,
											name: "仪表盘2",
											icon: "icon-choujiang",
											path: "/echarts/gauge2",
											meta: { isFull: false },
											component: "/echarts/gauge/Gauge2"
										},
										{
											id: 401,
											name: "仪表盘3",
											icon: "icon-choujiang",
											path: "/echarts/guage3",
											meta: { isFull: false },
											component: "/echarts/gauge/Gauge3"
										},
										{
											id: 401,
											name: "仪表盘4",
											icon: "icon-choujiang",
											path: "/echarts/guage4",
											meta: { isFull: false },
											component: "/echarts/gauge/Gauge4"
										},
										{
											id: 401,
											name: "仪表盘5",
											icon: "icon-choujiang",
											path: "/echarts/guage5",
											meta: { isFull: false },
											component: "/echarts/gauge/Gauge5"
										},
										{
											id: 401,
											name: "仪表盘6",
											icon: "icon-choujiang",
											path: "/echarts/guage6",
											meta: { isFull: false },
											component: "/echarts/gauge/Gauge6"
										}
									]
								},
								{
									id: 343,
									name: "柱形图",
									icon: "icon-threejs",
									path: "/echarts/bar",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "柱形图1",
											icon: "icon-choujiang",
											path: "/echarts/bar1",
											meta: { isFull: false },
											component: "/echarts/bar/Bar1"
										},
										{
											id: 401,
											name: "柱形图2",
											icon: "icon-choujiang",
											path: "/echarts/bar2",
											meta: { isFull: false },
											component: "/echarts/bar/Bar2"
										},
										{
											id: 401,
											name: "柱形图3",
											icon: "icon-choujiang",
											path: "/echarts/bar3",
											meta: { isFull: false },
											component: "/echarts/bar/Bar3"
										},
										{
											id: 401,
											name: "柱形图4",
											icon: "icon-choujiang",
											path: "/echarts/bar4",
											meta: { isFull: false },
											component: "/echarts/bar/Bar4"
										},
										{
											id: 401,
											name: "柱形图5",
											icon: "icon-choujiang",
											path: "/echarts/bar5",
											meta: { isFull: false },
											component: "/echarts/bar/Bar5"
										},
										{
											id: 401,
											name: "柱形图6",
											icon: "icon-choujiang",
											path: "/echarts/bar6",
											meta: { isFull: false },
											component: "/echarts/bar/Bar6"
										},
										{
											id: 401,
											name: "柱形图7",
											icon: "icon-choujiang",
											path: "/echarts/bar7",
											meta: { isFull: false },
											component: "/echarts/bar/Bar7"
										},
										{
											id: 401,
											name: "柱形图8",
											icon: "icon-choujiang",
											path: "/echarts/bar8",
											meta: { isFull: false },
											component: "/echarts/bar/Bar8"
										},
										{
											id: 401,
											name: "柱形图9",
											icon: "icon-choujiang",
											path: "/echarts/bar9",
											meta: { isFull: false },
											component: "/echarts/bar/Bar9"
										}
									]
								},
								{
									id: 343,
									name: "折线图",
									icon: "icon-threejs",
									path: "/echarts/line",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "折线图1",
											icon: "icon-choujiang",
											path: "/echarts/line1",
											meta: { isFull: false },
											component: "/echarts/line/Line1"
										},
										{
											id: 401,
											name: "折线图2",
											icon: "icon-choujiang",
											path: "/echarts/line2",
											meta: { isFull: false },
											component: "/echarts/line/Line2"
										},
										{
											id: 401,
											name: "折线图3",
											icon: "icon-choujiang",
											path: "/echarts/line3",
											meta: { isFull: false },
											component: "/echarts/line/Line3"
										}
									]
								},
								{
									id: 343,
									name: "树图",
									icon: "icon-threejs",
									path: "/echarts/tree",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "树图1",
											icon: "icon-choujiang",
											path: "/echarts/tree1",
											meta: { isFull: false },
											component: "/echarts/tree/Tree1"
										},
										{
											id: 401,
											name: "树图2",
											icon: "icon-choujiang",
											path: "/echarts/tree2",
											meta: { isFull: false },
											component: "/echarts/tree/Tree2"
										}
									]
								},
								{
									id: 343,
									name: "散点图",
									icon: "icon-threejs",
									path: "/echarts/scatter",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "散点图1",
											icon: "icon-choujiang",
											path: "/echarts/scatter1",
											meta: { isFull: false },
											component: "/echarts/scatter/Scatter1"
										}
									]
								},
								{
									id: 343,
									name: "地图",
									icon: "icon-threejs",
									path: "/echarts/map",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "地图1",
											icon: "icon-choujiang",
											path: "/echarts/map1",
											meta: { isFull: false },
											component: "/echarts/map/Map1"
										},
										{
											id: 401,
											name: "地图2",
											icon: "icon-choujiang",
											path: "/echarts/map2",
											meta: { isFull: false },
											component: "/echarts/map/Map2"
										},
										{
											id: 401,
											name: "地图3",
											icon: "icon-choujiang",
											path: "/echarts/map3",
											meta: { isFull: false },
											component: "/echarts/map/Map3"
										},
										{
											id: 401,
											name: "地图4",
											icon: "icon-choujiang",
											path: "/echarts/map4",
											meta: { isFull: false },
											component: "/echarts/map/Map4"
										}
									]
								},
								{
									id: 343,
									name: "关系图",
									icon: "icon-threejs",
									path: "/echarts/graph",
									meta: { isFull: false },
									children: [
										{
											id: 401,
											name: "关系图1",
											icon: "icon-choujiang",
											path: "/echarts/graph1",
											meta: { isFull: false },
											component: "/echarts/graph/Graph1"
										}
									]
								}
							]
						},
						{
							id: 344,
							name: "Cesium",
							icon: "icon-threejs",
							path: "/cesium/cesium",
							meta: { isFull: false },
							children: [
								{
									id: 401,
									name: "cesium",
									icon: "icon-choujiang",
									path: "/cesium/cesium1",
									meta: { isFull: false },
									component: "/cesium/init/Cesium"
								}
							]
						},
						{
							id: 501,
							name: "工作台",
							icon: "icon-yidong",
							path: "/work",
							meta: { isFull: false },
							children: [
								{
									id: 401,
									name: "工作台",
									icon: "icon-yidong",
									path: "/work/index",
									meta: { isFull: false },
									component: "/work/index"
								},
								{
									id: 401,
									name: "文字识别",
									icon: "icon-yidong",
									path: "/work/characterRecognition",
									meta: { isFull: false },
									component: "/work/function/characterRecognition/CharacterRecognition"
								}
							]
						},
						{
							id: 501,
							name: "拖拽",
							icon: "icon-yidong",
							path: "/open/editor1",
							meta: { isFull: false },
							component: "/open/edit/index"
						}
						// {
						//     id: 400,
						//     name: '唱歌排名',
						//     icon: 'icon-dangedemoban',
						//     path: '/open',
						//     children: [
						//         {
						//             id: 401,
						//             name: '分数管理',
						//             icon: 'icon-choujiang',
						//             path: '/open/rankedList'
						//         },
						//         {
						//             id: 402,
						//             name: '分数排名',
						//             icon: 'icon-rili',
						//             path: '/open/rankedManage'
						//         }
						//     ]
						// }
					],
					total: 100
				}
			}
		}
	}
]
