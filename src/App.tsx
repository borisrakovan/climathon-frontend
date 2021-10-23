import React, { useCallback, useEffect, useMemo } from "react"
import "./App.css"
import ReactMapGL, { SVGOverlay } from "react-map-gl"
import { useDebounce } from "./useDebounce"

import Overlay from "./Overlay"
import geoViewport from "@mapbox/geo-viewport"

type Data = number[][]

function App() {
   const [viewport, setViewport] = React.useState({
      latitude: 48.1486,
      longitude: 17.1077,
      zoom: 11,
   })

   const debouncedViewport = useDebounce(viewport, 300)

   const [data, setData] = React.useState<Data>([[]])
   // const { latitude, longitude } = debouncedViewport

   useEffect(() => {
      const { longitude, latitude, zoom, width, height } = debouncedViewport
      const bounds = geoViewport.bounds({ lon: longitude, lat: latitude }, zoom, [
         width,
         height,
      ])
      console.log("boundingBox: ", bounds)
      async function fetchData() {
         const response = await fetch("http://10.137.4.31:5000/index", {
            method: "POST",
            body: JSON.stringify({
               bounds: bounds,
            }),
         })
         const parsedResponse = await response.json()

         setData(parsedResponse.result.index)
      }

      fetchData()
   }, [debouncedViewport])

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

   // const debouncedRedraw = useMemo(() => debounce(redraw, 500), [redraw])

   if (!data) {
      return <span>Loading</span>
   }

   return (
      <div className="App">
         <div style={{ height: "100vh" }}>
            <ReactMapGL
               {...viewport}
               mapStyle="https://api.maptiler.com/maps/basic/style.json?key=w4vlPeqRikTQVaCu9Vf1"
               width="100%"
               height="100%"
               onViewportChange={(viewport: any) => {
                  console.log("viewport: ", viewport)
                  setViewport(viewport)
               }}
            >
               <SVGOverlay redraw={redraw} />
            </ReactMapGL>
         </div>
      </div>
   )
}

export default App
