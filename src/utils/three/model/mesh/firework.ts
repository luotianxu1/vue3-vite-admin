import * as THREE from 'three'
import startPointVertex from '@/utils/three/shader/startpoint/vertex.glsl?raw'
import startPointFragment from '@/utils/three/shader/startpoint/fragment.glsl?raw'
import fireworksVertex from '@/utils/three/shader/fireworks/vertex.glsl?raw'
import fireworksFragment from '@/utils/three/shader/fireworks/fragment.glsl?raw'

export default class Fireworks {
    startGeometry
    startMaterial
    startPoint
    scene
    clock
    fireworkGeometry
    FireworksCount
    fireworksMaterial
    fireworks
    color
    listener
    sound
    play
    sendSound
    sendSoundPlay
    listener2

    constructor(color, to, from = { x: 0, y: 0, z: 0 }) {
        // 创建烟花发射的点
        this.color = new THREE.Color(color)
        this.startGeometry = new THREE.BufferGeometry()
        const startPositionArray = new Float32Array(3)
        startPositionArray[0] = from.x
        startPositionArray[1] = from.y
        startPositionArray[2] = from.z
        this.startGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(startPositionArray, 3)
        )

        // 随机位置
        const astepArray = new Float32Array(3)
        astepArray[0] = to.x - from.x
        astepArray[1] = to.y - from.y
        astepArray[2] = to.z - from.z
        this.startGeometry.setAttribute(
            'aStep',
            new THREE.BufferAttribute(astepArray, 3)
        )

        // 设置着色器材质
        this.startMaterial = new THREE.ShaderMaterial({
            vertexShader: startPointVertex,
            fragmentShader: startPointFragment,
            side: THREE.DoubleSide,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            uniforms: {
                uTime: {
                    value: 0
                },
                uSize: {
                    value: 20
                },
                uColor: {
                    value: this.color
                }
            }
        })

        // 创建烟花点
        this.startPoint = new THREE.Points(
            this.startGeometry,
            this.startMaterial
        )

        // 开始计时
        this.clock = new THREE.Clock()

        // 创建爆炸烟花
        this.fireworkGeometry = new THREE.BufferGeometry()
        this.FireworksCount = 180 + Math.floor(Math.random() * 100)
        const positionFireworksArray = new Float32Array(this.FireworksCount * 3)
        const scaleFireArray = new Float32Array(this.FireworksCount)
        const directionArray = new Float32Array(this.FireworksCount * 3)
        for (let i = 0; i < this.FireworksCount; i++) {
            // 烟花初始位置
            positionFireworksArray[i * 3] = to.x
            positionFireworksArray[i * 3 + 1] = to.y
            positionFireworksArray[i * 3 + 2] = to.z
            // 烟花所有粒子初始大小
            scaleFireArray[i] = Math.random()
            // 设置四周发射角度
            let theta = Math.random() * 2 * Math.PI
            let beta = Math.random() * 2 * Math.PI
            let r = Math.random()
            directionArray[i * 3] = r * Math.sin(theta) + r * Math.sin(beta)
            directionArray[i * 3 + 1] = r * Math.cos(theta) + r * Math.cos(beta)
            directionArray[i * 3 + 2] = r * Math.sin(theta) + r * Math.cos(beta)
        }
        this.fireworkGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positionFireworksArray, 3)
        )
        this.fireworkGeometry.setAttribute(
            'aScale',
            new THREE.BufferAttribute(scaleFireArray, 1)
        )
        this.fireworkGeometry.setAttribute(
            'aRandom',
            new THREE.BufferAttribute(directionArray, 3)
        )

        this.fireworksMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: {
                    value: 0
                },
                uSize: {
                    value: 0
                },
                uColor: {
                    value: this.color
                }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexShader: fireworksVertex,
            fragmentShader: fireworksFragment
        })
        this.fireworks = new THREE.Points(
            this.fireworkGeometry,
            this.fireworksMaterial
        )

        // 创建音频
        this.listener = new THREE.AudioListener()
        this.sound = new THREE.Audio(this.listener)
        // 创建音频加载器
        const audioLoader = new THREE.AudioLoader()
        audioLoader.load(
            `./sound/firework/pow${Math.floor(Math.random() * 4) + 1}.ogg`,
            (buffer) => {
                this.sound.setBuffer(buffer)
                this.sound.setLoop(false)
                this.sound.setVolume(1)
            }
        )

        this.listener2 = new THREE.AudioListener()
        this.sendSound = new THREE.Audio(this.listener2)
        audioLoader.load(`./sound/firework/send.mp3`, (buffer) => {
            this.sendSound.setBuffer(buffer)
            this.sendSound.setLoop(false)
            this.sendSound.setVolume(0.1)
        })
    }

    // 添加到场景
    addScene(scene) {
        scene.add(this.startPoint)
        scene.add(this.fireworks)
        this.scene = scene
    }

    // 更新函数
    update() {
        const elapsedTime = this.clock.getElapsedTime()
        if (elapsedTime > 0.2 && elapsedTime < 1) {
            if (!this.sendSound.isPlaying && !this.sendSoundPlay) {
                this.sendSound.play()
                this.sendSoundPlay = true
            }
            this.startMaterial.uniforms.uTime.value = elapsedTime
            this.startMaterial.uniforms.uSize.value = 20
        } else if (elapsedTime > 0.2) {
            const time = elapsedTime - 1
            // 清除
            this.startMaterial.uniforms.uSize.value = 0
            this.startPoint.clear()
            this.startGeometry.dispose()
            this.startMaterial.dispose()
            if (!this.sound.isPlaying && !this.play) {
                this.sound.play()
                this.play = true
            }
            // 设置烟花显示
            this.fireworksMaterial.uniforms.uSize.value = 20
            this.fireworksMaterial.uniforms.uTime.value = time

            if (time > 5) {
                this.fireworksMaterial.uniforms.uSize.value = 0
                this.fireworks.clear()
                this.fireworkGeometry.dispose()
                this.fireworksMaterial.dispose()
                this.scene.remove(this.fireworks)
                this.scene.remove(this.startPoint)
                return 'remove'
            }
        }
    }
}
