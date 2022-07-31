precision lowp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
    vec4 modePosition = modelMatrix * vec4(position, 1.0);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modePosition;
}
