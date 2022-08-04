precision lowp float;

varying vec2 vUv;

attribute int imgIndex;
varying int vImgIndex;

void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position =  projectionMatrix * viewPosition;

    // 设置点大小
    gl_PointSize = 80.0;
    vUv = uv;
    vImgIndex = imgIndex;
}

