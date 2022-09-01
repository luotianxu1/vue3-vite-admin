<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model='form' label-width='50px'>
                    <el-form-item label='强度'>
                        <el-slider v-model='form.intensity' :min='0' :max='3' :step='0.1' />
                    </el-form-item>
                    <el-form-item label='颜色'>
                        <el-color-picker v-model='form.color' />
                    </el-form-item>
                    <el-form-item label='禁用'>
                        <el-checkbox v-model='form.disabled' size='large' />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div ref="webGl" class="webGl"></div>
    </div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/modelNew/webGl'
    import * as THREE from 'three'
    import { addHouseAndTree } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight('#606008', 1)
        web.addSportLight(-30, 40, -10, 0xffffff)

        addHouseAndTree(web.scene)

        render()
    }

    const render = () => {
        requestAnimationFrame(render)
        web.renderer.render(web.scene, web.camera)
    }

    const form = reactive({
        intensity: 1,
        color: '#606008',
        disabled: false
    })

    watch(form, (val) => {
        web.ambientLight.intensity = val.intensity
        web.ambientLight.color = new THREE.Color(val.color)
        web.sportLight.visible = !val.disabled
    })
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .form {
            width: 200px;
            margin-right: 10px;

            .form-item {
                text-align: center;
                margin-top: 5px;
            }
        }

        .webGl {
            flex: 1;
            position: relative;
        }
    }
</style>
