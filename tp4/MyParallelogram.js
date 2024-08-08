import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
			3, 1, 0,	//3
			0, 0, 0,	//0a
			1, 1, 0,	//1a
			2, 0, 0,	//2a
			3, 1, 0		//3a
		];

		this.normals = [
			0,0,-1,		//0
			0,0,-1,		//1
			0,0,-1,		//2
			0,0,-1,		//3
			0,0,1,		//0a
			0,0,1,		//1a
			0,0,1,		//2a
			0,0,1,		//3a
		]

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 3,
            1, 2, 0,
            3, 2, 1
		];

		this.texCoords = [
			0.25, 0.75,
			0.75, 0.75, 
			0.5, 1,
			1, 1,
		]


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
