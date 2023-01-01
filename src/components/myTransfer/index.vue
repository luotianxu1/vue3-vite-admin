<template>
	<div>
		<div>
			<Selector :data="options" @select-change="setTargetIndex"></Selector>
		</div>
		<div class="transfer">
			<div class="box left-list" @dragover.prevent @drop="removeRightListData([dragedItem])">
				<ListTitle :title="leftTitle"></ListTitle>
				<div>
					<ListItem
						:data="leftListData"
						left-or-right="left"
						@checkbox-click="setCheckedData"
						@drag-item="setDragedItem"
					></ListItem>
				</div>
			</div>
			<ButtonGroup
				:left-button-disabled="transferButtonDisabled.left"
				:right-button-disabled="transferButtonDisabled.right"
				@left-button-click="removeRightListData(checkedData.right)"
				@right-button-click="addRightListData(checkedData.left)"
			></ButtonGroup>
			<div class="box right-list" @dragover.prevent @drop="addRightListData([dragedItem])">
				<ListTitle :title="rightTitle"></ListTitle>
				<div>
					<ListItem
						:data="rightListData"
						left-or-right="right"
						@checkbox-click="setCheckedData"
						@drag-item="setDragedItem"
					></ListItem>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Selector from "./components/Selector.vue"
import ListTitle from "./components/ListTitle.vue"
import ButtonGroup from "./components/ButtonGroup.vue"
import ListItem from "./components/ListItem.vue"
import { useTargetIndex, useComputedData, useRightListData, useCheckedData, useDragedItem } from "./hooks/hooks"

const props = defineProps({
	data: {
		type: Array,
		default: () => []
	},
	rightTitle: {
		type: String,
		default: ""
	}
})
const options = props.data.map((item: any) => item.title)

const [targetIndex, setTargetIndex] = useTargetIndex(0)
const [checkedData, addCheckedData, removeCheckedData] = useCheckedData()
const [rightListData, addRightListData, removeRightListData] = useRightListData([], checkedData)
const [dragedItem, setDragedItem] = useDragedItem()
const { leftTitle, leftListData, transferButtonDisabled } = useComputedData(props.data, targetIndex, rightListData, checkedData)

const setCheckedData = (checked, leftOrRight, item) => {
	checked ? addCheckedData(leftOrRight, item) : removeCheckedData(leftOrRight, item.id)
}
</script>

<style scoped lang="scss">
.transfer {
	width: 360px;
	height: 300px;
	display: flex;
	flex-direction: row;
	border: 1px solid #ddd;
}

.box {
	width: 120px;
	height: 100%;
}
</style>
