import * as THREE from "three";

export class Projeteis {
  constructor(posx, posy, posz, isEnemy, vectorPlayer, geometry, material) {
    this.enemy = isEnemy;
    this.transition = 1;
    this.shot = new THREE.Mesh(geometry, material);

    this.shot.position.set(posx, posy, posz);
    this.vectorPosition = new THREE.Vector3();
    this.vectorPosition.copy(this.shot.position);

    this.damage = 1;

    if (isEnemy) {
      this.calAngle(vectorPlayer, this.vectorPosition);
    }
    // const axesHelper = new THREE.AxesHelper( 5 ); //!para ver os eixos
    // this.shot.add(axesHelper);
  }
  tiro() {
    return this.shot;
  }

  moveInZ(qntMove, alpha) {
    this.vectorPosition.z += 2 * qntMove;
    this.shot.position.lerp(this.vectorPosition, alpha);
  }
  move(qnt, vectorPlayer = null) {
    this.shot.translateZ(this.transition * qnt);
  }
  
  getVectorPosition() {
    this.vectorPosition.copy(this.shot.position);
    return this.vectorPosition;
  }
  calAngle(vectorPlayer, thisVector) {
    if (vectorPlayer.z < thisVector.z) 
      this.transition = -1;
    let x = vectorPlayer.x - thisVector.x;
    let z = vectorPlayer.z - thisVector.z;
    let h = Math.sqrt(x * x + z * z);

    this.angleToPlayer = (vectorPlayer.x - thisVector.x) / h;
    this.shot.rotateY(this.transition * this.angleToPlayer);
  }
}
