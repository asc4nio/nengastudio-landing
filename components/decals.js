import { CONFIG } from "./threeConfig.js";

import * as THREE from "three";
import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";

import decal01diffuseURL from "/brush01-diffuse.png?url";
import decal01normalURL from "/brush01-normal.jpg?url";

import decal02diffuseURL from "/brush02-diffuse.png?url";
import decal02normalURL from "/brush02-normal.jpg?url";

import decal03diffuseURL from "/brush03-diffuse.png?url";
import decal03normalURL from "/brush03-normal.jpg?url";

export function setDecals(scene, loader) {
  console.debug("setDecals()");
  let decals = [];
  let decalsMaterials = loadDecalsMaterial(loader);

  function createDecal(target, orientation, position) {
    /**
     * set current size
     */
    const scale = CONFIG.decals[threeState.currentDecal].scale;
    const size = new THREE.Vector3(scale, scale, 1);
    /**
     * set current material
     */
    const material = decalsMaterials[threeState.currentDecal].clone();
    /**
     * set current color
     */
    material.color = new THREE.Color(CONFIG.palette[threeState.currentColor]);

    const mesh = new THREE.Mesh(
      new DecalGeometry(target, position, orientation, size),
      material
    );
    return mesh;
  }

  function clearDecals() {
    console.debug("clearDecals()");
    decals.forEach(function (d) {
      scene.remove(d);
    });
    decals.length = 0;
  }

  function removeLastDecal() {
    console.debug("removeLastDecal()");

    scene.remove(decals[decals.length - 1]);
    decals.pop();
  }

  return {
    decals,
    createDecal,
    clearDecals,
    removeLastDecal,
  };
}

const loadDecalsMaterial = (loader) => {
  console.debug("loadDecalsMaterial()");

  let decalsMaterials = [];

  let decalsTextures = [
    {
      id: 0,
      diffuseURL: decal01diffuseURL,
      normalURL: decal01normalURL,
    },
    {
      id: 1,
      diffuseURL: decal02diffuseURL,
      normalURL: decal02normalURL,
    },
    {
      id: 2,
      diffuseURL: decal03diffuseURL,
      normalURL: decal03normalURL,
    },
  ];

  //   let decalsTextures = [
  //     {
  //       id: 0,
  //       diffuseURL:
  //         "https://asc4nio.github.io/nengastudio/prototype-dev/dist/brush01-diffuse.png",
  //       normalURL:
  //         "https://asc4nio.github.io/nengastudio/prototype-dev/dist/brush01-normal.jpg",
  //     },
  //     {
  //       id: 1,
  //       diffuseURL:
  //         "https://asc4nio.github.io/nengastudio/prototype-dev/dist/brush02-diffuse.png",
  //       normalURL:
  //         "https://asc4nio.github.io/nengastudio/prototype-dev/dist/brush02-normal.jpg",
  //     },
  //     {
  //       id: 2,
  //       diffuseURL:
  //         "https://asc4nio.github.io/nengastudio/prototype-dev/dist/brush03-diffuse.png",
  //       normalURL:
  //         "https://asc4nio.github.io/nengastudio/prototype-dev/dist/brush03-normal.jpg",
  //     },
  //   ];

  for (let decalTexture of decalsTextures) {
    const decalDiffuseTexture = loader.load(decalTexture.diffuseURL);
    decalDiffuseTexture.colorSpace = THREE.SRGBColorSpace;
    const decalNormalTexture = loader.load(decalTexture.normalURL);

    const decalMaterial = new THREE.MeshPhongMaterial({
      map: decalDiffuseTexture,
      normalMap: decalNormalTexture,
      // normalScale: new THREE.Vector2(1, 1),
      shininess: 5,
      // specular: 0x444444,
      specular: 0x111111,

      transparent: true,
      // depthTest: true,
      // depthWrite: false,
      // polygonOffset: true,
      // polygonOffsetFactor: -4,
    });

    // const decalMaterial = new THREE.MeshPhongMaterial({
    //     specular: 0x444444,
    //     map: decalDiffuseTexture,
    //     normalMap: decalNormalTexture,
    //     normalScale: new THREE.Vector2(1, 1),
    //     shininess: 10,
    //     transparent: true,
    //     depthTest: true,
    //     depthWrite: false,
    //     polygonOffset: true,
    //     polygonOffsetFactor: -4,
    //     wireframe: false,
    // });

    decalsMaterials = [...decalsMaterials, decalMaterial];
  }

  return decalsMaterials;
};
