<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="130px">
                    <el-form-item label="radius">
                        <el-slider
                            v-model="form.radius"
                            :min="0"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="tube">
                        <el-slider
                            v-model="form.tube"
                            :min="0"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="radialSegments">
                        <el-slider
                            v-model="form.radialSegments"
                            :min="0"
                            :max="400"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="tubularSegments">
                        <el-slider
                            v-model="form.tubularSegments"
                            :min="1"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="p">
                        <el-slider
                            v-model="form.p"
                            :min="1"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="q">
                        <el-slider
                            v-model="form.q"
                            :min="1"
                            :max="15"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="asParticles">
                        <el-checkbox v-model="form.asParticles" size="small" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { initAmbientLight, initAxes, initCamera, initCameraControl, initStats } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()
    // 创建坐标轴并设置轴线粗细为20
    initAxes(scene)
    // 创建相机
    const camera = initCamera()
    camera.position.set(-30, 40, 30)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true
    // 创建灯光
    initAmbientLight(scene)

    const form = reactive({
        radius: 13,
        tube: 1.7,
        radialSegments: 156,
        tubularSegments: 12,
        p:5,
        q:4,
        asParticles: false
    })

    const generateSprite = () => {
        let canvas = document.createElement('canvas')
        canvas.width = 16
        canvas.height = 16
        let context:any = canvas.getContext('2d')
        let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2)
        gradient.addColorStop(0, 'rgba(255,255,255,1)')
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)')
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)')
        gradient.addColorStop(1, 'rgba(0,0,0,1)')
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)
        let texture = new THREE.Texture(canvas)
        texture.needsUpdate = true
        return texture
    }

    const createPoints = (geom) => {
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: generateSprite(),
            depthWrite: false // instead of sortParticles
        })

        return new THREE.Points(geom, material)
    }

    let knot
    const createParticles = () => {
        const geom = new THREE.TorusKnotGeometry(
            form.radius,
            form.tube,
            Math.round(form.radialSegments),
            Math.round(form.tubularSegments),
            Math.round(form.p),
            Math.round(form.q)
        )
        if (form.asParticles) {
            knot = createPoints(geom)
        } else {
            knot = new THREE.Mesh(geom, new THREE.MeshNormalMaterial())
        }
        scene.add(knot)
    }

    createParticles()

    watch(form, () => {
        if (knot) {
            scene.remove(knot)
        }
        createParticles()
    })

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)
    const clock = new THREE.Clock()
    let stats
    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        // 创建渲染器
        const width = body.offsetWidth
        const height = body.offsetHeight
        webGLRenderer.setSize(width, height)
        body.appendChild(webGLRenderer.domElement)
        stats = initStats(body)
        renderScene()
    }

    const renderScene = () => {
        const delta = clock.getDelta()
        cameraControls.update(delta)
        stats.update()
        requestAnimationFrame(renderScene)
        webGLRenderer.render(scene, camera)
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .form {
            width: 300px;
            margin-right: 10px;

            .form-item {
                text-align: center;
                margin-top: 5px;
            }
        }

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
