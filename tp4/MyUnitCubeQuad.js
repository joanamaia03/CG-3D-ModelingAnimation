import {CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, topTexture, frontTexture, rightTexture, backTexture, leftTexture, bottomTexture) {
		super(scene);
        this.quad = new MyQuad(this.scene);
        this.topTexture = topTexture;
        this.frontTexture = frontTexture;
        this.rightTexture = rightTexture;
        this.backTexture = backTexture;
        this.leftTexture = leftTexture;
        this.bottomTexture = bottomTexture;
	}
	
	display() {

        //0.5 y face - Top

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(3*Math.PI/2, 1, 0, 0);
        this.topTexture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //0.5 x face - Front

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.frontTexture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //-0.5 z face - Right

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.rightTexture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //-0.5 x face - Back

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(3*Math.PI/2, 0, 1, 0);
        this.backTexture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

       //0.5 z face - Left

       this.scene.pushMatrix();
       this.scene.translate(0,0,0.5);
       this.leftTexture.bind();
       this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
       this.quad.display();
       this.scene.popMatrix();

        //-0.5 y face - Bottom

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.bottomTexture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

     

       

        
    }
}
