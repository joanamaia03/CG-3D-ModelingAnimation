import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene,MaxP,MinP) {
		super(scene);
		this.initBuffers();
		this.petal = new MyTriangle(this.scene);
		this.angle = Math.random()*(MaxP-(MinP))+(MinP);
	}

	display(){

		//triangle up
		this.scene.pushMatrix();
		this.scene.translate(0,2,0);
		this.scene.rotate(this.angle,1,0,0);
		this.petal.display();
		this.scene.popMatrix();

		//triangle down
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0);
		this.scene.translate(0,-2,0);
		this.petal.display();
		this.scene.popMatrix();
	}
}