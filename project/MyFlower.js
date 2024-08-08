import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
/**
* MyFlower
* @constructor
* @param scene - Reference to MyScene object
*/
export class MyFlower extends CGFobject {
	constructor(scene,Npetals,Hradius,Fradius,Cradius,Cheight,Pcolor,Hcolor,Ccolor,Lcolor,MaxP,MinP) {
		super(scene);
        this.Npetals = Npetals;
        this.Hradius = Hradius;
        this.ScaleSize = (Fradius-Hradius)/2;
        this.TranslateCoords = Hradius;
        this.Pcolor = Pcolor;
        this.Hcolor = Hcolor;
        this.Ccolor = Ccolor;
        this.Lcolor = Lcolor;
        this.Hradius = Hradius;
        this.height = 0;
        this.random = Math.random();
        this.petal = new MyPetal(this.scene,Math.PI/4,0);
        this.receptacle = new MyReceptacle(this.scene,50,50,Hradius,-1);
        this.leafCil = new MyStem(this.scene,50,50,Cradius,2);
        this.heights = [];
        this.pollen = new MyPollen(this.scene,10,5,0.5,-1,2,1.5);
        for(var i = 0; i < Cheight; i++){
            this.heights.push(Math.random()*(2-(1))+(2));
        }
        this.stems = [];
        for(var i = 0; i < Cheight; i++){
            this.stems.push(new MyStem(this.scene,50,50,Cradius,this.heights[i]));
        }
        this.angle = [];
        for(var i = 0; i < this.Npetals; i++){
            this.angle.push(Math.random()*(MaxP-(MinP))+(MinP));
        }
        this.Cangle = [];
        for(var i = 0; i < Cheight; i++){
            this.Cangle.push(Math.random()*(Math.PI/24-(-Math.PI/24))+(-Math.PI/24));
        }
        this.Langle = [];
        for(var i = 0; i < 3*Cheight; i++){
            this.Langle.push(Math.random()*(3*Math.PI/5-(4*Math.PI/5))+(4*Math.PI/5));
        }
        this.LangleY = [];
        for(var i = 0; i < 3*Cheight; i++){
            this.LangleY.push(Math.random()*(2*Math.PI));
        }
        this.initMaterials();
	}   

    initMaterials() {
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setTexture(new CGFtexture(this.scene, "./images/petalTexture.jpg"));
        this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setTexture(new CGFtexture(this.scene, "./images/leafTexture.jpg"));
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setTexture(new CGFtexture(this.scene, "./images/stemTexture.jpg"));
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setTexture(new CGFtexture(this.scene, "./images/receptacleTexture.jpg"));
        this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');

        
        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setTexture(new CGFtexture(this.scene, "./images/pollenTexture.jpg"));
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        var Pradius = 0;
        var PradiusInc = 2*Math.PI/this.Npetals;
    
        //stem & leafs
        var temp = 0;
        for(var i = 0; i < this.stems.length; i++){
            temp += this.heights[i]-0.2;
            if(i%2 == 0){
                this.scene.pushMatrix();
                this.stemMaterial.apply()
                this.scene.setDiffuse(this.Ccolor[0],this.Ccolor[1],this.Ccolor[2],this.Ccolor[3]);
                this.scene.translate(0,temp,0);
                if(i == 0){
                    this.scene.rotate(this.Cangle[i],1,1,1);
                } else{
                    this.scene.rotate(-this.Cangle[i-1],1,1,1);
                }
                this.stems[i].display();
                this.scene.popMatrix();
                if(i != this.stems.length-1){
                    this.scene.pushMatrix();
                    this.leafMaterial.apply();
                    this.scene.setDiffuse(this.Lcolor[0],this.Lcolor[1],this.Lcolor[2],this.Lcolor[3]);
                    this.scene.translate(0,temp,0);
                    this.scene.scale(3*this.ScaleSize/5,3*this.ScaleSize/5,3*this.ScaleSize/5);
                    this.scene.rotate(this.LangleY[i],0,1,0);
                    this.scene.rotate(this.Langle[i],1,0,1);
                    this.petal.display();
                    this.scene.popMatrix();

                    this.scene.pushMatrix();
                    this.stemMaterial.apply()
                    this.scene.setDiffuse(this.Lcolor[0],this.Lcolor[1],this.Lcolor[2],this.Lcolor[3]);
                    this.scene.translate(0,temp,0);
                    this.scene.rotate(this.LangleY[i],0,1,0);
                    this.scene.rotate(Math.PI+this.Langle[i],1,0,1);
                    this.scene.scale(1*this.ScaleSize/5,3*this.ScaleSize/5,1*this.ScaleSize/5);
                    this.leafCil.display();
                    this.scene.popMatrix();
                }
            }else{
                this.scene.pushMatrix();
                this.stemMaterial.apply()
                this.scene.setDiffuse(this.Ccolor[0],this.Ccolor[1],this.Ccolor[2],this.Ccolor[3]);
                this.scene.translate(0,temp,0);
                this.scene.translate(0,-this.heights[i],0);
                this.scene.rotate(this.Cangle[i],1,1,1);
                this.scene.translate(0,this.heights[i],0);
                this.stems[i].display();
                this.scene.popMatrix();
                if(i != this.stems.length-1){
                    this.scene.pushMatrix();
                    this.leafMaterial.apply();
                    this.scene.setDiffuse(this.Lcolor[0],this.Lcolor[1],this.Lcolor[2],this.Lcolor[3]);
                    this.scene.translate(0,temp,0);
                    this.scene.scale(3*this.ScaleSize/5,3*this.ScaleSize/5,3*this.ScaleSize/5);
                    this.scene.rotate(this.LangleY[i],0,1,0);
                    this.scene.rotate(this.Langle[i],1,0,1);
                    this.petal.display();
                    this.scene.popMatrix();

                    this.scene.pushMatrix();
                    this.stemMaterial.apply()
                    this.scene.setDiffuse(this.Lcolor[0],this.Lcolor[1],this.Lcolor[2],this.Lcolor[3]);
                    this.scene.translate(0,temp,0);
                    this.scene.rotate(this.LangleY[i],0,1,0);
                    this.scene.rotate(Math.PI+this.Langle[i],1,0,1);
                    this.scene.scale(1*this.ScaleSize/5,3*this.ScaleSize/5,1*this.ScaleSize/5);
                    this.leafCil.display();
                    this.scene.popMatrix();
                }
            }
        }

        // receptacle
        this.scene.pushMatrix();
        this.scene.translate(0,temp+this.TranslateCoords-0.2,0);
        this.receptacleMaterial.apply();
        this.scene.setDiffuse(this.Hcolor[0],this.Hcolor[1],this.Hcolor[2],this.Hcolor[3]);
        this.receptacle.display();
        this.scene.popMatrix();

        // petals
        for(var i = 0; i < this.Npetals; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,temp+this.TranslateCoords-0.2,0);
            this.scene.rotate(Math.PI/1.5,0,1,1);
            this.scene.rotate(Pradius,0,0,1);
            this.scene.translate(0,this.TranslateCoords-1,0);
            this.scene.rotate(this.angle[i],1,0,0);
            this.petalMaterial.apply();
            this.scene.scale(this.ScaleSize,this.ScaleSize,this.ScaleSize);
            this.scene.setDiffuse(this.Pcolor[0], this.Pcolor[1], this.Pcolor[2], this.Pcolor[3]);
            this.petal.display();
            this.scene.popMatrix();
            Pradius += PradiusInc;
        }
        this.height = temp;

        //pollen
        if(this.pollen != null) {
            this.scene.pushMatrix();
            this.scene.translate(0,temp + (this.Hradius*2),0);
            this.scene.rotate(Math.PI*this.random,1,1,1);
            this.pollenMaterial.apply();
            this.pollen.display();
            this.scene.popMatrix();
        }
    }
}