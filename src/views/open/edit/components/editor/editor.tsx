import "./editor.scss"
import EditorBlock from "../editorBlock/editorBlock"
import deepcopy from "deepcopy"
import { useMenuDragger } from "../../hooks/useMenuDragger"
import { useFocus } from "../../hooks/useFocus"
import { useBlockDragger } from "../../hooks/useBlockDragger"
import { useCommand } from "../../hooks/useCommand"
import { $dialog } from "../dialog/dialog"
import { ElButton } from "element-plus"
import { $dropdown } from "../dropdown/dropdown"
import { DropDownItem } from "../dropdownItem/dropdownItem"
import EditorOpreatpr from "../editorOpreatpr/editorOpreatpr"
import type { PropType } from "vue"
import { TConfig, TState } from "../../types/index"

export default defineComponent({
	props: {
		modelValue: {
			type: Object as PropType<TState>,
			default: () => {}
		},
		formData: {
			type: Object,
			default: () => {}
		}
	},
	emits: ["update:modelValue"],
	setup(props, ctx) {
		// 预览
		const previewRef = ref(false)
		const editorRef = ref(true)
		const data = computed({
			get() {
				return props.modelValue
			},
			set(newVal) {
				ctx.emit("update:modelValue", deepcopy(newVal))
			}
		})

		const containerStyles = computed(() => ({
			width: data.value.container.width + "px",
			height: data.value.container.height + "px"
		}))

		const config = inject("config") as TConfig

		const containerRef = ref(null)
		// 1.菜单拖拽功能
		const { dragStart, dragEnd } = useMenuDragger(containerRef, data)

		// 2.实现获取焦点
		const { blockMousedown, containerMousedown, focusData, lastSelectBlock, clearBlockFocus } = useFocus(
			data,
			previewRef.value,
			e => {
				mouseDown(e)
			}
		)

		// 3.实现拖拽多个元素
		const { mouseDown, markLine } = useBlockDragger(focusData, lastSelectBlock, data)

		const { commands } = useCommand(data, focusData)

		const buttons = [
			{ label: "撤销", icon: "iconfont icon-chexiao", handler: () => commands.undo() },
			{ label: "重做", icon: "iconfont icon-fanhui", handler: () => commands.redo() },
			{
				label: "导出",
				icon: "iconfont icon-xiazai",
				handler: () => {
					$dialog({
						title: "导出JSON",
						content: JSON.stringify(data.value),
						footer: false
					})
				}
			},
			{
				label: "导入",
				icon: "iconfont icon-shangchuan",
				handler: () => {
					$dialog({
						title: "导入JSON",
						content: "",
						footer: true,
						onConfirm(text) {
							commands.updateContainer(JSON.parse(text))
						}
					})
				}
			},
			{
				label: "置顶",
				icon: "iconfont icon-zhiding",
				handler: () => commands.placeTop()
			},
			{ label: "置底", icon: "iconfont icon-zhidi", handler: () => commands.placeBottom() },
			{ label: "删除", icon: "iconfont icon-dustbin", handler: () => commands.delete() },
			{
				label: () => (previewRef.value ? "编辑" : "预览"),
				icon: () => (previewRef.value ? "iconfont icon-bianji" : "iconfont icon-chakan"),
				handler: () => {
					previewRef.value = !previewRef.value
					clearBlockFocus()
				}
			},
			{
				label: "关闭",
				icon: "iconfont icon-guanbi",
				handler: () => {
					editorRef.value = false
				}
			}
		]

		const onContextMenuBlock = (e, block) => {
			e.preventDefault()
			$dropdown({
				el: e.target,
				content: () => {
					return (
						<>
							<DropDownItem label="删除" icon="iconfont icon-dustbin" onClick={() => commands.delete()}></DropDownItem>
							<DropDownItem label="置顶" icon="iconfont icon-zhiding" onClick={() => commands.placeTop()}></DropDownItem>
							<DropDownItem label="置底" icon="iconfont icon-zhidi" onClick={() => commands.placeBottom()}></DropDownItem>
							<DropDownItem
								label="查看"
								icon="iconfont icon-chakan"
								onClick={() => {
									$dialog({
										title: "查看节点数据",
										content: JSON.stringify(block)
									})
								}}
							></DropDownItem>
							<DropDownItem
								label="导入"
								icon="iconfont icon-shangchuan"
								onClick={() => {
									$dialog({
										title: "导入节点数据",
										content: "",
										footer: true,
										onConfirm(text) {
											commands.updateBlock(JSON.parse(text), block)
										}
									})
								}}
							></DropDownItem>
						</>
					)
				}
			})
		}

		return () =>
			!editorRef.value ? (
				<>
					<div class="editor-container-canvas__content" style={containerStyles.value}>
						{data.value.blocks.map(block => (
							<EditorBlock class={"editor-block-preview"} v-model:block={block} formData={props.formData}></EditorBlock>
						))}
					</div>
					<div>
						<ElButton type="primary" onClick={() => (editorRef.value = true)}>
							继续编辑
						</ElButton>
						{JSON.stringify(props.formData)}
					</div>
				</>
			) : (
				<div class="editor">
					<div class="editor-left">
						{/* {根据注册列表渲染内容} */}
						{config.componentList.map(component => (
							<div class="editor-left-item" draggable onDragstart={e => dragStart(e, component)} onDragend={() => dragEnd()}>
								<span>{component.label}</span>
								<div>{component.preview()}</div>
							</div>
						))}
					</div>
					<div class="editor-top">
						{buttons.map(btn => {
							const label = typeof btn.label === "function" ? btn.label() : btn.label
							const icon = typeof btn.icon === "function" ? btn.icon() : btn.icon
							return (
								<div class="editor-top-button" onClick={btn.handler}>
									<i class={icon}></i>
									<span>{label}</span>
								</div>
							)
						})}
					</div>
					<div class="editor-right">
						<EditorOpreatpr
							block={lastSelectBlock.value}
							data={data.value}
							updateContainer={commands.updateContainer}
							updateBlcok={commands.updateBlock}
						></EditorOpreatpr>
					</div>
					<div class="editor-container">
						<div class="editor-container-canvas">
							<div
								class="editor-container-canvas__content"
								style={containerStyles.value}
								ref={containerRef}
								onMousedown={containerMousedown}
							>
								{data.value.blocks.map((block, index) => (
									<EditorBlock
										class={[block.focus ? "editor-block-focus" : "", previewRef.value ? "editor-block-preview" : ""]}
										v-model:block={block}
										onMousedown={e => blockMousedown(e, block, index)}
										onContextmenu={e => onContextMenuBlock(e, block)}
										formData={props.formData}
									></EditorBlock>
								))}
								{markLine.x !== null && <div class="line-x" style={{ left: markLine.x + "px" }}></div>}
								{markLine.y !== null && <div class="line-y" style={{ top: markLine.y + "px" }}></div>}
							</div>
						</div>
					</div>
				</div>
			)
	}
})
