import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";
import { MyGarden } from "./MyGarden.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPollen } from "./MyPollen.js";
import { MyHive } from "./MyHive.js";
import { MyBee } from "./MyBee.js";
import { MyGrass } from "./MyGrass.js";
import { MyGrassSet } from "./MyGrassSet.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.displayNormals = false;
    this.nStacks = 5;
    this.nSlices = 10;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.initTime = Date.now();

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/grassTexture.jpg");
    this.textureS = new CGFtexture(this, "images/earth.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setDiffuse(0.45,0.65,0,1);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearanceS = new CGFappearance(this);
    this.appearanceS.setTexture(this.textureS);
    this.appearanceS.setTextureWrap('REPEAT', 'REPEAT');
    this.panoramaTexture = new CGFtexture(this, "images/panorama.jpg");
    this.pollenMaterial = new CGFappearance(this);
    this.pollenMaterial.setTexture(new CGFtexture(this, "images/pollenTexture.jpg"));
    this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.woodMaterial = new CGFappearance(this);
    this.woodMaterial.setTexture(new CGFtexture(this, "images/woodTexture.jpg"));
    this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.grassLeafMaterial = new CGFappearance(this);
    this.grassLeafMaterial.setTexture(new CGFtexture(this, "images/grassLeafTexture.jpg"));
    this.grassLeafMaterial.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.i = 0;
    this.j = 5;
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this,10,5,1,-1);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    var flowerRadius = Math.random()*(2-(1))+(1);
    var stemColor = [Math.random()*0.45,Math.random()*(1-(0.55))+(0.55),Math.random()*0.2,1];
    this.flower = new MyFlower(this,Math.floor(Math.random()*(8-(5))+(5)),flowerRadius,Math.random()*((flowerRadius+3)-(flowerRadius+1.5))+(flowerRadius+1.5),Math.random()*(0.6-(0.3))+(0.3),Math.floor(Math.random()*(6-(2))+(2)),[Math.random(),Math.random(),Math.random(),1],[1,1,0,1],stemColor,stemColor,Math.PI/8,-Math.PI/8);
    this.garden = new MyGarden(this,5);
    this.rock = new MyRock(this,10,5,1,-1);
    this.rockSet = new MyRockSet(this);
    this.pollen = new MyPollen(this,10,5,0.2,-1,2,1.5);
    this.hive = new MyHive(this, 20, 20, 2, 4, 2.5, 1);
    this.bee = new MyBee(this,this.j);
    this.grass = new MyGrassSet(this,50, this.rockSet.locations);
    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");

    this.setUpdatePeriod(50);
  }
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text+=" S ";
      keysPressed=true;
    }
    if (keysPressed)
      console.log(text);
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  updateObjectComplexity(){
    this.sphere.updateBuffers(this.nStacks, this.nSlices);
  }
  update(t) {
    if(!this.bee.onFlower){
      this.i = Math.sin(2*Math.PI*t/1000);
      this.j = 6 + 4*Math.sin(4*Math.PI*t/1000);
    }
    this.bee.Wangle = this.j;
    this.checkKeys();
    var flower = new Array();
    for(let i = 0; i < 5; i++){
      for (let j = 0; j < 5; j++) {
        flower[i*5+j]={x:i*10,y:this.garden.flowers[i][j].height,z:j*10,r:this.garden.flowers[i][j].Hradius};
      }
    }
    this.bee.update(this.scaleFactor, this.speedFactor, flower);

    // grass
    const currentTime = t/100 % (2*Math.PI); // Get the current time in seconds
    this.grassShader.setUniformsValues({ uTime: currentTime });

    // cloud
    this.panorama.update((t-this.initTime)/1000.0);
	}

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    if(this.displayPanorama){
      this.panorama.display();
    }

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-20,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(0,this.i,0);
    this.bee.display();
    this.popMatrix();

    //this.flower.display();
    this.pushMatrix();
    this.translate(0,-20,0);
    this.garden.display();
    this.popMatrix();

    //this.rock.display();
    this.pushMatrix();
    this.translate(0,-20,0);
    this.rockSet.display();
    this.popMatrix();

    if(this.displaySphere){
      this.pushMatrix();
      this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
      if (this.displayNormals)
          this.sphere.enableNormalViz();
      else
          this.sphere.disableNormalViz();
      this.appearanceS.apply();
      this.sphere.display();
      this.popMatrix;
    }

    this.pushMatrix();
    this.translate(48,-20+this.rockSet.Rradius*2*0.7*3+0.7,20)
    this.hive.display();
    this.popMatrix();

    this.pushMatrix();
    this.setActiveShader(this.grassShader);
    this.translate(0,-20,0);
    this.grassLeafMaterial.apply();
    this.grass.display();
    this.popMatrix();
    this.setActiveShader(this.defaultShader);
    // ---- END Primitive drawing section
  }
}
