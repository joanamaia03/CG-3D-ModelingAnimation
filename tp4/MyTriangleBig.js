import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene, tCoords) {
		super(scene);
		this.texCoords = tCoords;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-2, 0, 0,	//0
			2, 0, 0,	//1
			0, 2, 0,	//2
			-2, 0, 0,	//0a
			2, 0, 0,	//1a
			0, 2, 0,	//2a
		];

		this.normals = [
			0,0,1,		//0
			0,0,1,		//1
			0,0,1,		//2
			0,0,-1,		//0a
			0,0,-1,		//1a
			0,0,-1,		//2a
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