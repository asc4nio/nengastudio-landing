const switchToDecal = (_index) => {
  threeState.currentDecalMaterial = _index;

  threeState.decalsScale = threeDecalsParams[_index].decalsScale;
  threeState.shootRadius = threeDecalsParams[_index].shootRadius;
};

const switchToColor = (_index) => {
  threeState.currentDecalColor = _index;
};

const switchDecalButtonClass = (_target) => {
  let decalsButtons = document.getElementsByClassName("decal");
  for (let button of decalsButtons) {
    button.classList = "decal";
  }
  console.log(_target);
  _target.classList = "decal is--active";
};

const switchColorButtonClass = (_target) => {
  let colorButtons = document.getElementsByClassName("color");
  for (let button of colorButtons) {
    button.classList = "color";
  }
  _target.classList = "color is--active";
};

export function setDomControls(renderer, decals) {
  /**
   * clear button
   */
  document.getElementById("clear-button").addEventListener("click", () => {
    console.debug("clear-button");
    decals.clearDecals();
  });
  /**
   * undo button
   */
  document.getElementById("undo-button").addEventListener("click", () => {
    console.debug("undo-button");
    decals.removeLastDecal();
  });
  /**
   * save button
   */
  document.getElementById("save-button").addEventListener("click", () => {
    saveAsImage(renderer);
  });

  /**
   * decals material
   */
  document.getElementById("decal0").addEventListener("click", (e) => {
    console.debug("decal0", e);
    switchToDecal(0);
    switchDecalButtonClass(e.target);
  });
  document.getElementById("decal1").addEventListener("click", (e) => {
    console.debug("decal1");
    switchToDecal(1);
    switchDecalButtonClass(e.target);
  });
  document.getElementById("decal2").addEventListener("click", (e) => {
    console.debug("decal2");
    switchToDecal(2);
    switchDecalButtonClass(e.target);
  });
  /**
   * decals color
   */
  document.getElementById("color0").addEventListener("click", (e) => {
    console.debug("color0");
    switchToColor(0);
    switchColorButtonClass(e.target);
  });
  document.getElementById("color1").addEventListener("click", (e) => {
    console.debug("color1");
    switchToColor(1);
    switchColorButtonClass(e.target);
  });
  document.getElementById("color2").addEventListener("click", (e) => {
    console.debug("color2");
    switchToColor(2);
    switchColorButtonClass(e.target);
  });
  document.getElementById("color3").addEventListener("click", (e) => {
    console.debug("color3");
    switchToColor(3);
    switchColorButtonClass(e.target);
  });
  document.getElementById("color4").addEventListener("click", (e) => {
    console.debug("color4");
    switchToColor(4);
    switchColorButtonClass(e.target);
  });
}

function saveAsImage(renderer) {
  let link = document.createElement("a");
  link.download = "nengastudio.png";

  renderer.domElement.toBlob(function (blob) {
    link.href = URL.createObjectURL(blob);
    link.click();
  }, "image/png");
}
