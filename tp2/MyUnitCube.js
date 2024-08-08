import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0
			-0.5, -0.5, 0.5,	//1
			-0.5, 0.5, -0.5,	//2
			-0.5, 0.5, 0.5,	    //3
            0.5, -0.5, -0.5,    //4
            0.5, -0.5, 0.5,	    //5
            0.5, 0.5, -0.5,     //6
            0.5, 0.5, 0.5,       //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 2, 0,    //-0.5 x face
            3, 2, 1,
            6, 5, 4,    //0.5 x face
            5, 6, 7,
            0, 4, 5,    //-0.5 y face
            0, 5, 1,
            2, 3, 6,    //0.5 y face
            7, 6, 3,
            0, 2, 4,    //-0.5 z face
            6, 4, 2,
            5, 3, 1,    //0.5 z face
            3, 5, 7
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

