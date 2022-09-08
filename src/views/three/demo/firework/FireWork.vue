<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import gsap from 'gsap'
    import vertexShader from './shader/vertex.glsl?raw'
    import fragmentShader from './shader/fragment.glsl?raw'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    import { Water } from 'three/examples/jsm/objects/Water2'
    import Fireworks from '@/utils/three/firework'
    import WebGl from '@/utils/three/modelNew/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
        window.addEventListener('click', createFireworks)
    })

    onUnmounted(() => {
        window.removeEventListener('click', createFireworks)
        web.remove()
    })

    // 管理烟花
    let firWorks: any = []
    // 设置创建烟花函数
    const createFireworks = () => {
        let color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`
        let position = {
            x: (Math.random() - 0.5) * 40,
            z: -(Math.random() - 0.5) * 40,
            y: 3 + Math.random() * 15
        }
        // 随机生成颜色和烟花位置
        let fireWork = new Fireworks(color, position)
        fireWork.addScene(web.scene)
        firWorks.push(fireWork)
    }

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.camera.position.set(-20, 10, -20)
        web.renderer.toneMappingExposure = 0.2
        web.renderer.outputEncoding = THREE.sRGBEncoding
        web.renderer.toneMapping = THREE.ACESFilmicToneMapping

        // 创建纹理加载器对象
        const rgbeLoader = new RGBELoader()
        rgbeLoader.loadAsync('./textures/hdr/2k.hdr').then((texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            web.scene.background = texture
            web.scene.environment = texture
        })

        const gltfLoader = new GLTFLoader()
        // 创建着色器材质;
        const shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {},
            side: THREE.DoubleSide
            //   transparent: true,
        })
        let LightBox
        gltfLoader.load('./model/glb/flyLight.glb', (gltf) => {
            LightBox = gltf.scene.children[0]
            LightBox.material = shaderMaterial
            for (let i = 0; i < 150; i++) {
                let fly = gltf.scene.clone(true)
                let x = (Math.random() - 0.5) * 300
                let z = (Math.random() - 0.5) * 300
                let y = Math.random() * 60 + 5
                fly.position.set(x, y, z)
                gsap.to(fly.rotation, {
                    y: 2 * Math.PI,
                    duration: 10 + Math.random() * 30,
                    repeat: -1
                })
                gsap.to(fly.position, {
                    x: '+=' + Math.random() * 5,
                    y: '+=' + Math.random() * 20,
                    yoyo: true,
                    duration: 5 + Math.random() * 10,
                    repeat: -1
                })
                web.scene.add(fly)
            }
        })

        gltfLoader.load('./model/glb/newyears_min.glb', (gltf) => {
            web.scene.add(gltf.scene)

            // 创建水面
            const waterGeometry = new THREE.PlaneBufferGeometry(100, 100)
            let water = new Water(waterGeometry, {
                scale: 4,
                textureHeight: 1024,
                textureWidth: 1024
            })
            water.position.y = 1
            water.rotation.x = -Math.PI / 2
            web.scene.add(water)
        })

        renderScene()
    }

    const renderScene = () => {
        firWorks.forEach((item, i) => {
            const type = item.update()
            if (type === 'remove') {
                firWorks.splice(i, 1)
            }
        })
        web.update()
        requestAnimationFrame(renderScene)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
