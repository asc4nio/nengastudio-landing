export const CONFIG = {
  denim: {
    textureScale: 2,
    logoScale: 0.5,
    logoAlpha: 0.1,
  },
  decals: [
    {
      scale: 0.03,
      shootRadius: () => {
        return window.innerHeight / 56;
      },
    },
    {
      scale: 0.03,
      shootRadius: () => {
        return window.innerHeight / 72;
      },
    },
    {
      scale: 0.03,
      shootRadius: () => {
        return window.innerHeight / 72;
      },
    },
  ],
  palette: ["#ffe715", "#a1c23d", "#008c45", "#19548e", "#25262a"],
  ui: {
    undoInterval: 200, //ms
  },
};
