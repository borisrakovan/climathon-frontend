import { Box } from "@chakra-ui/layout"
import geoViewport from "@mapbox/geo-viewport"
import React, { useCallback, useEffect } from "react"
import ReactMapGL, { SVGOverlay, WebMercatorViewport } from "react-map-gl"
import "./App.css"
import Overlay from "./Overlay"
import { useDebounce } from "./useDebounce"

const Map = ({ viewport, setViewport, data, setData }: any) => {
   const debouncedViewport = useDebounce(viewport, 300)
   //  console.log("debouncedViewport: ", debouncedViewport.zoom)

   useEffect(() => {
      // const { longitude, latitude, zoom, width, height } = debouncedViewport
      const vp = new WebMercatorViewport(debouncedViewport)
      // console.log("vp: ", vp.getBounds())
      // console.log("zoom: ", zoom)
      // console.log("debouncedViewport: ", debouncedViewport)
      // const bounds = geoViewport.bounds({ lon: longitude, lat: latitude }, zoom, [
      //    width,
      //    height,
      // ])
      const bounds = vp.getBounds().flat()
      console.log("bounds: ", bounds)
      async function fetchData() {
         if (bounds[0]) {
            try {
               const response = await fetch("http://10.137.4.31:5000/index", {
                  method: "POST",
                  body: JSON.stringify({
                     bounds: bounds,
                     size: [100, 100],
                  }),
               })
               const parsedResponse = await response.json()

               setData(parsedResponse.result.index)
            } catch (error) {
               console.error(error)
            }
         }
      }

      fetchData()
   }, [debouncedViewport, setData])

   const redraw = useCallback(
      ({ width, height }: any) => {
         return (
            <Overlay
               viewportWidth={width}
               viewportHeight={height}
               indexMatrix={data}
            />
         )
      },
      [data]
   )

   //  console.log("data: ", data)
   if (!data) {
      return <span>Loading</span>
   }

   return (
      <Box h="700px">
         <ReactMapGL
            {...viewport}
            mapStyle="https://api.maptiler.com/maps/72ca1151-209c-4240-8fe3-9a9bac559209/style.json?key=w4vlPeqRikTQVaCu9Vf1"
            width="100%"
            height="100%"
            onViewportChange={(viewport: any) => {
               const isWithinLimits = viewport.zoom >= 11
               if (isWithinLimits) {
                  setViewport(viewport)
               }
            }}
         >
            <SVGOverlay redraw={redraw} />
         </ReactMapGL>
      </Box>
   )
}

export default Map
