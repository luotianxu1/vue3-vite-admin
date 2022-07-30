precision lowp float;

varying vec2 vUv;
varying float vEvlevation;

uniform sampler2D uTexture;

void main() {
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    float deep = vEvlevation + 0.05 * 15.0;
    // gl_FragColor = vec4(1.0 * deep, 0.0, 0.0, 1.0);
    
    // 根据uv取出对应的颜色
    vec4 textureColor = texture2D(uTexture,vUv);
    textureColor.rgb *= deep;
    gl_FragColor = textureColor;
}
