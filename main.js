import "./style.css";

import { createScene } from "./components/threeScene";

window.onload = function (event) {
  console.debug("window.onLoad");

  window.scene = createScene();
  window.scene.start();

  window.addEventListener("resize", window.scene.onResize, false);

  document
    .getElementById("about-trigger-button")
    .addEventListener("click", () => {
      document.getElementById("about").classList = "";
    });
};
