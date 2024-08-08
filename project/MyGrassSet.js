import {CGFobject} from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';
/**
* MyGrassSet
* @constructor
* @param scene - Reference to MyScene object
*/
export class MyGrassSet extends CGFobject {
    constructor(scene,matrixSize, rockPositions){
        super(scene);
        this.grass = [];
        this.matrixSize = matrixSize;
        this.rockPositions = rockPositions;
        for(var i = 0; i < this.matrixSize; i++){
            this.grass[i] = [];
            for (let j = 0; j < this.matrixSize; j++) {
                if(!this.isRockAtPosition(i, j)){
                    this.grass[i].push(new MyGrass(this.scene, Math.random()*1+0.5));
                }
                else{
                    this.grass[i].push(null);
                }
            }
        }
    }

    isRockAtPosition(x, z) {
        for (let pos of this.rockPositions) {
            if (pos[0] === x && pos[1] === z) {
                return true;
            }
        }
        return false;
    }

    display(){
        for(var i = 0; i < this.matrixSize; i++){
            for (let j = 0; j < this.matrixSize; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i*1.5,0,j*1.5);
                this.grass[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}