import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene,slices,stacks) {
		super(scene);
		this.slices=slices;
        this.stacks=stacks;
        this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var height = 1/this.stacks;
        var idx = 0;

        for(var j = 0; j <= this.stacks; j++){
            for(var i = 0; i < this.slices; i++){
                this.vertices.push(Math.cos(ang), Math.sin(ang),height*j);
                var x = Math.cos(ang);
                var y = Math.sin(ang);
                if(i != this.slices-1 && j != this.stacks){
                    this.indices.push(idx, idx+1, idx+this.slices+1, idx+this.slices+1, idx+this.slices, idx);
                } else if (i == this.slices-1 && j != this.stacks) {
                    this.indices.push(idx, idx-this.slices+1, idx+1, idx+this.slices, idx, idx+1);
                }
                this.normals.push(x/Math.sqrt(x*x + y*y),y/Math.sqrt(x*x + y*y),0);
                ang+=alphaAng;
                idx+=1;
            }
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}