import { Box } from "@chakra-ui/layout"
import { useCallback } from "react"
import ReactMapGL, { SVGOverlay } from "react-map-gl"
import "./App.css"
import Overlay from "./Overlay"
import GridLoader from "react-spinners/GridLoader"
import { css } from "@emotion/react"

const Map = ({ viewport, setViewport, data, isLoading }: any) => {
   //  console.log("isLoading: ", isLoading)
   const redraw = useCallback(
      ({ width, height }: any) => {
         //  if (true) {
         //     return <GridLoader></GridLoader>
         //  }
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
            {isLoading ? <Spinner /> : <SVGOverlay redraw={redraw} />}
         </ReactMapGL>
      </Box>
   )
}

const Spinner = () => {
   const loaderCss = css`
      display: block;
      padding-top: 350px;
      margin-left: auto;
      margin-right: auto;
   `

   return (
      <Box position="relative" bg="gray" h="750px" opacity="0.8">
         <GridLoader css={loaderCss} />
      </Box>
   )
}

export default Map
