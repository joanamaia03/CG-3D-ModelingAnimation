import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject{
	constructor(scene,height) {
        super(scene);
        this.rectangle = new MyQuad(this.scene);
        this.triangle = new MyTriangleSmall(this.scene);
        this.height = height;
    }

    display(){

        //rectangle
        this.scene.pushMatrix();
        this.scene.scale(1,this.height,1);
        this.scene.translate(0,0.5,0);
        this.scene.setDiffuse(0, 128/255, 0);
        this.rectangle.display();
        this.scene.popMatrix();

        //triangle
        this.scene.pushMatrix();
        this.scene.translate(0,1*this.height,0);
        this.scene.rotate(-Math.PI/10,1,0,0);
        this.triangle.display();
        this.scene.popMatrix();
    }
}

