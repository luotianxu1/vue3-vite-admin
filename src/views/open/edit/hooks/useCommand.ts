import eventHub from '@/utils/eventHub'
import deepcopy from 'deepcopy'

export function useCommand(data) {
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
            console.log(current)
        }
    }

    // 注册我们需要的命令
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

    // 如果希望将操作放到队列中可以增加一个属性，便是等会操作要放到队列中
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
