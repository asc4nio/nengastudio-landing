import * as THREE from "three";
import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";

import denimDiffuseURL from "/denim02-diffuse.jpg?url";
import denimNormalURL from "/denim02-normal.jpg?url";
import denimBumpURL from "/denim02-bump.jpg?url";
import denimRoughnessURL from "/denim02-roughness.jpg?url";

export function createPlane(loader, renderTargetRatio) {
  const denimMaterial = loadDenimMaterial(loader, renderTargetRatio);

  const planeGeometry = new THREE.PlaneGeometry(1 * renderTargetRatio, 1);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeometry, denimMaterial);
  // plane.scale.set(0.9, 0.9, 1);
  // scene.add(plane);

  // const setLogo = (() => {

  const orientation = new THREE.Euler(0, 0, 0);
  const position = new THREE.Vector3();
  let scale = 0.5;
  const size = new THREE.Vector3(scale, scale, 1);

  const material = loadLogoMaterial(loader);

  const logoDecal = new THREE.Mesh(
    new DecalGeometry(mesh, position, orientation, size),
    material
  );

  // scene.add(logoDecal);
  // })();

  return {
    mesh,
    logoDecal,
  };
}

const loadDenimMaterial = (loader, renderTargetRatio) => {
  //   let denimTextures = {
  //     diffuseURL:
  //       "https://asc4nio.github.io/nengastudio/prototype-dev/dist/denim02-diffuse.jpg",
  //     normalURL:
  //       "https://asc4nio.github.io/nengastudio/prototype-dev/dist/denim02-normal.jpg",
  //     bumpURL:
  //       "https://asc4nio.github.io/nengastudio/prototype-dev/dist/denim02-bump.jpg",
  //     roughnessURL:
  //       "https://asc4nio.github.io/nengastudio/prototype-dev/dist/denim02-roughness.jpg",
  //   };

  //   let denimTextures = {
  //     diffuseURL: denimDiffuseURL,
  //     normalURL: denimNormalURL,
  //     bumpURL: denimBumpURL,
  //     roughnessURL: denimRoughnessURL,
  //   };

  const denimTextureScale = threeState.denimTextureScale;

  const denimDiffuseTexture = loader.load(denimDiffuseURL);
  denimDiffuseTexture.wrapS = THREE.RepeatWrapping;
  denimDiffuseTexture.wrapT = THREE.RepeatWrapping;
  denimDiffuseTexture.repeat.set(
    denimTextureScale * renderTargetRatio,
    denimTextureScale
  );
  denimDiffuseTexture.colorSpace = THREE.SRGBColorSpace;

  const denimNormalTexture = loader.load(denimNormalURL);
  denimNormalTexture.wrapS = THREE.RepeatWrapping;
  denimNormalTexture.wrapT = THREE.RepeatWrapping;
  denimNormalTexture.repeat.set(
    denimTextureScale * renderTargetRatio,
    denimTextureScale
  );

  const denimRoughnessTexture = loader.load(denimRoughnessURL);
  denimRoughnessTexture.wrapS = THREE.RepeatWrapping;
  denimRoughnessTexture.wrapT = THREE.RepeatWrapping;
  denimRoughnessTexture.repeat.set(
    denimTextureScale * renderTargetRatio,
    denimTextureScale
  );

  const denimBumpTexture = loader.load(denimBumpURL);
  denimBumpTexture.wrapS = THREE.RepeatWrapping;
  denimBumpTexture.wrapT = THREE.RepeatWrapping;
  denimBumpTexture.repeat.set(
    denimTextureScale * renderTargetRatio,
    denimTextureScale
  );

  const denimMaterial = new THREE.MeshPhysicalMaterial({
    // specular: 0x444444,
    map: denimDiffuseTexture,
    normalMap: denimNormalTexture,
    normalScale: new THREE.Vector2(1, 1),
    roughnessMap: denimRoughnessTexture,
    bumpMap: denimBumpTexture,
    // shininess: 30,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    // polygonOffsetFactor: -4,
    wireframe: false,
  });

  return denimMaterial;
};

const loadLogoMaterial = (loader) => {
  let logoTextureURL =
    "https://asc4nio.github.io/nengastudio/prototype-dev/dist/logo-overlay.png";
  const logoTexture = loader.load(logoTextureURL);
  // logoTexture.colorSpace = THREE.SRGBColorSpace;
  // logoTexture.colorSpace = THREE.NoColorSpace
  // logoTexture.colorSpace = THREE.LinearSRGBColorSpace

  const logoMaterial = new THREE.MeshPhongMaterial({
    map: logoTexture,
    transparent: true,

    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendEquationAlpha: THREE.MaxEquation,

    opacity: 0.1,
  });

  return logoMaterial;
};
