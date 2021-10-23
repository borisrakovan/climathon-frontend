import React, { useCallback, useEffect, useMemo } from "react"
import "./App.css"
import ReactMapGL, { SVGOverlay } from "react-map-gl"
import { useDebounce } from "./useDebounce"
import debounce from "lodash.debounce"

import Overlay from "./Overlay"

const data = [
   [0.2, 0.2342, 0.5, 0.34],
   [0.2, 0.2342, 0.5, 0.34],
   [0.2, 0.2342, 0.5, 0.34],
   [0.2, 0.2342, 0.5, 0.34],
]

type Data = number[][]

function App() {
   const [viewport, setViewport] = React.useState({
      latitude: 48.1486,
      longitude: 17.1077,
      zoom: 11,
   })

   const debouncedViewport = useDebounce(viewport, 1000)

   const [data, setData] = React.useState<Data>([[]])
   const { latitude, longitude } = debouncedViewport

   useEffect(() => {
      async function fetchData() {
         const response = await fetch("http://10.137.4.31:5000/index", {
            method: "POST",
            body: JSON.stringify({
               fromCoord: {
                  lat: latitude,
                  long: longitude,
               },
               toCoord: {
                  lat: latitude,
                  long: longitude,
               },
            }),
         })
         const parsedResponse = await response.json()

         setData(parsedResponse.result.index)
      }

      fetchData()
   }, [latitude, longitude])

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
               onViewportChange={(viewport: any) => setViewport(viewport)}
            >
               <SVGOverlay redraw={redraw} />
            </ReactMapGL>
         </div>
      </div>
   )
}

export default App
