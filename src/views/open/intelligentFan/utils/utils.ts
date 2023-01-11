export const reSetName = (obj, strName) => {
	let i = 0
	obj.traverse(function (child) {
		if (child.isMesh) {
			child.name = strName + "_" + i
			++i
		}
	})
}
