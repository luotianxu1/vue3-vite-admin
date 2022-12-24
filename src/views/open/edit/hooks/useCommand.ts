import eventHub from '@/utils/eventHub'
import deepcopy from 'deepcopy'

export function useCommand(data, focusData) {
    // 前进后退需要指针
    const state = {
        current: -1, // 前进后退的索引值
        queue: [] as any, // 存放所有操作命令
        commands: {} as any, // 制作命令和执行功能一个映射表
        commandArray: [] as any, // 存放所有的命令
        destoryArray: [] as any
    }

    const registry = (command) => {
        state.commandArray.push(command)
        state.commands[command.name] = (...args) => {
            const { redo, undo } = command.execute(...args)
            redo()
            // 不需要放队列直接跳过
            if (!command.pushQueue) {
                return
            }
            let { queue, current } = state
            if (queue.length > 0) {
                queue.slice(0, current + 1) // 可能在放置的过程中有撤销操作，所以根据当前最新的current值来计算新的
                state.queue = queue
            }
            queue.push({ redo, undo }) // 保存指令的前进后退
            state.current = current + 1
        }
    }

    // 重做
    registry({
        name: 'redo',
        keyboard: 'ctrl+y',
        execute() {
            return {
                redo() {
                    let item = state.queue[state.current + 1]
                    if (item) {
                        item.redo && item.redo()
                        state.current++
                    }
                }
            }
        }
    })

    // 撤销
    registry({
        name: 'undo',
        keyboard: 'ctrl+z',
        execute() {
            return {
                redo() {
                    if (state.current === -1) {
                        return
                    }
                    let item = state.queue[state.current]
                    if (item) {
                        item.undo && item.undo()
                        state.current--
                    }
                }
            }
        }
    })

    // 拖拽
    registry({
        name: 'drag',
        pushQueue: true,
        init() {
            this.before = null
            // 初始化操作 默认就会执行
            const start = () => {
                this.before = deepcopy(data.value.blocks)
            }
            // 监控拖拽开始事件，保存状态
            const end = () => state.commands.drag() // 拖拽之后触发对应的指令
            eventHub.on('start', () => {
                start()
            })
            eventHub.on('end', () => {
                end()
            })
            return () => {
                eventHub.off('start', start)
                eventHub.off('end', end)
            }
        },
        execute() {
            let before = this.before
            let after = data.value.blocks
            return {
                redo() {
                    data.value = { ...data.value, blocks: after }
                },
                undo() {
                    data.value = { ...data.value, blocks: before }
                }
            }
        }
    })

    // 导入
    registry({
        name: 'updateContainer',
        pushQueue: true,
        execute(newVal) {
            let dataState = {
                before: data.value,
                after: newVal
            }
            return {
                redo() {
                    data.value = dataState.after
                },
                undo() {
                    data.value = dataState.before
                }
            }
        }
    })

    // 更新某个组件
    registry({
        name: 'updateBlock',
        pushQueue: true,
        execute(newBlock, oldBlock) {
            let dataState = {
                before: data.value.blocks,
                after: (() => {
                    let blocks = [...data.value.blocks]
                    const index = data.value.blocks.indexOf(oldBlock)
                    if (index > -1) {
                        blocks.splice(index, 1, newBlock)
                    }
                    return blocks
                })()
            }
            return {
                redo() {
                    data.value = { ...data.value, blocks: dataState.after }
                },
                undo() {
                    data.value = { ...data.value, blocks: dataState.before }
                }
            }
        }
    })

    // 置顶
    registry({
        name: 'placeTop',
        pushQueue: true,
        execute() {
            let before = deepcopy(data.value.blocks)
            // 置顶就是在所有blocks中找到最大的
            let after = (() => {
                let { focus, unfocused } = focusData.value
                let maxZIndex = unfocused.reduce((prev, block) => {
                    return Math.max(prev, block.zIndex)
                }, -Infinity)
                focus.forEach((block) => (block.zIndex = maxZIndex + 1))
                console.log(focus)

                return data.value.blocks
            })()
            return {
                undo: () => {
                    // blocks 前后一致则不更新
                    data.value = { ...data.value, blocks: before }
                },
                redo: () => {
                    data.value = { ...data.value, blocks: after }
                }
            }
        }
    })

    // 置底
    registry({
        name: 'placeBottom',
        pushQueue: true,
        execute() {
            let before = deepcopy(data.value.blocks)
            let after = (() => {
                let { focus, unfocused } = focusData.value
                let minZIndex =
                    unfocused.reduce((prev, block) => {
                        return Math.min(prev, block.zIndex)
                    }, Infinity) - 1
                // 不能直接-1，因为z-index不能为负值
                if (minZIndex < 0) {
                    const dur = Math.abs(minZIndex)
                    minZIndex = 0
                    unfocused.forEach((block) => (block.zIndex += dur))
                }
                focus.forEach((block) => (block.zIndex = minZIndex))
                return data.value.blocks
            })()
            return {
                undo: () => {
                    data.value = { ...data.value, blocks: before }
                },
                redo: () => {
                    data.value = { ...data.value, blocks: after }
                }
            }
        }
    })

    // 删除
    registry({
        name: 'delete',
        pushQueue: true,
        execute() {
            let before = deepcopy(data.value.blocks)
            let after = focusData.value.unfocused
            return {
                undo: () => {
                    data.value = { ...data.value, blocks: before }
                },
                redo: () => {
                    data.value = { ...data.value, blocks: after }
                }
            }
        }
    })

    const keyBoardEvent = (() => {
        const keyCodes = {
            90: 'z',
            89: 'y'
        }
        const onKeydown = (ev) => {
            const { ctrlKey, keyCode } = ev
            let keyString: any = []
            if (ctrlKey) {
                keyString.push('ctrl')
            }
            keyString.push(keyCodes[keyCode])
            keyString = keyString.join('+')
            state.commandArray.forEach(({ keyboard, name }) => {
                // 没有键盘事件
                if (!keyboard) {
                    return
                }
                if (keyboard === keyString) {
                    state.commands[name]()
                    ev.preventDefault()
                }
            })
        }

        const init = () => {
            // 初始化事件
            window.addEventListener('keydown', (e) => {
                onKeydown(e)
            })
            return () => {
                //销毁事件
                window.removeEventListener('keydown', onKeydown)
            }
        }
        return init
    })()

    ;(() => {
        state.destoryArray.push(keyBoardEvent())
        state.commandArray.forEach(
            (command) => command.init && state.destoryArray.push(command.init())
        )
    })()

    // 清理绑定的事件
    onMounted(() => {
        state.destoryArray.forEach((fn) => fn && fn())
    })

    return state
}
