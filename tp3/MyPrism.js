import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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

        for(var j = 0; j < this.stacks; j++){
            for(var i = 0; i < this.slices; i++){
                this.vertices.push(Math.cos(ang), Math.sin(ang),height*j, Math.cos(ang+alphaAng), Math.sin(ang+alphaAng),height*j,Math.cos(ang), Math.sin(ang),height*(j+1), Math.cos(ang+alphaAng), Math.sin(ang+alphaAng),height*(j+1));
                this.indices.push(idx+2, idx, idx+1, idx+1, idx+3, idx+2);
                var x = Math.cos(0.5*alphaAng+ang);
                var y = Math.sin(0.5*alphaAng+ang);
                this.normals.push(x/Math.sqrt(x*x + y*y),y/Math.sqrt(x*x + y*y),0,x/Math.sqrt(x*x + y*y),y/Math.sqrt(x*x + y*y),0, x/Math.sqrt(x*x + y*y),y/Math.sqrt(x*x + y*y),0, x/Math.sqrt(x*x + y*y),y/Math.sqrt(x*x + y*y),0);
                ang+=alphaAng;
                idx+=4;
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