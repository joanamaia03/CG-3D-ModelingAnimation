import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
        this.triangleBigBlue = new MyTriangleBig(this.scene, [0, 0, 0.5, 0.5, 1, 0]);
        this.triangleBigOrange = new MyTriangleBig(this.scene, [1, 0, 0.5, 0.5, 1, 1]);
        this.triangleSmallBlue = new MyTriangleSmall(this.scene, [0, 0, 0, 0.5, 0.25, 0.25]);
        this.triangleSmallRed = new MyTriangleSmall(this.scene, [0.25, 0.75, 0.5, 0.5, 0.75, 0.75]);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initMaterials();
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
        this.color1.apply();
        this.texture.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //purple small triangle

        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.color2.apply();
        this.texture.apply();
        this.triangleSmallBlue.display();
        this.scene.popMatrix();

        //red small triangle

        this.scene.pushMatrix();
        this.scene.translate(0, -Math.sqrt(2), 0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.color3.apply();
        this.texture.apply();
        this.triangleSmallRed.display();
        this.scene.popMatrix();

        //yellow parallelogram

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2)/2, 2*Math.sqrt(2)+Math.sqrt(2)/2, 0);
        this.scene.rotate(7*Math.PI/4,0,0,1);
        this.scene.rotate(Math.PI,1,0,0);
        this.color4.apply();
        this.texture.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        
        //orange big triangle

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)+Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.color5.apply();
        this.texture.apply();
        this.triangleBigOrange.display();
        this.scene.popMatrix();

        //blue big triangle

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2)-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
        this.scene.rotate(7*Math.PI/4,0,0,1);
        this.color6.apply();
        this.texture.apply();
        this.triangleBigBlue.display();
        this.scene.popMatrix();

        //pink triangle

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)+Math.sqrt(2)/2, -Math.sqrt(2)/2, 0);
        this.scene.rotate(5*Math.PI/4,0,0,1);
        this.color7.apply();
        this.texture.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.diamond.enableNormalViz()
        this.triangle.enableNormalViz()
        this.triangleBig.enableNormalViz()
        this.triangleSmall.enableNormalViz()
        this.parallelogram.enableNormalViz()
    }

    disableNormalViz(){
        this.diamond.disableNormalViz()
        this.triangle.disableNormalViz()
        this.triangleBig.disableNormalViz()
        this.triangleSmall.disableNormalViz()
        this.parallelogram.disableNormalViz()
    };

    initMaterials() {

        //green diamond
        this.color1 = new CGFappearance(this.scene);
        this.color1.setAmbient(0,0,0,1.0);
        this.color1.setDiffuse(0, 1.0, 0, 1.0);
        this.color1.setSpecular(0.8,0.8,0.8,1.0);
        this.color1.setShininess(10.0);

        //purple small triangle
        this.color2 = new CGFappearance(this.scene);
        this.color2.setAmbient(0,0,0,1.0);
        this.color2.setDiffuse(150/255, 80/255, 190/255, 1.0);
        this.color2.setSpecular(0.8,0.8,0.8,1.0);
        this.color2.setShininess(10.0);

        //red small triangle
        this.color3 = new CGFappearance(this.scene);
        this.color3.setAmbient(0,0,0,1.0);
        this.color3.setDiffuse(1.0, 27/255, 27/255, 1.0);
        this.color3.setSpecular(0.8,0.8,0.8,1.0);
        this.color3.setShininess(10.0);

        //yellow parallelogram
        this.color4 = new CGFappearance(this.scene);
        this.color4.setAmbient(0,0,0,1.0);
        this.color4.setDiffuse(1.0, 1.0, 0, 1.0);
        this.color4.setSpecular(0.8,0.8,0.8,1.0);
        this.color4.setShininess(10.0);

        //orange big triangle
        this.color5 = new CGFappearance(this.scene);
        this.color5.setAmbient(0,0,0,1.0);
        this.color5.setDiffuse(1.0, 157/255, 0, 1.0);
        this.color5.setSpecular(0.8,0.8,0.8,1.0);
        this.color5.setShininess(10.0);

        //blue big triangle
        this.color6 = new CGFappearance(this.scene);
        this.color6.setAmbient(0,0,0,1.0);
        this.color6.setDiffuse(0, 155/255, 1.0, 1.0);
        this.color6.setSpecular(0.8,0.8,0.8,1.0);
        this.color6.setShininess(10.0);

        //pink triangle
        this.color7 = new CGFappearance(this.scene);
        this.color7.setAmbient(0,0,0,1.0);
        this.color7.setDiffuse(1.0, 155/255, 207/255, 1.0);
        this.color7.setSpecular(0.8,0.8,0.8,1.0);
        this.color7.setShininess(10.0);

        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/tangram.png');
    }
}
