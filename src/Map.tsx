import { Box } from "@chakra-ui/layout"
import { useCallback, useEffect } from "react"
import ReactMapGL, { SVGOverlay, WebMercatorViewport } from "react-map-gl"
import "./App.css"
import Overlay from "./Overlay"
import { useDebounce } from "./useDebounce"

const Map = ({ viewport, setViewport, data, setData }: any) => {
   const debouncedViewport = useDebounce(viewport, 300)

   useEffect(() => {
      const vp = new WebMercatorViewport(debouncedViewport)
      const bounds = vp.getBounds().flat()

      async function fetchData() {
         if (bounds[0]) {
            try {
               const response = await fetch("http://10.137.4.31:5000/index", {
                  method: "POST",
                  body: JSON.stringify({
                     bounds: bounds,
                     size: [200, 200],
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
