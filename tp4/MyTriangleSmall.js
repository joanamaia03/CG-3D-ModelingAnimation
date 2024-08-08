import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, tCoords) {
		super(scene);
		this.texCoords = tCoords;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0,	//2
			-1, 0, 0,	//0a
			1, 0, 0,	//1a
			0, 1, 0,	//2a
		];

		this.normals = [
			0,0,1,		//0
			0,0,1,		//1
			0,0,1,		//2
			0,0,-1,		//0a
			0,0,-1,		//1a
			0,0,-1,		//2a
			0,0,-1,		//3a
		]

		//Counter-clockwise reference of vertices
		this.indices = [
			0,1,2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}