import {CGFobject} from '../lib/CGF.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene,slices,stacks,radius,height) {
		super(scene);
		this.slices=slices;
        this.stacks=stacks;
        this.radius=radius;
        this.height=height;
        this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var height = -this.height/this.stacks;
        var idx = 0;
        this.texCoords = [];

        for(var j = 0; j <= this.stacks; j++){
            ang = 0;
            for(var i = 0; i <= this.slices; i++){
                this.vertices.push(this.radius*Math.cos(ang), height*j, this.radius*Math.sin(ang));
                var x = Math.cos(ang);
                var y = Math.sin(ang);
                if(j != this.stacks){
                    this.indices.push(idx, idx+1, idx+this.slices+1, idx+this.slices+2, idx+this.slices+1, idx+1);
                } else if (i == this.slices && j != this.stacks) {
                    this.indices.push(idx, idx-this.slices+1, idx+1, idx+this.slices, idx, idx+1);
                }
                this.texCoords.push(i/this.slices, j/this.stacks)
                this.normals.push(x/Math.sqrt(x*x + y*y),0,y/Math.sqrt(x*x + y*y));
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