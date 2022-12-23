export function useBlockDragger(focusData) {
    let dragState = {
        startX: 0,
        startY: 0,
        startPos: null as any
    }

    const mouseDown = (e) => {
        dragState = {
            startX: e.clientX,
            startY: e.clientY,
            startPos: focusData.value.focus.map(({ top, left }) => ({ top, left }))
        }
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }

    const mouseMove = (e) => {
        let { clientX: moveX, clientY: moveY } = e
        let durX = moveX - dragState.startX
        let durY = moveY - dragState.startY
        focusData.value.focus.forEach((block, idx) => {
            if (dragState.startPos) {
                block.top = dragState.startPos[idx].top + durY
                block.left = dragState.startPos[idx].left + durX
            }
        })
    }

    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
    }

    return {
        mouseDown
    }
}
