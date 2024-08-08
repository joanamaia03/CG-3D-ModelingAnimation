import {CGFobject} from '../lib/CGF.js';
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
	constructor(scene,slices,stacks,radius) {
		super(scene);
		this.slices=slices;
        this.stacks=stacks*2;
        this.radius=radius;
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
                var random = Math.random()/5;
                if(i==this.slices){
                    console.log(this.vertices);
                    this.vertices.push(this.vertices[j*(this.slices+1)*3],this.vertices[j*(this.slices+1)*3+1],this.vertices[j*(this.slices+1)*3+2]);
                }else {
                    this.vertices.push((Math.cos(angH)*Math.sin(angX)*this.radius) - random,(Math.cos(angX)*this.radius) - random,(Math.sin(-angH)*Math.sin(angX)*this.radius) - random);
                }
                if (j < this.stacks && i < this.slices) {
                    var a = j * t + i;
                    var n = a + t;
                    this.indices.push(a + 1, a, n);
                    this.indices.push(a + 1, n, n +1);
                }
                this.texCoords.push(i/this.slices, j/this.stacks)
                this.normals.push(Math.cos(angH)*Math.sin(angX), Math.cos(angX), Math.sin(-angH)*Math.sin(angX));
                angH+=hAng;
            }
            angX+=xAng;
        }
        this.initGLBuffers();
	}
    updateBuffers(nStacks, nSlices){
        this.slices = nSlices;
        this.stacks = nStacks * 2;

        this.initBuffers();
        this.initNormalVizBuffers();
    }
}