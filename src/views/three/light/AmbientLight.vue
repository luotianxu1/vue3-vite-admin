<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/modelNew/webGl'
    import * as THREE from 'three'
    import { addHouseAndTree } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const form = reactive({
        intensity: 1,
        color: '#606008',
        disabled: false
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight(form.color, form.intensity)
        web.addGUI()
        web.addStats()

        web.gui.addColor(form, 'color')
        web.gui.add(form, 'intensity', 0, 3)
        web.gui.add(form, 'disabled')

        addHouseAndTree(web.scene)
        render()
    }

    const render = () => {
        web.update()
        requestAnimationFrame(render)
    }

    watch(form, (val) => {
        web.ambientLight.intensity = val.intensity
        web.ambientLight.color = new THREE.Color(val.color)
        web.ambientLight.visible = !val.disabled
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
