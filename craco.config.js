module.exports = {
   webpack: {
      alias: {
         "mapbox-gl": "maplibre-gl",
      },
      babel: {
         loaderOptions: {
            ignore: ["./node_modules/maplibre-gl/dist/maplibre-gl.js"],
         },
      },
   },
}
