<template>
	<div>
		<el-button type="primary" @click="createExcel">创建</el-button>
		<input type="file" @change="change" />
		<el-button type="primary" @click="loadExcel">下载</el-button>
		<div class="excel-content" v-html="excelHTML"></div>

		<table border="1 " width="200 " ref="excelTable">
			<tr>
				<td colspan="4">ss</td>
			</tr>
			<tr>
				<td width="25% ">1</td>
				<td width="25% ">2</td>
				<td width="25% ">3</td>
				<td width="25% ">4</td>
			</tr>
			<tr>
				<td width="25% " rowspan="2">2</td>
				<td width="25% ">3</td>
				<td width="25% ">4</td>
				<td width="25% ">5</td>
			</tr>
			<tr>
				<td width="25% ">6</td>
				<td width="25% " rowspan="3">7</td>
				<td width="25% ">8</td>
			</tr>
			<tr>
				<td width="25% " colspan="2">9</td>
				<td width="25% ">10</td>
			</tr>
			<tr>
				<td width="25% ">11</td>
				<td width="25% ">12</td>
				<td width="25% ">13</td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts" setup>
import { read, utils, writeFile } from "xlsx"
const excelTable = ref()
const excelHTML = ref()

const createExcel = () => {
	let data = [
		{ name: "张三", id: 100, score: 99 },
		{ name: "张四", id: 200, score: 99 },
		{ name: "张五", id: 300, score: 99 }
	]
	const ws = utils.json_to_sheet(data)
	const wb = utils.book_new()
	utils.book_append_sheet(wb, ws, "sheet1")
	console.log(ws)

	writeFile(wb, "test1.xlsx")
}

const change = e => {
	let file = e.target.files[0]
	file.arrayBuffer().then(res => {
		const wb = read(res)
		const sheet1 = wb.Sheets.Sheet1
		// const data = utils.sheet_to_json(sheet1)
		const html = utils.sheet_to_html(sheet1)
		excelHTML.value = html
	})
}
const loadExcel = () => {
	const tableDom = excelTable.value
	const tableWs = utils.table_to_sheet(tableDom)
	const wb = utils.book_new()
	utils.book_append_sheet(wb, tableWs, "sheet1")
	writeFile(wb, "tableTest.xlsx")
}
</script>

<style lang="scss" scoped></style>
