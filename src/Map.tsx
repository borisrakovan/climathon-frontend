import { Box } from "@chakra-ui/layout"
import { useCallback } from "react"
import ReactMapGL, { SVGOverlay } from "react-map-gl"
import "./App.css"
import Overlay from "./Overlay"

const Map = ({ viewport, setViewport, data }: any) => {
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
