import * as THREE from "three";

// import { CONFIG } from "./threeConfig.js";

import { createCamera } from "./threeCamera.js";

import { setDecals } from "./decals.js";
import { createPlane } from "./denim.js";

import { setInteraction } from "./threeInteraction.js";
import { setDomControls } from "./threeUI.js";

export function createScene() {
  console.debug("createScene()");

  const clock = new THREE.Clock();

  /**
   * Set scene, camera, render
   */
  const renderTarget = document.getElementById("threejs-container");
  const renderTargetRatio =
    renderTarget.offsetWidth / renderTarget.offsetHeight;

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x00ffff);

  const camera = createCamera(renderTarget);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(renderTarget.offsetWidth, renderTarget.offsetHeight);
  renderTarget.appendChild(renderer.domElement);

  const setLights = (() => {
    scene.add(new THREE.AmbientLight(0xffffff, 0.33));

    // const dirLight3 = new THREE.DirectionalLight(0xdbfffa, 0.5);
    // dirLight3.position.set(1, 1, 1);
    // scene.add(dirLight3);

    // const dirLight1 = new THREE.DirectionalLight(0xffffdb, 1);
    // dirLight1.position.set(-1, 1, 1);
    // scene.add(dirLight1);

    const light = new THREE.PointLight(0xffffff, 1, 6.66);
    light.position.set(0, 0.5, 2);
    scene.add(light);
    // console.log(light);
  })();

  /**
   * Set loading manager
   */
  const manager = new THREE.LoadingManager();
  const setManager = (() => {
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
      window.threeState.loading.isRunning = true;

      // console.debug(
      //   "Started loading file: " +
      //     url +
      //     ".\nLoaded " +
      //     itemsLoaded +
      //     " of " +
      //     itemsTotal +
      //     " files."
      // );
    };
    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      window.threeState.loading.progress = itemsLoaded / itemsTotal;

      let loadingPercentage =
        Math.round(window.threeState.loading.progress * 1000) / 10;

      console.debug(loadingPercentage, "% textureloader");

      // console.debug(
      //   "Loading file: " +
      //     url +
      //     ".\nLoaded " +
      //     itemsLoaded +
      //     " of " +
      //     itemsTotal +
      //     " files."
      // );

      let loadingDiv = document.getElementById("loading-overlay");
      loadingDiv.innerText =
        "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files.";
    };
    manager.onLoad = function () {
      window.threeState.loading.isRunning = false;

      // console.debug("Loading complete!");

      let loadingDiv = document.getElementById("loading-overlay");
      loadingDiv.innerText = "Loading complete";
      loadingDiv.classList = "is--away";
      setTimeout(() => {
        loadingDiv.remove();
      }, 1000);
    };
    manager.onError = function (url) {
      console.debug("There was an error loading " + url);
    };
  })();
  const loader = new THREE.TextureLoader(manager);

  /**
   * Set interaction
   */

  const plane = createPlane(loader, renderTargetRatio);
  const decals = setDecals(scene, loader);

  const interaction = setInteraction(
    scene,
    camera,
    renderTarget,
    renderTargetRatio,
    loader,
    plane,
    decals
  );
  scene.add(interaction.plane.mesh);
  scene.add(interaction.plane.logoDecal);

  setDomControls(renderer, interaction.decals);

  /**
   * Loop
   */
  function animate() {
    camera.update();
    renderer.render(scene, camera.camera);
  }

  function start() {
    renderer.setAnimationLoop(animate);
  }
  function stop() {
    renderer.setAnimationLoop(null);
  }

  /*
   *
   */

  function saveAsImage() {
    let link = document.createElement("a");
    link.download = "nengastudio.png";

    console.log(
      renderer.domElement.toBlob(function (blob) {
        console.log(blob);
      })
    );

    renderer.domElement.toBlob(function (blob) {
      link.href = URL.createObjectURL(blob);
      link.click();
    }, "image/png");
  }

  function onResize() {
    camera.camera.aspect = renderTarget.offsetWidth / renderTarget.offsetHeight;
    camera.camera.updateProjectionMatrix();

    renderer.setSize(renderTarget.offsetWidth, renderTarget.offsetHeight);
    renderer.render(scene, camera.camera);
  }

  return {
    start,
    stop,
    renderer,
    saveAsImage,
    onResize,
  };
}
