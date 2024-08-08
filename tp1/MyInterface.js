import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        
        this.gui.add(this.scene, 'diamondVisibility').name('Diamond Visibility');

        this.gui.add(this.scene, 'triangleVisibility').name('Triangle Visibility');

        this.gui.add(this.scene, 'parallelogramVisibility').name('Parallelogram Visibility');

        this.gui.add(this.scene, 'trianglesmallVisibility').name('Triangle Small Visibility');
       
        this.gui.add(this.scene, 'trianglebigVisibility').name('Triangle Big Visibility');

        return true;
    }
}