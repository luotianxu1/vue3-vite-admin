<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/modelNew/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    const init = () => {
        if (!webGl.value) {
            return
        }
        const web = new WebGl(webGl.value)
        const render = () => {
            requestAnimationFrame(render)
            web.renderer.render(web.scene,web.camera)
        }
        render()
    }
</script>

<style lang="scss" scoped>
    .webGl {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }
</style>
