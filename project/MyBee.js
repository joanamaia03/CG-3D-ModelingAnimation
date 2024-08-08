import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MySphere } from './MySphere.js';
import { MyStem } from './MyStem.js';
/**
* MyBee
* @constructor
* @param scene - Reference to MyScene object
*/
export class MyBee extends CGFobject {
	constructor(scene,Wangle) {
		super(scene);
        this.Wangle = Wangle;
        this.body = new MySphere(this.scene,50,25,0.4,-1);
        this.head = new MySphere(this.scene,50,25,0.3,-1);
        this.sting = new MyCone(this.scene,50,50);
        this.feet = new MyStem(this.scene,50,50,0.02,0.2);
        this.position = {x:0, y:0, z:0};
        this.orientation = 0;
        this.speed = 0;
        this.lastSpeed = 0;
        this.scale = 1;
        this.goToFlower = false;
        this.goBack = false;
        this.goToHive = false;
        this.check = false;
        this.goBackHive = false;
        this.carryPollen = null;
        this.flowerIdx = 0;
        this.initMaterials();
	}

    initMaterials() {
        this.beeMaterial = new CGFappearance(this.scene);
        this.beeMaterial.setTexture(new CGFtexture(this.scene, "./images/beeTexture.png"));
        this.beeMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setTexture(new CGFtexture(this.scene, "./images/headTexture.png"));
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.blackMaterial = new CGFappearance(this.scene);
        this.blackMaterial.setTexture(new CGFtexture(this.scene, "./images/blackTexture.png"));
        this.blackMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.whiteMaterial = new CGFappearance(this.scene);
        this.whiteMaterial.setTexture(new CGFtexture(this.scene, "./images/whiteTexture.png"));
        this.whiteMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setTexture(new CGFtexture(this.scene, "./images/wingTexture.png"));
        this.wingMaterial.setAmbient(173/255,216/255,230/255,0.2);
        this.wingMaterial.setDiffuse(173/255,216/255,230/255,0.2);
        this.wingMaterial.setSpecular(173/255,216/255,230/255,0.2);
        this.wingMaterial.setEmission(173/255,216/255,230/255,0.2);
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setTexture(new CGFtexture(this.scene, "./images/pollenTexture.jpg"));
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    update(scale, speed, flowers){
        this.scale = scale;
        this.handleKeys(speed/3);
        if (speed !== this.lastSpeed && this.speed != 0) {
            this.speed += (speed - this.lastSpeed);
            this.lastSpeed = speed;
        }
        if (this.goToFlower) {
            if(this.check){
                var distances = new Array();
                for(var i = 0; i<flowers.length; i++){
                    var directionVector = {
                        x: flowers[i].x - this.position.x,
                        y: flowers[i].y - this.position.y,
                        z: flowers[i].z - this.position.z
                    };
        
                    var distance = Math.sqrt(
                        directionVector.x * directionVector.x +
                        directionVector.y * directionVector.y +
                        directionVector.z * directionVector.z
                    );
                    distances[i]=distance;
                }
                const getFirstIndexOfMinValue = array => array.reduce((r, v, i, a) => v >= a[r] ? r : i, -1);
                this.flowerIdx = getFirstIndexOfMinValue(distances);
                this.check = false;
            }
            var directionVector = {
                x: flowers[this.flowerIdx].x - this.position.x,
                z: flowers[this.flowerIdx].z - this.position.z
            };

            var distance = Math.sqrt(
                directionVector.x * directionVector.x +
                directionVector.z * directionVector.z
            );

            var normalizedDirection = {
                x: directionVector.x / distance,
                z: directionVector.z / distance
            };

            if(this.orientation != Math.atan2(normalizedDirection.x, normalizedDirection.z)) {
                if(Math.abs(this.orientation - Math.atan2(normalizedDirection.x, normalizedDirection.z))%(Math.PI*2) < 0.3){
                    this.orientation = Math.atan2(normalizedDirection.x, normalizedDirection.z);
                } else if(Math.abs(this.orientation - Math.atan2(normalizedDirection.x, normalizedDirection.z)%(Math.PI*2) < Math.PI)){
                    this.orientation -= 0.1; 
                } else {
                    this.orientation += 0.1;
                }
            }
            if ((distance > 1) || (Math.abs(-this.position.y-20+flowers[this.flowerIdx].y+flowers[this.flowerIdx].r*2-this.scene.i+0.41*this.scene.scaleFactor) > 1)) {
                if (this.speed == 0) this.speed = 0.5;
            } else {
                this.speed = 0;
                this.goToFlower = false;
                this.onFlower = true;
            }
        }
        if (this.goToHive) {
            var directionVector = {
                x: 48 - this.position.x,
                z: 22.4 - this.position.z
            };

            var distance = Math.sqrt(
                directionVector.x * directionVector.x +
                directionVector.z * directionVector.z
            );

            var normalizedDirection = {
                x: directionVector.x / distance,
                z: directionVector.z / distance
            };

            if(this.orientation != Math.atan2(normalizedDirection.x, normalizedDirection.z)) {
                if(Math.abs(this.orientation - Math.atan2(normalizedDirection.x, normalizedDirection.z))%(Math.PI*2) < 0.3){
                    this.orientation = Math.atan2(normalizedDirection.x, normalizedDirection.z);
                } else if(Math.abs(this.orientation - Math.atan2(normalizedDirection.x, normalizedDirection.z)%(Math.PI*2) < Math.PI)){
                    this.orientation -= 0.1; 
                } else {
                    this.orientation += 0.1;
                }
            }
            if (distance > 1) {
                if (this.speed == 0) this.speed = 0.5;
            } else {
                this.speed = 0;
                this.goBackHive = true;
                this.goToHive = false;
                if (this.carryPollen != null) {
                    this.scene.hive.addPollen(this.carryPollen, {x:this.position.x,y:this.position.y,z:this.position.z,o:this.orientation});
                    this.carryPollen = null;
                }
            }
        }
        if (this.goBack) {
            this.onFlower = false;
            if (this.carryPollen == null) {
                if (this.scene.garden.flowers[Math.floor(this.flowerIdx/5)][this.flowerIdx%5].pollen != null) {
                    this.carryPollen = this.scene.garden.flowers[Math.floor(this.flowerIdx/5)][this.flowerIdx%5].pollen;
                    this.scene.garden.flowers[Math.floor(this.flowerIdx/5)][this.flowerIdx%5].pollen = null;
                }
            }
            var directionVector = {
                y: this.position.y,
            };

            var distance = Math.sqrt(
                directionVector.y * directionVector.y
            );
            if (distance > 1) {
                if (this.speed == 0) this.speed = 0.5;
            } else {
                this.goBack = false;
            }
        }
        if (this.goBackHive) {
            var directionVector = {
                y: this.position.y,
            };

            var distance = Math.sqrt(
                directionVector.y * directionVector.y
            );
            if (distance > 1) {
                if (this.speed == 0) this.speed = 0.5;
            } else {
                this.goBackHive = false;
            }
        }
        if(!this.onFlower){
            if(this.goToFlower){this.position.y = this.position.y - this.speed > -20+flowers[this.flowerIdx].y+flowers[this.flowerIdx].r*2-this.scene.i+0.40*this.scene.scaleFactor ? this.position.y - this.speed : -20+flowers[this.flowerIdx].y+flowers[this.flowerIdx].r*2-this.scene.i+0.40*this.scene.scaleFactor}
            else if(this.goBack || this.goBackHive){this.position.y = this.position.y + this.speed > 0 ? 0 : this.position.y + this.speed}
            else if(this.goToHive){this.position.y = this.position.y - this.speed < -14 ? -14 : this.position.y - this.speed}
            this.position.x = this.position.x + this.speed * Math.sin(this.orientation);
            this.position.z = this.position.z + this.speed * Math.cos(this.orientation);
        }
    }

    turn(angle) {
        this.orientation += angle;
    }

    accelerate(accel) {
        this.speed = (this.speed + accel) > 0 ? this.speed + accel : 0;
    }


    handleKeys(factor) {
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.accelerate(factor);
        }
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.accelerate(-factor);
        }
        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.turn(factor);
        }
        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.turn(-factor);
        }
        if (this.scene.gui.isKeyPressed("KeyR")) {
            this.speed = 0;
            this.orientation = 0;
            this.position = {x:0, y:0, z:0};
        }
        if (this.scene.gui.isKeyPressed("KeyF")) {
            if(!this.goBack && !this.goToHive && !this.goToFlower && !this.onFlower && !this.goBackHive){
                this.check = true;
                this.goToFlower = true;
            }
        }
        if (this.scene.gui.isKeyPressed("KeyP")) {
            if(this.onFlower && !this.goBack && !this.goToHive && !this.goToFlower && !this.goBackHive)
                this.goBack = true;
        }
        if (this.scene.gui.isKeyPressed("KeyO")) {
            if(this.carryPollen != null && !this.goBack && !this.goToHive && !this.goToFlower && !this.onFlower && !this.goBackHive)
                this.goToHive = true;
        }
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.position.x,this.position.y,this.position.z);
        this.scene.rotate(this.orientation,0,1,0);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.draw();
        this.scene.popMatrix();
    }

    draw(){
        this.scene.pushMatrix();
        this.scene.translate(0.18,0,0.92);
        this.scene.rotate(Math.PI/4.5,0,1,0);
        this.scene.scale(1/3.2,1/2.7,1/8.2);
        this.whiteMaterial.apply();
        this.scene.setDiffuse(1,1,1,1);
		this.body.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.18,0,0.92);
        this.scene.rotate(-Math.PI/4.5,0,1,0);
        this.scene.scale(1/3.2,1/2.7,1/8.2);
        this.whiteMaterial.apply();
        this.scene.setDiffuse(1,1,1,1);
		this.body.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.18,0,0.95);
        this.scene.rotate(Math.PI/5.5,0,1,0);
        this.scene.scale(1/4.2,1/3.7,1/10.2);
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
		this.body.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.18,0,0.95);
        this.scene.rotate(-Math.PI/5.5,0,1,0);
        this.scene.scale(1/4.2,1/3.7,1/10.2);
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
		this.body.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.52);
        this.scene.scale(0.06,0.06,0.32);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,1);
        this.sting.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
        this.scene.translate(0.15,-0.30,0.15);
        this.scene.rotate(-Math.PI/5,0,1,0);
        this.scene.rotate(Math.PI/5,0,0,1);
		this.feet.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
        this.scene.translate(-0.15,-0.30,0.15);
        this.scene.rotate(Math.PI/5,0,1,0);
        this.scene.rotate(-Math.PI/5,0,0,1);
		this.feet.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
        this.scene.translate(-0.15,-0.30,-0.15);
        this.scene.rotate(-Math.PI/5,0,1,0);
        this.scene.rotate(-Math.PI/5,0,0,1);
		this.feet.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
        this.scene.translate(0.15,-0.30,-0.15);
        this.scene.rotate(Math.PI/5,0,1,0);
        this.scene.rotate(Math.PI/5,0,0,1);
		this.feet.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
        this.scene.translate(0.15,-0.30,0);
        this.scene.rotate(Math.PI/5,0,0,1);
		this.feet.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.blackMaterial.apply();
        this.scene.setDiffuse(0,0,0,0);
        this.scene.translate(-0.15,-0.30,0);
        this.scene.rotate(-Math.PI/5,0,0,1);
		this.feet.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.71);
        this.headMaterial.apply();
        this.scene.setDiffuse(1,1,0,1);
		this.head.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1,1,1.4);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.beeMaterial.apply();
        this.scene.setDiffuse(1,1,0,1);
		this.body.display();
		this.scene.popMatrix();

        if(this.carryPollen != null) {
            this.scene.pushMatrix();
            this.scene.translate(0,-0.85,0);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.pollenMaterial.apply();
            this.carryPollen.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.translate(0.15,0.3708,0);
        this.scene.rotate(-Math.PI/this.Wangle,0,0,1);
        this.scene.translate(0,0.3492,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(1/2,1,0);
        this.wingMaterial.apply();
		this.body.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.15,0.3708,0);
        this.scene.rotate(Math.PI/this.Wangle,0,0,1);
        this.scene.translate(0,0.3492,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(1/2,1,0);
        this.wingMaterial.apply();
		this.body.display();
		this.scene.popMatrix();
    }
}