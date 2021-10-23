import geoViewport from "@mapbox/geo-viewport"
import React, { useCallback, useEffect } from "react"
import ReactMapGL, { SVGOverlay } from "react-map-gl"
import "./App.css"
import Overlay from "./Overlay"
import { useDebounce } from "./useDebounce"

const Map = ({ viewport, setViewport, data, setData }: any) => {
   const debouncedViewport = useDebounce(viewport, 300)

   useEffect(() => {
      const { longitude, latitude, zoom, width, height } = debouncedViewport
      const bounds = geoViewport.bounds({ lon: longitude, lat: latitude }, zoom, [
         width,
         height,
      ])
      // console.log("boundingBox: ", bounds)
      async function fetchData() {
         const response = await fetch("http://rholly.sk:5000/index", {
            method: "POST",
            body: JSON.stringify({
               bounds: bounds,
               size: [250, 250],
            }),
         })
         const parsedResponse = await response.json()

         setData(parsedResponse.result.index)
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

   if (!data) {
      return <span>Loading</span>
   }

   return (
      <div className="App">
         <div style={{ height: "100vh" }}>
            <ReactMapGL
               {...viewport}
               mapStyle="https://api.maptiler.com/maps/4359ec62-9a68-4fc3-b2f0-658688c538ec/style.json?key=w4vlPeqRikTQVaCu9Vf1"
               width="100%"
               height="100%"
               onViewportChange={(viewport: any) => {
                  // console.log("viewport: ", viewport)
                  // lat1, long1, lat2, long2 = [16.818609722709333,
                  // 48.037363987241775, 17.43639049342958, 48.26345862047203]
                  // if()
                  setViewport(viewport)
               }}
               // getCursor={(state) => {
               //    if (isDragging !== state.isDragging) {
               //       setIsDragging(state.isDragging)
               //    }
               //    return ""
               // }}
            >
               <SVGOverlay redraw={redraw} />
            </ReactMapGL>
         </div>
      </div>
   )
}

export default Map
