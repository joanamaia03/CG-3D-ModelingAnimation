import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyParallelogram } from './MyParallelogram.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
	}
	
	display() {

        //green diamond
    
        this.scene.pushMatrix();
        let rot2 = [Math.cos(Math.PI/4), -Math.sin(Math.PI/4), 0, 0,
            Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
        this.scene.multMatrix(rot2);
        this.scene.setDiffuse(0, 1, 0, 1);
        this.diamond.display();
        this.scene.popMatrix();

        //purple small triangle

        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.scene.setDiffuse(150/255, 80/255, 190/255, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        //red small triangle

        this.scene.pushMatrix();
        this.scene.translate(0, -Math.sqrt(2), 0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.setDiffuse(1, 27/255, 27/255, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        //yellow parallelogram

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2)/2, 2*Math.sqrt(2)+Math.sqrt(2)/2, 0);
        this.scene.rotate(7*Math.PI/4,0,0,1);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.setDiffuse(1, 1, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();
        
        //orange big triangle

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)+Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.setDiffuse(1, 157/255, 0, 1);
        this.triangleBig.display();
        this.scene.popMatrix();

        //blue big triangle

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2)-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
        this.scene.rotate(7*Math.PI/4,0,0,1);
        this.scene.setDiffuse(0, 155/255, 1, 1);
        this.triangleBig.display();
        this.scene.popMatrix();

        //pink triangle

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)+Math.sqrt(2)/2, -Math.sqrt(2)/2, 0);
        this.scene.rotate(5*Math.PI/4,0,0,1);
        this.scene.setDiffuse(1, 155/255, 207/255, 1);
        this.triangle.display();
        this.scene.popMatrix();
    }
}
