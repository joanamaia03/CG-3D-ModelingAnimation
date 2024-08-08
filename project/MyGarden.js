import {CGFobject} from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
/**
* MyGarden
* @constructor
* @param scene - Reference to MyScene object
*/
export class MyGarden extends CGFobject {
    constructor(scene,matrixSize){
        super(scene);
        this.matrixSize = matrixSize;
        this.flowers = [];
        this.pollens = [];
        for(var i = 0; i < this.matrixSize; i++){
            this.flowers[i] = [];
            for (let j = 0; j < this.matrixSize; j++) {
                var flowerRadius = Math.random()*(2-(1))+(1);
                var stemColor = [Math.random()*0.45,Math.random()*(1-(0.55))+(0.55),Math.random()*0.2,1];
                this.flowers[i].push(new MyFlower(this.scene,Math.floor(Math.random()*(8-(5))+(5)),flowerRadius,Math.random()*((flowerRadius+3)-(flowerRadius+1.5))+(flowerRadius+1.5),Math.random()*(0.6-(0.3))+(0.3),Math.floor(Math.random()*(6-(2))+(2)),[Math.random(),Math.random(),Math.random(),1],[1,1,0,1],stemColor,stemColor,Math.PI/8,-Math.PI/8));
            }
        }
    }

    display(){
        for(var i = 0; i < this.matrixSize; i++){
            for (let j = 0; j < this.matrixSize; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i*10,0,j*10);
                this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}