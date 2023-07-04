import { CONFIG } from "./threeConfig.js";

import * as THREE from "three";

import { setControlsVisibility } from "./threeUI.js";

/****************************************************************** */

window.pointerState = {
  isPointerDown: false,
  dragStartPos: new THREE.Vector2(),
  lastDecalPos: undefined,
  isShooting: false,
};

/****************************************************************** */

export function setInteraction(scene, camera, renderTarget, plane, decals) {
  console.debug("setInteraction()");
  const raycaster = new THREE.Raycaster();

  /**
   * Set pointer
   */
  const mouse = new THREE.Vector2();

  const intersection = {
    intersects: false,
    point: new THREE.Vector3(),
  };
  const intersects = [];

  /************************************************************************************** */

  function checkIntersection(x, y, mesh) {
    // console.debug("checkIntersection", x, y);

    if (mesh === undefined) return;

    mouse.x = (x / renderTarget.offsetWidth) * 2 - 1;
    mouse.y = -(y / renderTarget.offsetHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera.camera);
    raycaster.intersectObject(mesh, false, intersects);

    if (intersects.length > 0) {
      // console.debug(intersects);

      const p = intersects[0].point;
      intersection.point.copy(p);

      if (pointerState.lastDecalPos === undefined) {
        pointerState.lastDecalPos = new THREE.Vector3();
        pointerState.lastDecalPos.copy(intersection.point);
      }
      intersection.intersects = true;

      intersects.length = 0;
    } else {
      // console.debug(intersects)
      intersection.intersects = false;
    }
  }

  function shoot(scene, target, intersection) {
    console.debug("shoot()", intersection.point);

    //set direction
    let direction = new THREE.Vector3();
    direction.subVectors(pointerState.lastDecalPos, intersection.point);

    //set orientation
    const orientation = new THREE.Euler();
    let dir = (Math.atan2(direction.x, direction.y) + Math.PI / 2) * -1;
    orientation.z = dir;
    // set position
    const position = new THREE.Vector3();
    position.copy(intersection.point);

    let mesh = decals.createDecal(target, orientation, position);
    decals.decals.push(mesh);
    scene.add(mesh);

    window.pointerState.lastDecalPos = position;
  }

  /************************************************************************************** */

  /**
   * Set pointer listeners
   */

  renderTarget.addEventListener("pointerdown", function (event) {
    console.debug("pointerdown");

    pointerState.isPointerDown = true;
    pointerState.dragStartPos.x = event.pageX;
    pointerState.dragStartPos.y = event.pageY;
  });

  renderTarget.addEventListener("pointermove", (event) => {
    // console.debug("pointermove");

    setControlsVisibility(pointerState.isShooting);

    if (pointerState.isPointerDown && event.isPrimary) {
      if (pointerState.lastDecalPos === undefined) {
        checkIntersection(event.clientX, event.clientY, plane.mesh);
      }

      let diffX = Math.abs(event.pageX - pointerState.dragStartPos.x);
      let diffY = Math.abs(event.pageY - pointerState.dragStartPos.y);

      /**
       * set current shoot radius
       */
      let currentShootRadius =
        CONFIG.decals[threeState.currentDecal].shootRadius();

      if (diffX > currentShootRadius || diffY > currentShootRadius) {
        // console.debug("pointermove", diffX, diffY);
        checkIntersection(event.clientX, event.clientY, plane.mesh);
        if (intersection.intersects) {
          pointerState.isShooting = true;
          shoot(scene, plane.mesh, intersection);
        }

        pointerState.dragStartPos.x = event.pageX;
        pointerState.dragStartPos.y = event.pageY;
      } else {
        return;
      }
    }
  });

  renderTarget.addEventListener("pointerup", function (event) {
    console.debug("pointerup");
    pointerState.isPointerDown = false;
    pointerState.lastDecalPos = undefined;
    pointerState.isShooting = false;

    setControlsVisibility(pointerState.isShooting);
  });

  /************************************************************************************** */

  return {
    plane,
    decals,
  };
}
