precision lowp float;

varying vec2 vUv;
varying float vImgIndex;
varying vec3 vColor;

attribute float imgIndex;
attribute float aScale;

uniform float uTime;

void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    // 获取定点的角度
    float angle = atan(modelPosition.x, modelPosition.z);
    // 获取顶点到中心的距离
    float distanceToCenter = length(modelPosition.xz);
    // 根据顶点到中心的距离设置旋转偏移度数
    float angleOffset = 1.0 / distanceToCenter * uTime;
    angle += angleOffset;

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position =  projectionMatrix * viewPosition;

    // 设置点大小
    // gl_PointSize = 100.0;
    // 根据viewPosition的z坐标决定是否远离相机
    gl_PointSize = 200.0 / -viewPosition.z * aScale;
    vUv = uv;
    vImgIndex = imgIndex;
    vColor = color;
}

