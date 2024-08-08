import {CGFobject} from '../lib/CGF.js';
/**
 * MyHiveBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHiveBody extends CGFobject {
    constructor(scene, slices, stacks, radius, height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const ang = 2 * Math.PI / this.slices;
        const stackHeight = this.height / this.stacks;
        const texStack = 1 / this.stacks;
        const texSlice = 1 / this.slices;

        // Lateral vertices, normals and texCoords
        for (let i = 0; i <= this.stacks; i++) {
            const y = i * stackHeight;
            const texY = i * texStack;

            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(j * ang) * this.radius;
                const z = Math.sin(j * ang) * this.radius;
                const texX = j * texSlice;

                this.vertices.push(x, y, z);
                this.normals.push(x, 0, z);
                this.texCoords.push(texX, texY);
            }
        }

        // Lateral indices
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const second = i * (this.slices + 1) + j;
                const first = second + this.slices + 1;
                this.indices.push(first, second + 1, second);
                this.indices.push(first, first + 1, second + 1);
            }
        }

        // Bottom circle
        const baseCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0); // Center vertex
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        for (let j = 0; j <= this.slices; j++) {
            const x = Math.cos(j * ang) * this.radius;
            const z = Math.sin(j * ang) * this.radius;
            this.vertices.push(x, 0, z);
            this.normals.push(0, -1, 0);
            this.texCoords.push((Math.cos(j * ang) + 1) / 2, (Math.sin(j * ang) + 1) / 2);
            if (j > 0) {
                this.indices.push(baseCenterIndex, baseCenterIndex + j, baseCenterIndex + j + 1);
            }
        }

        // Top circle
        const topCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, this.height, 0); // Center vertex
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        for (let j = 0; j <= this.slices; j++) {
            const x = Math.cos(j * ang) * this.radius;
            const z = Math.sin(j * ang) * this.radius;
            this.vertices.push(x, this.height, z);
            this.normals.push(0, 1, 0);
            this.texCoords.push((Math.cos(j * ang) + 1) / 2, (Math.sin(j * ang) + 1) / 2);

            if (j > 0) {
                this.indices.push(topCenterIndex, topCenterIndex + j + 1, topCenterIndex + j);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}