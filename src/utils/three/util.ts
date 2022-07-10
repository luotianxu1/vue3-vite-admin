import * as THREE from 'three'
import Stats from 'stats.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

function addHouseAndTree(scene) {
    createBoundingWall(scene)
    createGroundPlane(scene)
    createHouse(scene)
    createTree(scene)

    function createBoundingWall(scene) {
        const wallLeft = new THREE.BoxGeometry(70, 2, 2)
        const wallRight = new THREE.BoxGeometry(70, 2, 2)
        const wallTop = new THREE.BoxGeometry(2, 2, 50)
        const wallBottom = new THREE.BoxGeometry(2, 2, 50)

        const wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xa0522d
        })

        const wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial)
        const wallRightMesh = new THREE.Mesh(wallRight, wallMaterial)
        const wallTopMesh = new THREE.Mesh(wallTop, wallMaterial)
        const wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial)

        wallLeftMesh.position.set(15, 1, -25)
        wallRightMesh.position.set(15, 1, 25)
        wallTopMesh.position.set(-19, 1, 0)
        wallBottomMesh.position.set(49, 1, 0)

        scene.add(wallLeftMesh)
        scene.add(wallRightMesh)
        scene.add(wallBottomMesh)
        scene.add(wallTopMesh)
    }

    function createGroundPlane(scene) {
        // create the ground plane
        const planeGeometry = new THREE.PlaneGeometry(70, 50)
        const planeMaterial = new THREE.MeshPhongMaterial({
            color: 0x9acd32
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI
        plane.position.x = 15
        plane.position.y = 0
        plane.position.z = 0

        scene.add(plane)
    }

    function createHouse(scene) {
        const roof = new THREE.ConeGeometry(5, 4)
        const base = new THREE.CylinderGeometry(5, 5, 6)

        // create the mesh
        const roofMesh = new THREE.Mesh(
            roof,
            new THREE.MeshPhongMaterial({
                color: 0x8b7213
            })
        )
        const baseMesh = new THREE.Mesh(
            base,
            new THREE.MeshPhongMaterial({
                color: 0xffe4c4
            })
        )

        roofMesh.position.set(25, 8, 0)
        baseMesh.position.set(25, 3, 0)

        roofMesh.receiveShadow = true
        baseMesh.receiveShadow = true
        roofMesh.castShadow = true
        baseMesh.castShadow = true

        scene.add(roofMesh)
        scene.add(baseMesh)
    }

    /**
     * Add the tree to the scene
     * @param scene The scene to add the tree to
     */
    function createTree(scene) {
        const trunk = new THREE.BoxGeometry(1, 8, 1)
        const leaves = new THREE.SphereGeometry(4)

        // create the mesh
        const trunkMesh = new THREE.Mesh(
            trunk,
            new THREE.MeshPhongMaterial({
                color: 0x8b4513
            })
        )
        const leavesMesh = new THREE.Mesh(
            leaves,
            new THREE.MeshPhongMaterial({
                color: 0x00ff00
            })
        )

        // position the trunk. Set y to half of height of trunk
        trunkMesh.position.set(-10, 4, 0)
        leavesMesh.position.set(-10, 12, 0)

        trunkMesh.castShadow = true
        trunkMesh.receiveShadow = true
        leavesMesh.castShadow = true
        leavesMesh.receiveShadow = true

        scene.add(trunkMesh)
        scene.add(leavesMesh)
    }
}

function addDefaultCubeAndSphere(scene) {
    // create a cube
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true

    // position the cube
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    // add the cube to the scene
    scene.add(cube)

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    // position the sphere
    sphere.position.x = 20
    sphere.position.y = 0
    sphere.position.z = 2
    sphere.castShadow = true

    // add the sphere to the scene
    scene.add(sphere)

    return {
        cube: cube,
        sphere: sphere
    }
}

function addGroundPlane(scene) {
    const planeGeometry = new THREE.PlaneGeometry(60, 20, 120, 120)
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    scene.add(plane)
    return plane
}

const addLargeGroundPlane = (scene, useTexture?) => {
    const withTexture = useTexture !== null ? useTexture : false

    const planeGeometry = new THREE.PlaneGeometry(10000, 10000)
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    })
    if (withTexture) {
        const textureLoader = new THREE.TextureLoader()
        planeMaterial.map = textureLoader.load(
            'src/assets/img/three/texture/general/floor-wood.jpg'
        )
        planeMaterial.map.wrapS = THREE.RepeatWrapping
        planeMaterial.map.wrapT = THREE.RepeatWrapping
        planeMaterial.map.repeat.set(80, 80)
    }
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0
    scene.add(plane)
    return plane
}

// 初始化相机
const initCamera = (initialPosition?) => {
    let position
    if (!initialPosition) {
        position = new THREE.Vector3(-30, 40, 30)
    } else {
        position = initialPosition
    }

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.copy(position)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    return camera
}

// 初始化坐标轴
const initAxes = (scene) => {
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)
}

// 初始化帧率
const initStats = (el: HTMLElement) => {
    const stats = new Stats()
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'absolute'
    stats.dom.style.left = '0px'
    stats.dom.style.top = '0px'
    el && el.appendChild(stats.dom)
    return stats
}

const initCameraControl = (camera, domElement) => {
    const controls = new OrbitControls(camera, domElement)
    controls.update()
    return controls
}

const initLargeGroundPlane = (scene) => {
    const planeGeometry = new THREE.PlaneGeometry(10000, 10000)
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0
    scene.add(plane)
    return plane
}

const initDefaultLighting = (scene, initialPosition?) => {
    const position = initialPosition || new THREE.Vector3(-10, 30, 40)
    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.copy(position)
    spotLight.shadow.mapSize.width = 2048
    spotLight.shadow.mapSize.height = 2048
    spotLight.shadow.camera.fov = 15
    spotLight.castShadow = true
    spotLight.decay = 2
    spotLight.penumbra = 0.05
    spotLight.name = 'spotLight'
    scene.add(spotLight)
    const ambientLight = new THREE.AmbientLight(0x343434)
    ambientLight.name = 'ambientLight'
    scene.add(ambientLight)
}

const initAmbientLight = (scene) => {
    const ambientLight = new THREE.AmbientLight(0x343434)
    ambientLight.name = 'ambientLight'
    scene.add(ambientLight)
}

const addGeometry = (scene, geom, name, texture) => {
    const mat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.2,
        roughness: 0.07
    })
    const mesh = new THREE.Mesh(geom, mat)
    mesh.castShadow = true
    scene.add(mesh)
    return mesh
}

const gosper = (a, b) => {
    let turtle = [0, 0, 0]
    let points: any = []
    let count = 0

    rg(a, b, turtle)

    return points

    function rt(x) {
        turtle[2] += x
    }

    function lt(x) {
        turtle[2] -= x
    }

    function fd(dist) {
        //                ctx.beginPath();
        points.push({
            x: turtle[0],
            y: turtle[1],
            z: Math.sin(count) * 5
        })
        //                ctx.moveTo(turtle[0], turtle[1]);

        let dir = turtle[2] * (Math.PI / 180)
        turtle[0] += Math.cos(dir) * dist
        turtle[1] += Math.sin(dir) * dist

        points.push({
            x: turtle[0],
            y: turtle[1],
            z: Math.sin(count) * 5
        })
        //                ctx.lineTo(turtle[0], turtle[1]);
        //                ctx.stroke();
    }

    function rg(st, ln, turtle) {
        st--
        ln = ln / 2.6457
        if (st > 0) {
            //                    ctx.strokeStyle = '#111';
            rg(st, ln, turtle)
            rt(60)
            gl(st, ln, turtle)
            rt(120)
            gl(st, ln, turtle)
            lt(60)
            rg(st, ln, turtle)
            lt(120)
            rg(st, ln, turtle)
            rg(st, ln, turtle)
            lt(60)
            gl(st, ln, turtle)
            rt(60)
        }
        if (st === 0) {
            fd(ln)
            rt(60)
            fd(ln)
            rt(120)
            fd(ln)
            lt(60)
            fd(ln)
            lt(120)
            fd(ln)
            fd(ln)
            lt(60)
            fd(ln)
            rt(60)
        }
    }

    function gl(st, ln, turtle) {
        st--
        ln = ln / 2.6457
        if (st > 0) {
            //                    ctx.strokeStyle = '#555';
            lt(60)
            rg(st, ln, turtle)
            rt(60)
            gl(st, ln, turtle)
            gl(st, ln, turtle)
            rt(120)
            gl(st, ln, turtle)
            rt(60)
            rg(st, ln, turtle)
            lt(120)
            rg(st, ln, turtle)
            lt(60)
            gl(st, ln, turtle)
        }
        if (st === 0) {
            lt(60)
            fd(ln)
            rt(60)
            fd(ln)
            fd(ln)
            rt(120)
            fd(ln)
            rt(60)
            fd(ln)
            lt(120)
            fd(ln)
            lt(60)
            fd(ln)
        }
    }
}

const createGhostTexture = () => {
    let canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32

    let ctx: any = canvas.getContext('2d')
    // the body
    ctx.translate(-81, -84)

    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.moveTo(83, 116)
    ctx.lineTo(83, 102)
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88)
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102)
    ctx.lineTo(111, 116)
    ctx.lineTo(106.333, 111.333)
    ctx.lineTo(101.666, 116)
    ctx.lineTo(97, 111.333)
    ctx.lineTo(92.333, 116)
    ctx.lineTo(87.666, 111.333)
    ctx.lineTo(83, 116)
    ctx.fill()

    // the eyes
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(91, 96)
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101)
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106)
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101)
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96)
    ctx.moveTo(103, 96)
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101)
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106)
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101)
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96)
    ctx.fill()

    // the pupils
    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true)
    ctx.fill()

    let texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    return texture
}

export {
    addHouseAndTree,
    addDefaultCubeAndSphere,
    addGroundPlane,
    initCamera,
    initAxes,
    initStats,
    initCameraControl,
    gosper,
    initLargeGroundPlane,
    initDefaultLighting,
    initAmbientLight,
    createGhostTexture,
    addGeometry,
    addLargeGroundPlane
}
