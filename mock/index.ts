import mockjs, { Random } from "mockjs"
import { IResponseData } from "@/api/interface/type"
import { ILoginParams, ILoginData, IRegisterParams, IRegisterData, IUserListData } from "@/api/system/userApi"

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
					"list|100": [
						{
							id: "@id",
							name: "@cname",
							age: "@integer( 18, 60)",
							sex: "@integer( 0, 1)",
							phone: "@phone",
							email: "@email",
							city: "@county(true)",
							status: "@integer( 0, 1)",
							type: "@integer( 0, 2)",
							img: Random.image("200x100"),
							addTime: "@datetime",
							editTime: "@datetime"
						}
					]
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
						token: "@guid"
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
					id: "@id",
					name: "@cname",
					age: "@integer( 18, 60)",
					sex: "@integer( 0, 1)",
					phone: "@phone",
					email: "@email",
					city: "@county(true)",
					status: "@integer( 0, 1)",
					type: "@integer( 0, 2)",
					img: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
					addTime: "@datetime",
					editTime: "@datetime"
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
							path: "/map",
							name: "map",
							redirect: "/map/aMapStatus",
							meta: {
								title: "高德地图",
								icon: "icon-ditu",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/map/aMapStatus",
									name: "aMapStatus",
									component: "/map/AMapStatus",
									meta: {
										title: "地图状态",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/map/mapChange",
									name: "mapChange",
									component: "/map/leaflet/MapChange",
									meta: {
										title: "地图切换",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/map/type",
									name: "type",
									redirect: "/map/aMapAdministrative",
									meta: {
										title: "类型",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/aMapAdministrative",
											name: "aMapAdministrative",
											component: "/map/mapType/AMapAdministrative",
											meta: {
												title: "简易行政区",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapArea",
											name: "aMapArea",
											component: "/map/mapType/AMapArea",
											meta: {
												title: "世界地图",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapAreaMask",
											name: "aMapAreaMask",
											component: "/map/mapType/AMapAreaMask",
											meta: {
												title: "区域掩模",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/map/event",
									name: "event",
									redirect: "/map/aMapEvent",
									meta: {
										title: "事件",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/aMapEvent",
											name: "aMapEvent",
											component: "/map/mapEvent/AMapEvent",
											meta: {
												title: "地图事件",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapCoverEvent",
											name: "aMapCoverEvent",
											component: "/map/mapEvent/AMapCoverEvent",
											meta: {
												title: "覆盖物事件",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/map/Marker",
									name: "Marker",
									redirect: "/map/aMapMarker",
									meta: {
										title: "覆盖物",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/aMapMarker",
											name: "aMapMarker",
											component: "/map/mapCover/AMapMarker",
											meta: {
												title: "点标记",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapTrackPlayback",
											name: "aMapTrackPlayback",
											component: "/map/mapCover/AMapTrackPlayback",
											meta: {
												title: "轨迹回放",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapAvoidLayers",
											name: "aMapAvoidLayers",
											component: "/map/mapCover/AMapAvoidLayers",
											meta: {
												title: "避让标注图层",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapTextMarker",
											name: "aMapTextMarker",
											component: "/map/mapCover/AMapTextMarker",
											meta: {
												title: "文字标注",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapMassPointMarkers",
											name: "aMapMassPointMarkers",
											component: "/map/mapCover/AMapMassPointMarkers",
											meta: {
												title: "海量点",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapMassMarkers",
											name: "aMapMassMarkers",
											component: "/map/mapCover/AMapMassMarkers",
											meta: {
												title: "海量点2",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapPointAggregation",
											name: "aMapPointAggregation",
											component: "/map/mapCover/AMapPointAggregation",
											meta: {
												title: "聚合",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapPointAggregation2",
											name: "aMapPointAggregation2",
											component: "/map/mapCover/AMapPointAggregation2",
											meta: {
												title: "按索引聚合",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapVectorGraphics",
											name: "aMapVectorGraphics",
											component: "/map/mapCover/AMapVectorGraphics",
											meta: {
												title: "矢量图形",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapMenu",
											name: "aMapMenu",
											component: "/map/mapCover/AMapMenu",
											meta: {
												title: "右键菜单",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapInfoWindow",
											name: "aMapInfoWindow",
											component: "/map/mapCover/AMapInfoWindow",
											meta: {
												title: "信息窗体",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/map/InputHint",
									name: "InputHint",
									redirect: "/map/aMapInputHint",
									meta: {
										title: "搜索服务",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/aMapInputHint",
											name: "aMapInputHint",
											component: "/map/mapSearch/AMapInputHint",
											meta: {
												title: "输入提示",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/map/Planning",
									name: "Planning",
									redirect: "/map/aMapPlanning",
									meta: {
										title: "路线规划",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/aMapPlanning",
											name: "aMapPlanning",
											component: "/map/mapPlanning/AMapPlanning",
											meta: {
												title: "驾车路线规划",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapDragPlanning",
											name: "aMapDragPlanning",
											component: "/map/mapPlanning/AMapDragPlanning",
											meta: {
												title: "拖拽路线规划",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/map/Geocoding",
									name: "Geocoding",
									redirect: "/map/aMapPlanning",
									meta: {
										title: "其他",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/aMapGeocoding",
											name: "aMapGeocoding",
											component: "/map/mapOther/AMapGeocoding",
											meta: {
												title: "地理编码",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapAdministrativeArea",
											name: "aMapAdministrativeArea",
											component: "/map/mapOther/AMapAdministrativeArea",
											meta: {
												title: "行政区查询",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapLocation",
											name: "aMapLocation",
											component: "/map/mapOther/AMapLocation",
											meta: {
												title: "定位",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapWeather",
											name: "aMapWeather",
											component: "/map/mapOther/AMapWeather",
											meta: {
												title: "天气",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/map/aMapCalculate",
									name: "aMapCalculate",
									redirect: "/map/aMapPointCalculate",
									meta: {
										title: "计算",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/aMapPointCalculate",
											name: "aMapPointCalculate",
											component: "/map/mapCalculate/AMapPointCalculate",
											meta: {
												title: "两点间距离",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapLineCalculate",
											name: "aMapLineCalculate",
											component: "/map/mapCalculate/AMapLineCalculate",
											meta: {
												title: "点到直线的距离",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapPathLength",
											name: "aMapPathLength",
											component: "/map/mapCalculate/AMapPathLength",
											meta: {
												title: "折线长度",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapAreaNum",
											name: "aMapAreaNum",
											component: "/map/mapCalculate/AMapArea",
											meta: {
												title: "面积",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapIsOnLine",
											name: "aMapIsOnLine",
											component: "/map/mapCalculate/AMapIsOnLine",
											meta: {
												title: "点是否在线上",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapIsOnPolygon",
											name: "aMapIsOnPolygon",
											component: "/map/mapCalculate/AMapIsOnPolygon",
											meta: {
												title: "点是否在多边形内",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/aMapGeometricRelationship",
											name: "aMapGeometricRelationship",
											component: "/map/mapCalculate/AMapGeometricRelationship",
											meta: {
												title: "几何关系",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/map/cellular",
									name: "cellular",
									redirect: "/map/cellularHeatmap",
									meta: {
										title: "可视化",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/map/cellularHeatmap",
											name: "cellularHeatmap",
											component: "/map/mapVisualization/CellularHeatmap",
											meta: {
												title: "蜂窝热力图",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/gridHeatmap",
											name: "gridHeatmap",
											component: "/map/mapVisualization/GridHeatmap",
											meta: {
												title: "网格热力图",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/heatmap",
											name: "heatmap",
											component: "/map/mapVisualization/Heatmap",
											meta: {
												title: "热力图",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/pulseLine",
											name: "pulseLine",
											component: "/map/mapVisualization/PulseLine",
											meta: {
												title: "脉冲线",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/flyingLine",
											name: "flyingLine",
											component: "/map/mapVisualization/FlyingLine",
											meta: {
												title: "飞线",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/connectingLine",
											name: "connectingLine",
											component: "/map/mapVisualization/ConnectingLine",
											meta: {
												title: "连接线",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/lineLayer",
											name: "lineLayer",
											component: "/map/mapVisualization/LineLayer",
											meta: {
												title: "线图层",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/iconLayer",
											name: "iconLayer",
											component: "/map/mapVisualization/IconLayer",
											meta: {
												title: "图标图层",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/postLocation",
											name: "postLocation",
											component: "/map/mapVisualization/PostLocation",
											meta: {
												title: "贴地点",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/prismLayer",
											name: "prismLayer",
											component: "/map/mapVisualization/PrismLayer",
											meta: {
												title: "棱柱图层",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/dotLayer",
											name: "dotLayer",
											component: "/map/mapVisualization/DotLayer",
											meta: {
												title: "圆点图层",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/map/signagePoint",
											name: "signagePoint",
											component: "/map/mapVisualization/SignagePoint",
											meta: {
												title: "标牌点",
												icon: "icon-locus",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								}
							]
						},
						{
							path: "/system",
							name: "system",
							redirect: "/system/user",
							meta: {
								title: "系统管理",
								icon: "icon-setting",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/system/user",
									name: "user",
									component: "/system/user/User",
									meta: {
										title: "用户管理",
										icon: "icon-yonghu",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/system/menu",
									name: "menu",
									component: "/system/menu/Menu",
									meta: {
										title: "菜单管理",
										icon: "icon-caidan",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								}
							]
						},
						{
							path: "/style",
							name: "style",
							redirect: "/style/navigation1",
							meta: {
								title: "样式",
								icon: "icon-dangedemoban",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/style/navigation",
									name: "navigation",
									redirect: "/style/navigation1",
									meta: {
										title: "导航栏",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/style/navigation1",
											name: "navigation1",
											component: "/style/navigation/Navigation1",
											meta: {
												title: "导航栏1",
												icon: "icon-mulu",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/navigation2",
											name: "navigation2",
											component: "/style/navigation/Navigation2",
											meta: {
												title: "导航栏2",
												icon: "icon-mulu",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/navigation3",
											name: "navigation3",
											component: "/style/navigation/Navigation3",
											meta: {
												title: "导航栏3",
												icon: "icon-mulu",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/style/card",
									name: "card",
									redirect: "/style/card1",
									meta: {
										title: "卡片",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/style/card1",
											name: "card1",
											component: "/style/card/Card1",
											meta: {
												title: "卡片1",
												icon: "icon-kapian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/card2",
											name: "card2",
											component: "/style/card/Card2",
											meta: {
												title: "卡片2",
												icon: "icon-kapian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/card3",
											name: "card3",
											component: "/style/card/Card3",
											meta: {
												title: "卡片3",
												icon: "icon-kapian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/card4",
											name: "card4",
											component: "/style/card/Card4",
											meta: {
												title: "卡片4",
												icon: "icon-kapian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/card5",
											name: "card5",
											component: "/style/card/Card5",
											meta: {
												title: "卡片5",
												icon: "icon-kapian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/card6",
											name: "card6",
											component: "/style/card/Card6",
											meta: {
												title: "卡片6",
												icon: "icon-kapian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/style/button",
									name: "button",
									redirect: "/style/card1",
									meta: {
										title: "按钮",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/style/button1",
											name: "button1",
											component: "/style/button/Button1",
											meta: {
												title: "按钮1",
												icon: "icon-anniu",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/button2",
											name: "button2",
											component: "/style/button/Button2",
											meta: {
												title: "按钮2",
												icon: "icon-anniu",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/style/loading",
									name: "loading",
									redirect: "/style/loading1",
									meta: {
										title: "加载图标",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/style/loading1",
											name: "loading1",
											component: "/style/loading/Loading1",
											meta: {
												title: "加载图标1",
												icon: "icon-loading",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/loading2",
											name: "loading2",
											component: "/style/loading/Loading2",
											meta: {
												title: "加载图标2",
												icon: "icon-loading",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/style/input",
									name: "input",
									redirect: "/style/input1",
									meta: {
										title: "输入框",
										icon: "icon-locus",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/style/input1",
											name: "input1",
											component: "/style/input/Input1",
											meta: {
												title: "动态输入框",
												icon: "icon-beijingtupian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/style/input2",
											name: "input2",
											component: "/style/input/Input2",
											meta: {
												title: "打字特效",
												icon: "icon-beijingtupian",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/style/gradient",
									name: "gradient",
									component: "/style/gradient/Gradient",
									meta: {
										title: "背景渐变",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/three",
							name: "three",
							redirect: "/three/baseScene",
							meta: {
								title: "threejs",
								icon: "icon-threejs",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/three/base",
									name: "threeBase",
									redirect: "/three/baseScene",
									meta: {
										title: "基础",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/baseScene",
											name: "baseScene",
											component: "/three/gettingStarted/Base",
											meta: {
												title: "第一个场景",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/shadow",
											name: "shadow",
											component: "/three/gettingStarted/Shadow",
											meta: {
												title: "阴影",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/sport",
											name: "sport",
											component: "/three/gettingStarted/Sport",
											meta: {
												title: "运动",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/scene",
									name: "scene",
									redirect: "/three/scene1",
									meta: {
										title: "基本组件",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/scene1",
											name: "scene1",
											component: "/three/basicComponents/Scene",
											meta: {
												title: "场景",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/light",
									name: "light",
									redirect: "/three/ambientLight",
									meta: {
										title: "光源",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/ambientLight",
											name: "ambientLight",
											component: "/three/light/AmbientLight",
											meta: {
												title: "环境光",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/spotLight",
											name: "spotLight",
											component: "/three/light/SpotLight",
											meta: {
												title: "聚光灯光源",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/pointLight",
											name: "pointLight",
											component: "/three/light/PointLight",
											meta: {
												title: "点光源",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/directionLight",
											name: "directionLight",
											component: "/three/light/DirectionalLight",
											meta: {
												title: "平行光",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/hemisphereLight",
											name: "hemisphereLight",
											component: "/three/light/HemisphereLight",
											meta: {
												title: "半球光",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/lensFlare",
											name: "lensFlare",
											component: "/three/light/LensFlare",
											meta: {
												title: "光晕",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/mesh",
									name: "mesh",
									redirect: "/three/meshBasicMaterial",
									meta: {
										title: "材质",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/meshBasicMaterial",
											name: "meshBasicMaterial",
											component: "/three/material/MeshBasicMaterial",
											meta: {
												title: "网格基础材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshDepthMaterial",
											name: "meshDepthMaterial",
											component: "/three/material/MeshDepthMaterial",
											meta: {
												title: "网格深度材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/multiMaterialObject",
											name: "multiMaterialObject",
											component: "/three/material/MultiMaterialObject",
											meta: {
												title: "联合材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshNormalMaterial",
											name: "meshNormalMaterial",
											component: "/three/material/MeshNormalMaterial",
											meta: {
												title: "网格法向材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshFaceMaterial",
											name: "",
											component: "/three/material/MeshFaceMaterial",
											meta: {
												title: "使用不同材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshLambertMaterial",
											name: "",
											component: "/three/material/MeshLambertMaterial",
											meta: {
												title: "网格Lambert材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshPhongMaterial",
											name: "meshPhongMaterial",
											component: "/three/material/MeshPhongMaterial",
											meta: {
												title: "网格Phong材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshStandardMaterial",
											name: "meshStandardMaterial",
											component: "/three/material/MeshStandardMaterial",
											meta: {
												title: "网格标准材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshPhysicalMaterial",
											name: "meshPhysicalMaterial",
											component: "/three/material/MeshPhysicalMaterial",
											meta: {
												title: "网格物理材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/meshPhysicalMaterial2",
											name: "meshPhysicalMaterial2",
											component: "/three/material/MeshPhysicalMaterial2",
											meta: {
												title: "网格物理材质2",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/lineBasicMaterial",
											name: "lineBasicMaterial",
											component: "/three/material/LineBasicMaterial",
											meta: {
												title: "直线基础材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/lineDashedMaterial",
											name: "lineDashedMaterial",
											component: "/three/material/LineDashedMaterial",
											meta: {
												title: "虚线材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/geometry",
									name: "geometry",
									redirect: "/three/bufferGeometry",
									meta: {
										title: "几何体",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/bufferGeometry",
											name: "bufferGeometry",
											component: "/three/geometry/BufferGeometry",
											meta: {
												title: "几何体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/triangle",
											name: "triangle",
											component: "/three/geometry/Triangle",
											meta: {
												title: "三角形",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/planeGeometry",
											name: "",
											component: "/three/geometry/PlaneGeometry",
											meta: {
												title: "平面",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/circleGeometry",
											name: "circleGeometry",
											component: "/three/geometry/CircleGeometry",
											meta: {
												title: "圆形",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/ringGeometry",
											name: "ringGeometry",
											component: "/three/geometry/RingGeometry",
											meta: {
												title: "环形",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/shapeGeometry",
											name: "shapeGeometry",
											component: "/three/geometry/ShapeGeometry",
											meta: {
												title: "任意图形",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/boxGeometry",
											name: "boxGeometry",
											component: "/three/geometry/BoxGeometry",
											meta: {
												title: "长方体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/sphereGeometry",
											name: "sphereGeometry",
											component: "/three/geometry/SphereGeometry",
											meta: {
												title: "球体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/cylinderGeometry",
											name: "cylinderGeometry",
											component: "/three/geometry/CylinderGeometry",
											meta: {
												title: "圆柱体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/coneGeometry",
											name: "coneGeometry",
											component: "/three/geometry/ConeGeometry",
											meta: {
												title: "圆锥体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/torusGeometry",
											name: "torusGeometry",
											component: "/three/geometry/TorusGeometry",
											meta: {
												title: "圆环",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/torusKnotGeometry",
											name: "torusKnotGeometry",
											component: "/three/geometry/TorusKnotGeometry",
											meta: {
												title: "环状扭结",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/polyhedron",
											name: "polyhedron",
											component: "/three/geometry/Polyhedron",
											meta: {
												title: "多面体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/convexGeometry",
											name: "convexGeometry",
											component: "/three/geometry/ConvexGeometry",
											meta: {
												title: "凸包几何体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/latheGeometry",
											name: "latheGeometry",
											component: "/three/geometry/LatheGeometry",
											meta: {
												title: "车削缓冲几何体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/extrudeGeometry",
											name: "extrudeGeometry",
											component: "/three/geometry/ExtrudeGeometry",
											meta: {
												title: "挤压缓冲几何体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/tubeGeometry",
											name: "tubeGeometry",
											component: "/three/geometry/TubeGeometry",
											meta: {
												title: "管道缓冲几何体",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/group",
											name: "group",
											component: "/three/geometry/Group",
											meta: {
												title: "对象组合",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/merge",
											name: "merge",
											component: "/three/geometry/Merge",
											meta: {
												title: "合并网络",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/json",
											name: "json",
											component: "/three/geometry/Json",
											meta: {
												title: "JSON",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/detect",
											name: "detect",
											component: "/three/geometry/Detect",
											meta: {
												title: "检测",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/particle",
									name: "particle",
									redirect: "/three/spriteMaterial1",
									meta: {
										title: "粒子和精灵",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/spriteMaterial1",
											name: "spriteMaterial1",
											component: "/three/particle/SpriteMaterial1",
											meta: {
												title: "点精灵材质1",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/spriteMaterial2",
											name: "spriteMaterial2",
											component: "/three/particle/SpriteMaterial2",
											meta: {
												title: "点精灵材质2",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/pointsMaterial1",
											name: "pointsMaterial1",
											component: "/three/particle/PointsMaterial1",
											meta: {
												title: "点材质1",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/pointsMaterial2",
											name: "pointsMaterial2",
											component: "/three/particle/PointsMaterial2",
											meta: {
												title: "点材质2",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/pointsMaterial3",
											name: "pointsMaterial3",
											component: "/three/particle/PointsMaterial3",
											meta: {
												title: "点材质3",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/pointsMaterial4",
											name: "pointsMaterial4",
											component: "/three/particle/PointsMaterial4",
											meta: {
												title: "点材质4",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/pointsMaterial5",
											name: "pointsMaterial5",
											component: "/three/particle/PointsMaterial5",
											meta: {
												title: "点材质5",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/pointsMaterial6",
											name: "pointsMaterial6",
											component: "/three/particle/PointsMaterial6",
											meta: {
												title: "点材质6",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/bump",
									name: "bump1",
									redirect: "/three/bump1",
									meta: {
										title: "贴图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/bump1",
											name: "bump",
											component: "/three/texture/Bump",
											meta: {
												title: "凹凸贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/normal",
											name: "normal",
											component: "/three/texture/Normal",
											meta: {
												title: "法向贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/displacement",
											name: "displacement",
											component: "/three/texture/Displacement",
											meta: {
												title: "移位贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/setalness",
											name: "setalness",
											component: "/three/texture/Metalness",
											meta: {
												title: "光泽度贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/alpha",
											name: "alpha",
											component: "/three/texture/Alpha",
											meta: {
												title: "透明度贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/emissive",
											name: "emissive",
											component: "/three/texture/Emissive",
											meta: {
												title: "自发光贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/specular",
											name: "specular",
											component: "/three/texture/Specular",
											meta: {
												title: "高光贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/env",
											name: "env",
											component: "/three/texture/Env",
											meta: {
												title: "环境贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/door",
											name: "door",
											component: "/three/texture/Door",
											meta: {
												title: "贴图",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/texture",
											name: "texture",
											component: "/three/texture/Texture",
											meta: {
												title: "纹理显示",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/canvas",
											name: "canvas",
											component: "/three/texture/Canvas",
											meta: {
												title: "canvas",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/video",
											name: "video",
											component: "/three/texture/Video",
											meta: {
												title: "video",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/test",
											name: "test",
											component: "/three/geometry/Test",
											meta: {
												title: "青联",
												icon: "icon-yidong",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/physics",
									name: "physics",
									redirect: "/three/physics1",
									meta: {
										title: "物理",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/physics1",
											name: "physics1",
											component: "/three/physics/Physics1",
											meta: {
												title: "小球下落",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/physics2",
											name: "physics2",
											component: "/three/physics/Physics2",
											meta: {
												title: "碰撞",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/webGL",
									name: "webGL",
									redirect: "/three/webGL1",
									meta: {
										title: "着色器",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/webGL1",
											name: "webGL1",
											component: "/three/shader/WebGL",
											meta: {
												title: "WebGL",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/rowShaderMaterial",
											name: "rowShaderMaterial",
											component: "/three/shader/rawShaderMaterial/RawShadermaterial",
											meta: {
												title: "原始着色器材质",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/deep",
											name: "deep",
											component: "/three/shader/deep/Deep",
											meta: {
												title: "着色器",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/flyLight",
											name: "flyLight",
											component: "/three/shader/flyLight/FlyLight",
											meta: {
												title: "孔明灯",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/water",
											name: "water",
											component: "/three/shader/water/Water",
											meta: {
												title: "水",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/water2",
											name: "water2",
											component: "/three/shader/water2/Water2",
											meta: {
												title: "水2",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/point",
											name: "point",
											component: "/three/shader/point/Point",
											meta: {
												title: "点",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/customShader",
											name: "customShader",
											component: "/three/shader/custom/CustomShader",
											meta: {
												title: "修改Shader",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/three/effect",
											name: "effect",
											component: "/three/shader/effect/Effect",
											meta: {
												title: "效果合成",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/three/css",
									name: "css",
									redirect: "/three/moon",
									meta: {
										title: "CSS",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/three/moon",
											name: "moon",
											component: "/three/css/moon/Moon",
											meta: {
												title: "Moon",
												icon: "icon-threejs",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								}
							]
						},
						{
							path: "/function",
							name: "function",
							redirect: "/function/transfer",
							meta: {
								title: "功能",
								icon: "icon-threejs",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/function/transfer",
									name: "transfer",
									component: "/function/transfer/Transfer",
									meta: {
										title: "穿梭框",
										icon: "icon-chuansuokuang",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/number",
									name: "number",
									component: "/function/number/Number",
									meta: {
										title: "数字",
										icon: "icon-number",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/driver",
									name: "driver",
									component: "/function/driver/Driver",
									meta: {
										title: "引导页",
										icon: "icon-xinshouyindao",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/richText",
									name: "richText",
									component: "/function/richText/RichText",
									meta: {
										title: "富文本编辑器",
										icon: "icon-fuwenbenbianjiqi",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/drag",
									name: "drag",
									component: "/function/drag/Draggable",
									meta: {
										title: "拖拽组件",
										icon: "icon-rili",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/embedded",
									name: "embedded",
									component: "/function/embedded/index",
									meta: {
										title: "内嵌页面",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/copyDirect",
									name: "copyDirect",
									component: "/function/copyDirect/index",
									meta: {
										title: "复制指令",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/waterMark",
									name: "",
									component: "/function/waterMarkDirect/index",
									meta: {
										title: "水印指令",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/dragDirect",
									name: "dragDirect",
									component: "/function/dragDirect/index",
									meta: {
										title: "拖拽指令",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/longPress",
									name: "longPress",
									component: "/function/longPressDirect/index",
									meta: {
										title: "长按指令",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/throttle",
									name: "throttle",
									component: "/function/throttle/index",
									meta: {
										title: "节流指令",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/debounce",
									name: "",
									component: "/function/debounce/index",
									meta: {
										title: "防抖指令",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/excel",
									name: "",
									component: "/function/excel/index",
									meta: {
										title: "Excel",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/imageView",
									name: "",
									component: "/function/imageView/ImageView",
									meta: {
										title: "图片预览",
										icon: "icon-beijingtupian",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/three/demo",
							name: "demo",
							redirect: "/three/car",
							meta: {
								title: "threejs案例",
								icon: "icon-threejs",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/three/car",
									name: "car",
									component: "/three/demo/car/Car",
									meta: {
										title: "汽车",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/three/fireWork",
									name: "fireWork",
									component: "/three/demo/firework/FireWork",
									meta: {
										title: "烟花",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/three/missile",
									name: "missile",
									component: "/three/demo/missile/Missile",
									meta: {
										title: "导弹轨迹",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/three/earch",
									name: "earch",
									component: "/three/demo/earch/Earch",
									meta: {
										title: "地球",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/three/robot",
									name: "robot",
									component: "/three/demo/robot/Robot",
									meta: {
										title: "机器人",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/smartCity",
									name: "smartCity",
									component: "/open/smartCity/SmartCity",
									meta: {
										title: "智慧城市",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/smartCity2",
									name: "smartCity2",
									component: "/open/smartCity2/HomeView",
									meta: {
										title: "智慧城市2",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/smartPark",
									name: "smartPark",
									component: "/open/smartPark/SmartPark",
									meta: {
										title: "智慧园区",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/hotel",
									name: "hotel",
									component: "/open/hotel/Hotel",
									meta: {
										title: "日夜交替",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/smartFactory",
									name: "smartFactory",
									component: "/open/smartFactory/SmartFactory",
									meta: {
										title: "智慧工厂",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/fan",
									name: "intelligentFan",
									component: "/open/intelligentFan/index",
									meta: {
										title: "智慧风机",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/homeViewing",
									name: "homeViewing",
									component: "/three/demo/houseViewing/HomeViewing",
									meta: {
										title: "全景看房",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/threeMap",
									name: "threeMap",
									component: "/open/map/Map",
									meta: {
										title: "3D地图",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/website",
									name: "website",
									component: "/open/website/Website",
									meta: {
										title: "3D官网",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/plane",
									name: "plane",
									component: "/open/plane/Plane",
									meta: {
										title: "飞机",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/open/click",
									name: "click",
									component: "/open/click/Click",
									meta: {
										title: "轮廓",
										icon: "icon-threejs",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/game",
							name: "game",
							redirect: "/game/sheep",
							meta: {
								title: "游戏",
								icon: "icon-threejs",
								isFull: true,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/game/sheep",
									name: "sheep",
									component: "/game/sheep/Sheep",
									meta: {
										title: "菜了个菜",
										icon: "icon-choujiang",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/game/jump",
									name: "jump",
									component: "/game/jump/Jump",
									meta: {
										title: "跳一跳",
										icon: "icon-choujiang",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/game/minesweeper",
									name: "minesweeper",
									component: "/game/minesweeper/Minesweeper",
									meta: {
										title: "扫雷",
										icon: "icon-choujiang",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/canvas",
							name: "canvas",
							redirect: "/canvas/canvas1",
							meta: {
								title: "Canvas",
								icon: "icon-dangedemoban",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/canvas/canvas1",
									name: "canvas1",
									component: "/canvas/Canvas1",
									meta: {
										title: "Canvas1",
										icon: "icon-choujiang",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/canvas/canvas2",
									name: "canvas2",
									component: "/canvas/Canvas2",
									meta: {
										title: "抽奖",
										icon: "icon-choujiang",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/canvas/canvas3",
									name: "canvas3",
									component: "/canvas/Canvas3",
									meta: {
										title: "画板",
										icon: "icon-choujiang",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/canvas/canvas4",
									name: "canvas4",
									component: "/canvas/Canvas4",
									meta: {
										title: "时钟",
										icon: "icon-choujiang",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/canvas/canvas5",
									name: "canvas5",
									component: "/canvas/Canvas5",
									meta: {
										title: "碰撞",
										icon: "icon-choujiang",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/echarts",
							name: "echarts",
							redirect: "/echarts/pie1",
							meta: {
								title: "Echarts",
								icon: "icon-dangedemoban",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/echarts/pie",
									name: "pie",
									redirect: "/echarts/pie1",
									meta: {
										title: "饼图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/pie1",
											name: "pie1",
											component: "/echarts/pie/Pie1",
											meta: {
												title: "饼图1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/pie2",
											name: "pie2",
											component: "/echarts/pie/Pie2",
											meta: {
												title: "饼图2",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/pie3",
											name: "pie3",
											component: "/echarts/pie/Pie3",
											meta: {
												title: "饼图3",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/pie4",
											name: "pie4",
											component: "/echarts/pie/Pie4",
											meta: {
												title: "饼图4",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/echarts/gauge",
									name: "gauge",
									redirect: "/echarts/gauge1",
									meta: {
										title: "仪表盘",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/gauge1",
											name: "gauge1",
											component: "/echarts/gauge/Gauge1",
											meta: {
												title: "仪表盘1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/gauge2",
											name: "gauge2",
											component: "/echarts/gauge/Gauge2",
											meta: {
												title: "仪表盘2",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/guage3",
											name: "",
											component: "/echarts/gauge/Gauge3",
											meta: {
												title: "仪表盘3",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/guage4",
											name: "guage4",
											component: "/echarts/gauge/Gauge4",
											meta: {
												title: "仪表盘4",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/guage5",
											name: "guage5",
											component: "/echarts/gauge/Gauge5",
											meta: {
												title: "仪表盘5",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/guage6",
											name: "guage6",
											component: "/echarts/gauge/Gauge6",
											meta: {
												title: "仪表盘6",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/echarts/bar",
									name: "bar",
									redirect: "/echarts/bar1",
									meta: {
										title: "柱形图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/bar1",
											name: "bar1",
											component: "/echarts/bar/Bar1",
											meta: {
												title: "柱形图1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar2",
											name: "bar2",
											component: "/echarts/bar/Bar2",
											meta: {
												title: "柱形图2",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar3",
											name: "bar3",
											component: "/echarts/bar/Bar3",
											meta: {
												title: "柱形图3",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar4",
											name: "bar4",
											component: "/echarts/bar/Bar4",
											meta: {
												title: "柱形图4",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar5",
											name: "bar5",
											component: "/echarts/bar/Bar5",
											meta: {
												title: "柱形图5",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar6",
											name: "bar6",
											component: "/echarts/bar/Bar6",
											meta: {
												title: "柱形图6",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar7",
											name: "bar7",
											component: "/echarts/bar/Bar7",
											meta: {
												title: "柱形图7",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar8",
											name: "bar8",
											component: "/echarts/bar/Bar8",
											meta: {
												title: "柱形图8",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/bar9",
											name: "bar9",
											component: "/echarts/bar/Bar9",
											meta: {
												title: "柱形图9",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/echarts/line",
									name: "line",
									redirect: "/echarts/line1",
									meta: {
										title: "折线图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/line1",
											name: "line1",
											component: "/echarts/line/Line1",
											meta: {
												title: "折线图1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/line2",
											name: "line2",
											component: "/echarts/line/Line2",
											meta: {
												title: "折线图2",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/line3",
											name: "line3",
											component: "/echarts/line/Line3",
											meta: {
												title: "折线图3",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/echarts/tree",
									name: "tree",
									redirect: "/echarts/tree1",
									meta: {
										title: "树图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/tree1",
											name: "tree1",
											component: "/echarts/tree/Tree1",
											meta: {
												title: "树图1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/tree2",
											name: "tree2",
											component: "/echarts/tree/Tree2",
											meta: {
												title: "树图2",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/echarts/scatter",
									name: "scatter",
									redirect: "/echarts/tree1",
									meta: {
										title: "散点图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/scatter1",
											name: "scatter1",
											component: "/echarts/scatter/Scatter1",
											meta: {
												title: "散点图1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/echarts/map",
									name: "map",
									redirect: "/echarts/map1",
									meta: {
										title: "地图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/map1",
											name: "map1",
											component: "/echarts/map/Map1",
											meta: {
												title: "地图1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/map2",
											name: "map2",
											component: "/echarts/map/Map2",
											meta: {
												title: "地图2",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/map3",
											name: "map3",
											component: "/echarts/map/Map3",
											meta: {
												title: "地图3",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										},
										{
											path: "/echarts/map4",
											name: "map4",
											component: "/echarts/map/Map4",
											meta: {
												title: "地图4",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								},
								{
									path: "/echarts/graph",
									name: "graph",
									redirect: "/echarts/graph1",
									meta: {
										title: "地图",
										icon: "icon-threejs",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									},
									children: [
										{
											path: "/echarts/graph1",
											name: "graph1",
											component: "/echarts/graph/Graph1",
											meta: {
												title: "关系图1",
												icon: "icon-choujiang",
												isFull: false,
												isHide: false,
												isAffix: false,
												isKeepAlive: false
											}
										}
									]
								}
							]
						},
						{
							path: "/cesium/cesium",
							name: "cesium",
							redirect: "/cesium/cesium1",
							meta: {
								title: "Cesium",
								icon: "icon-threejs",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/cesium/cesium1",
									name: "cesium1",
									component: "/cesium/init/Cesium",
									meta: {
										title: "cesium",
										icon: "icon-choujiang",
										isFull: true,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/work",
							name: "work",
							redirect: "/work/index",
							meta: {
								title: "工作台",
								icon: "icon-yidong",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/work/index",
									name: "workIndex",
									component: "/work/index",
									meta: {
										title: "工作台",
										icon: "icon-yidong",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								},
								{
									path: "/work/characterRecognition",
									name: "characterRecognition",
									component: "/work/function/characterRecognition/CharacterRecognition",
									meta: {
										title: "文字识别",
										icon: "icon-yidong",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/open/editor1",
							name: "editor1",
							icon: "icon-yidong",
							component: "/open/edit/index",
							meta: {
								title: "拖拽",
								icon: "icon-yidong",
								isFull: true,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							}
						}
						// {
						//     name: '唱歌排名',
						//     icon: 'icon-dangedemoban',
						//     path: '/open',
						//     children: [
						//         {
						//             name: '分数管理',
						//             icon: 'icon-choujiang',
						//             path: '/open/rankedList'
						//         },
						//         {
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
