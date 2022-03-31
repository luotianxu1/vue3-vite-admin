// 摊平树形结构
export const flattenedTree = (data) => {
  let result = []
  result = addList(result,data)

  function addList (list, arr) {
    arr.forEach((item) => {
      if (item.children) {
        addList(list,item.children)
      } else {
        list.push(item.url)
      }
    })
    return list
  }
  result = [...new Set(result)]
  return result
}


