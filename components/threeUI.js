import { CONFIG } from "./threeConfig.js";

export function setDomControls(decals) {
  /**
   * clear button
   */
  document.getElementById("clear-button").addEventListener("click", () => {
    console.debug("clear-button");
    if (confirm("Clear canvas?") == true) {
      decals.clearDecals();
    } else {
      return;
    }
  });

  /**
   * undo button
   */
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "z") {
      decals.removeLastDecal();
    }
  });

  document.getElementById("undo-button").addEventListener("click", () => {
    decals.removeLastDecal();
  });

  var undoInterval;
  document
    .getElementById("undo-button")
    .addEventListener("pointerdown", (e) => {
      undoInterval = setInterval(function () {
        decals.removeLastDecal();
      }, CONFIG.ui.undoInterval);
    });
  document.getElementById("undo-button").addEventListener("pointerup", (e) => {
    clearInterval(undoInterval);
  });

  /**
   * save button
   */
  document.getElementById("save-button").addEventListener("click", () => {
    window.scene.saveAsImage();
  });

  /**
   * decals material
   */
  const switchToDecal = (index) => {
    threeState.currentDecal = index;
  };
  const decalsTriggers = document.querySelectorAll(".decal");
  decalsTriggers.forEach((i) => {
    i.addEventListener("click", (e) => {
      let index = i.getAttribute("data-decal");
      console.debug("decal", index);

      switchToDecal(index);
      updateDecalButtonClass(e.target);
    });
  });

  /**
   * decals color
   */
  const switchToColor = (index) => {
    threeState.currentColor = index;
  };
  const colorTriggers = document.querySelectorAll(".color");
  colorTriggers.forEach((i) => {
    i.addEventListener("click", (e) => {
      let index = i.getAttribute("data-color");
      console.debug("color", index);

      switchToColor(index);
      updateColorButtonClass(e.target);
    });
  });
}

export function setControlsVisibility(action) {
  const controls = document.getElementById("controls");

  switch (action) {
    case true:
      controls.classList = "is--faded";
      break;
    case false:
      controls.classList = "";
      break;

    default:
      console.error("error toggle ui visibility");
      break;
  }
}

/***************************************************************************** */
/**
 * update dom
 */
const updateDecalButtonClass = (_target) => {
  let decalsButtons = document.getElementsByClassName("decal");
  for (let button of decalsButtons) {
    button.classList = "ui-button decal";
  }
  console.log(_target);
  _target.classList = "ui-button decal is--active";
};

const updateColorButtonClass = (_target) => {
  let colorButtons = document.getElementsByClassName("color");
  for (let button of colorButtons) {
    button.classList = "ui-button color";
  }
  _target.classList = "ui-button color is--active";
};

/***************************************************************************** */

// function saveAsImage(renderer) {
//   let link = document.createElement("a");
//   link.download = "nengastudio.png";

//   renderer.domElement.toBlob(function (blob) {
//     link.href = URL.createObjectURL(blob);
//     link.click();
//   }, "image/png");
// }
