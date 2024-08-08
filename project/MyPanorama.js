import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {

    constructor(scene, texture) {
        super(scene)
        this.texture = texture;
        this.sphere = new MySphere(this.scene, 50, 50, 200, 1)
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
        this.cloudMaterial = new CGFtexture(this.scene, "images/cloudTexture.jpg");
        this.cloudShader = new CGFshader(this.scene.gl, "shaders/cloud.vert", "shaders/cloud.frag");
        this.cloudShader.setUniformsValues({uPanorama: 1, uCloud: 2});
    }

    update(t) {
        this.cloudShader.setUniformsValues({ uTime: t });
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.setActiveShader(this.cloudShader);
        this.texture.bind(1);
        this.cloudMaterial.bind(2);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}