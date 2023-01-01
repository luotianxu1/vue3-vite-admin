import xlsx from "xlsx"

const jsonToExcel = (excelOptions: {
	data: any[]
	header: Record<string, string>
	fileName: string
	bookType: xlsx.BookType
}) => {
	// 创建工作簿
	const workBook = xlsx.utils.book_new()
	if (excelOptions.header) {
		excelOptions.data = excelOptions.data.map(item => {
			const obj = {}
			for (const key in item) {
				if (excelOptions.header[key]) {
					obj[excelOptions.header[key]] = item[key]
				} else {
					obj[key] = item[key]
				}
			}
			return obj
		})
	}

	const workSheet = xlsx.utils.json_to_sheet(excelOptions.data)
	// 把工作表放进工作簿
	xlsx.utils.book_append_sheet(workBook, workSheet)
	xlsx.writeFile(workBook, excelOptions.fileName, {
		bookType: excelOptions.bookType || "xlsx"
	})
}

export { jsonToExcel }
