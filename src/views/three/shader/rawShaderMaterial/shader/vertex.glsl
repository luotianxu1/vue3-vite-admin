precision lowp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 modePosition = modelMatrix * vec4(position, 1.0);
    // modePosition.x += 1.0;
    // modePosition.z += 1.0;
    modePosition.z += modePosition.x;
    gl_Position = projectionMatrix * viewMatrix * modePosition;
}
