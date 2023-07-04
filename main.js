import "./style.css";

import { createScene } from "./components/threeScene";
import { setControlsVisibility } from "./components/threeUI.js";

/************************************************************************** */

window.siteState = {
  isAbout: false,
};

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
        page.toggleAbout(true);
      });

    document
      .getElementById("about-close-button")
      .addEventListener("click", () => {
        page.toggleAbout(false);
      });
  },
  initThree: () => {
    window.scene = createScene();
    window.scene.start();
    window.addEventListener("resize", window.scene.onResize, false);
  },
  toggleAbout: (command) => {
    switch (command) {
      case true:
        document.getElementById("about").classList = "";
        siteState.isAbout = true;
        window.scene.stop();
        setControlsVisibility(true);
        break;
      case false:
        setControlsVisibility(false);
        siteState.isAbout = false;
        window.scene.start();
        document.getElementById("about").classList = "is--away";
        break;

      default:
        break;
    }
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
