#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uPanorama;
uniform sampler2D uCloud;
uniform float uTime;

void main() {
    vec2 tiledCoords = mod(vTextureCoord + vec2(uTime * 0.005, 0.0), 1.0);
    vec4 cloudColor = texture2D(uCloud, tiledCoords);
    vec4 panoramaColor = texture2D(uPanorama, vTextureCoord);

    float rot = 0.3;
    vec4 color = mix(panoramaColor, cloudColor, rot);

    gl_FragColor = color;
}