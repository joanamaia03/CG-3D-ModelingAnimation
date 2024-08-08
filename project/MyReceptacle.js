import {CGFobject} from '../lib/CGF.js';
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
	constructor(scene,slices,stacks,radius,inside) {
		super(scene);
		this.slices=slices;
        this.stacks=stacks*2;
        this.radius=radius;
        this.inside=inside;
        this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        var angX = 0;
        var angH = 0;
        var xAng = Math.PI/this.stacks;
        var hAng = 2*Math.PI/this.slices;
        var t = this.slices + 1;
        this.texCoords = [];
        
        for(var j = 0; j <= this.stacks; j++){
            angH = 0;
            for(var i = 0; i <= this.slices; i++){
                this.vertices.push(Math.cos(angH)*Math.sin(angX)*this.radius, Math.cos(angX)*this.radius, Math.sin(-angH)*Math.sin(angX)*this.radius);
                if (j < this.stacks && i < this.slices) {
                    var a = j * t + i;
                    var n = a + t;
                    if (this.inside == -1){
                        this.indices.push(a + 1, a, n);
                        this.indices.push(a + 1, n, n +1);
                    } else {
                        this.indices.push(n, a, a + 1);
                        this.indices.push(n + 1, n, a + 1);
                    }
                }
                this.texCoords.push(i/this.slices, j/this.stacks)
                this.normals.push(Math.cos(angH)*Math.sin(angX)*-this.inside, Math.cos(angX)*-this.inside, Math.sin(-angH)*Math.sin(angX)*-this.inside);
                angH+=hAng;
            }
            angX+=xAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
    updateBuffers(nStacks, nSlices){
        this.slices = nSlices;
        this.stacks = nStacks * 2;

        this.initBuffers();
        this.initNormalVizBuffers();
    }
}