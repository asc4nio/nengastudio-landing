import { CONFIG } from "./threeConfig.js";

import * as THREE from "three";
import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";

import denimDiffuseURL from "/denim02-diffuse.jpg?url";
import denimNormalURL from "/denim02-normal.jpg?url";
import denimBumpURL from "/denim02-bump.jpg?url";
import denimRoughnessURL from "/denim02-roughness.jpg?url";

import logoTextureURL from "/tex/logo-overlay.png?url";

export function createPlane(loader, renderTargetRatio) {
  console.debug("createPlane()");
  const denimMaterial = loadDenimMaterial(loader, renderTargetRatio);

  const planeGeometry = new THREE.PlaneGeometry(1 * renderTargetRatio, 1);
  // const planeMaterial = new THREE.MeshBasicMaterial({
  //   color: 0x0000ff,
  //   side: THREE.DoubleSide,
  // });
  const mesh = new THREE.Mesh(planeGeometry, denimMaterial);

  /**
   * Set logo decal
   */
  const orientation = new THREE.Euler(0, 0, 0);
  const position = new THREE.Vector3();

  let scale = CONFIG.denim.logoScale;
  const size = new THREE.Vector3(scale, scale, 1);

  const material = loadLogoMaterial(loader);

  const logoDecal = new THREE.Mesh(
    new DecalGeometry(mesh, position, orientation, size),
    material
  );

  return {
    mesh,
    logoDecal,
  };
}

const loadDenimMaterial = (loader, renderTargetRatio) => {
  console.debug("loadDenimMaterial()");

  const denimTextureScale = CONFIG.denim.textureScale;

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
  console.debug("loadLogoMaterial()");

  const logoTexture = loader.load(logoTextureURL);

  const logoMaterial = new THREE.MeshPhongMaterial({
    map: logoTexture,
    transparent: true,

    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendEquationAlpha: THREE.MaxEquation,

    opacity: CONFIG.denim.logoAlpha,
  });

  return logoMaterial;
};
