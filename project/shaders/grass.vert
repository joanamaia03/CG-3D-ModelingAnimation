#version 100
precision mediump float;

attribute vec2 aTextureCoord;
attribute vec3 aVertexPosition;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform float uTime;
varying vec2 vTextureCoord;

void main(void) {
    vec3 pos = aVertexPosition;
    if (pos.y >0.5){
        pos.z = pos.z + sin(uTime + pos.y) * 0.2;
    }
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
    vTextureCoord = aTextureCoord;
}