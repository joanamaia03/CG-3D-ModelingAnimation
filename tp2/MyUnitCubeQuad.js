import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(this.scene);
	}
	
	display() {

        //-0.5 x face

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(3*Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //0.5 x face

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //-0.5 y face

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //0.5 y face

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(3*Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //-0.5 z face

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //0.5 z face

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();
    }
}
