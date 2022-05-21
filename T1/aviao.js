import * as THREE from "three";
import { FaceColors } from "../build/three.module.js";
import { initBasicMaterial } from "../libs/util/util.js";
import { Projetil } from "./projetil.js";

const geometry = new THREE.ConeGeometry(1.5 , 3.5, 30);
let material = new THREE.MeshLambertMaterial({color: 0x00ff000});


export class Airplane {
  constructor(altura, largura, posx, posy, posz, speed,isEnemy) {
    this.altura = altura;
    this.largura = largura;
    this.isEnemy = isEnemy;
    this.speed = speed;

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(posx, posy, posz);

    this.vectorPosition = new THREE.Vector3();
    this.vectorPosition.copy(this.cube.position);
    
   
    this.cube.rotateX(-89.6);
    
  }
  cube() {
    return this.cube();
  }

  moveInX(qntMove) {
    this.vectorPosition.x +=  1.5 * qntMove;
    this.cube.position.lerp(this.vectorPosition,4 * this.speed);
  }

  moveInY(qntMove) {
    this.vectorPosition.y += qntMove;
    this.cube.position.lerp(this.vectorPosition, this.speed);
  }
  moveInZ(qntMove) {
    this.vectorPosition.z += qntMove;
    this.cube.position.lerp(this.vectorPosition,this.speed);
  }
  moveInZContinuo(qntMove, alpha) {
    this.vectorPosition.z += qntMove;
    this.cube.position.lerp(this.vectorPosition,alpha);
  }

  getVectorPosition() {
    return this.vectorPosition;
  }

  shot(scene, tiros) {
    let tir = new Projetil(
      this.vectorPosition.x,
      this.vectorPosition.y ,
      this.vectorPosition.z,
      this.isEnemy
    );
    scene.add(tir.tiro());
    tiros.push(tir);
  }

  atingido(){
  
      this.cube.material.color.setHex(0x32ff32);
      setTimeout(function() { material.color.setHex(0x00ff00);}, 500);
    
  }
  
}
