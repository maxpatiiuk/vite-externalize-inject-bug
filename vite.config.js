import { resolve } from "node:path";

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        importmapOrder: resolve(__dirname, "index2.html"),
      },
    },
  },
  plugins: [
    {
      resolveId: {
        order: "pre",
        handler(specifier) {
          if (specifier.startsWith("@arcgis/core")) return false;
        },
      },
      name: "",
    },
  ],
};
