import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
	constructor(scene){
        super(scene);
        this.Rradius = 1;
        this.rockSet = [];
        this.rockPir = [];
        this.locations = [];
        this.offsets = [];
        this.randomX = Math.random()*20;
        this.randomZ = Math.random()*20;
        this.initMaterials();

        //rock piramide
        for (let i = 0; i < 5; i++) {
			for (let j = 0; j <= i; j++) {
				for (let k = 0; k <= i; k++) { 
					const rock = new MyRock(this.scene, 10, 5, this.Rradius);
					const offsetX = j*2*0.7 - i*2*0.7 / 2;
					const offsetY = (-i / this.Rradius*2*0.7) + this.Rradius*2*0.7*4;
					const offsetZ = k*2*0.7 - i*2*0.7 / 2;
					this.rockPir.push({ rock, offsetX, offsetY, offsetZ });
				}
			}
		}

        //rock set
        for(var i = 0; i < 100; i++){
            this.rockSet.push(new MyRock(this.scene,10,5,this.Rradius));
            this.offsets.push(Math.random() + 1);
            this.locations.push([Math.random()*60,Math.random()*60]);
        }
    }

    initMaterials() {
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setTexture(new CGFtexture(this.scene, "./images/rockTexture.jpg"));
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        //rock piramide
        for (const { rock, offsetX, offsetY, offsetZ } of this.rockPir) {
            if(offsetY != this.Rradius*2*0.7*4){
                this.scene.pushMatrix();
                this.rockMaterial.apply();
                this.scene.setDiffuse(128/255,128/255,128/255,1);
                this.scene.translate(48 + offsetX, offsetY, 20 + offsetZ);
                rock.display(); 
                this.scene.popMatrix();
            }
        }

        //rock set
        for(var j = 0; j < 100; j++){
            this.scene.pushMatrix();
            this.rockMaterial.apply();
            this.scene.setDiffuse(128/255,128/255,128/255,1);
            this.scene.translate(this.locations[j][0],1,this.locations[j][1]);
            this.scene.scale(this.offsets[j]/2, this.offsets[j]*0.4, this.offsets[this.offsets.length - j]/2);
            this.rockSet[j].display();
            this.scene.popMatrix();
        }
    }
}