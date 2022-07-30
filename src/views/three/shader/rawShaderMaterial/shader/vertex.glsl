precision lowp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
varying float vEvlevation;

// 获取时间
uniform float uTime;

void main() {
    vUv = uv;
    vec4 modePosition = modelMatrix * vec4(position, 1.0);
    // modePosition.x += 1.0;
    // modePosition.z += 1.0;
    // modePosition.z += modePosition.x;
    modePosition.z = sin((modePosition.x + uTime) * 10.0) * 0.05;
    modePosition.z += sin((modePosition.y + uTime) * 10.0) * 0.05;
    vEvlevation = modePosition.z;

    gl_Position = projectionMatrix * viewMatrix * modePosition;
}
