import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const isOrbitcontrol = false;

export function createCamera(_renderTarget) {
  console.debug("createCamera()");

  const camera = new THREE.PerspectiveCamera(
    30,
    _renderTarget.offsetWidth / _renderTarget.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  let camDist = camera.position.z - 0;

  let heightToFit = 1; // desired height to fit
  camera.fov = 2 * Math.atan(heightToFit / (2 * camDist)) * (180 / Math.PI);
  camera.updateProjectionMatrix();

  var controls = null;
  if (isOrbitcontrol) {
    controls = new OrbitControls(camera, _renderTarget);
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
  }

  function update() {
    if (isOrbitcontrol) {
      controls.update();
    }
  }

  return { camera, update };
}
