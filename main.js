import "./style.css";

import { createScene } from "./components/threeScene";
import { setControlsVisibility } from "./components/threeUI.js";

/************************************************************************** */

window.threeState = {
  currentDecal: 0,
  currentColor: 0,
  loading: {
    isRunning: false,
    progress: undefined,
  },
};

window.scene = undefined;

/************************************************************************** */

var page = {
  initInteractions: () => {
    document
      .getElementById("about-trigger-button")
      .addEventListener("click", () => {
        document.getElementById("about").classList = "";

        setControlsVisibility(true);
      });

    document
      .getElementById("about-close-button")
      .addEventListener("click", () => {
        setControlsVisibility(false);

        document.getElementById("about").classList = "is--away";
      });
  },
  initThree: () => {
    window.scene = createScene();
    window.scene.start();
    window.addEventListener("resize", window.scene.onResize, false);
  },
};

/************************************************************************** */

window.onload = function (event) {
  console.debug("window.onLoad");

  page.initThree();
  page.initInteractions();

  // setTimeout(() => {
  //   alert("should ask for c2a");
  // }, 12 * 1000);
};
