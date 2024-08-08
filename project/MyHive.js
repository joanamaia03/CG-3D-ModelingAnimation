import { CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyHiveBody } from './MyHiveBody.js';
import { MyHiveTop } from './MyHiveTop.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
    constructor(scene, slices, stacks, Bradius, Bheight, Tradius, Theight) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.Bradius = Bradius;
        this.Tradius = Tradius;
        this.Bheight = Bheight;
        this.Theight = Theight;
        this.pollens = [];
        this.initMaterials();
        
        // Create MyHiveBody and MyHiveTop
        this.hiveBody = new MyHiveBody(scene, slices, stacks, Bradius, Bheight);
        this.hiveTop = new MyHiveTop(scene, slices, stacks, Tradius, Theight);

    }

    addPollen(pollen,position){
        this.pollens.push([pollen,position]);
    }

    initMaterials(){
        this.woodBodyMaterial = new CGFappearance(this.scene);
        this.woodBodyMaterial.setTexture(new CGFtexture(this.scene, "./images/woodBodyTexture.jpg"));
        this.woodBodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.woodTopMaterial = new CGFappearance(this.scene);
        this.woodTopMaterial.setTexture(new CGFtexture(this.scene, "./images/woodTopTexture.jpg"));
        this.woodTopMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setTexture(new CGFtexture(this.scene, "./images/pollenTexture.jpg"));
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        // Display MyHiveBody
        this.scene.pushMatrix();
        this.woodBodyMaterial.apply();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.hiveBody.display();
        this.scene.popMatrix();

        // Display MyHiveTop on top of MyHiveBody
        this.scene.pushMatrix();
        this.scene.translate(0,this.Bheight,0);
        this.woodTopMaterial.apply();
        this.hiveTop.display();
        this.scene.popMatrix();

        if(this.pollens.length != 0){
            for(let i = 0; i < this.pollens.length; i++){
                this.scene.pushMatrix();
                this.scene.translate(this.pollens[i][1].x-48,this.pollens[i][1].y+14.85,this.pollens[i][1].z-20);
                this.scene.rotate(this.pollens[i][1].o,0,1,0);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.pollenMaterial.apply();
                this.pollens[i][0].display();
                this.scene.popMatrix();
            }
        }
    }
}

