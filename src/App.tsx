import React, { useEffect } from "react"
import "./App.css"
import ReactMapGL, { SVGOverlay } from "react-map-gl"

const values = [
   [0.2, 0.2342, 0.5, 0.34],
   [0.2, 0.2342, 0.5, 0.34],
   [0.2, 0.2342, 0.5, 0.34],
   [0.2, 0.2342, 0.5, 0.34],
]

// type Data = number[][]

function App() {
   const [viewport, setViewport] = React.useState({
      latitude: 48.1486,
      longitude: 17.1077,
      zoom: 11,
   })

   // const [data, setData] = React.useState<Data>([[]])

   // useEffect(() => {
   //    async function fetchData() {
   //       const response = await fetch("http://10.137.4.31:5000/index")
   //       const parsedResponse = await response.json()

   //       setData(parsedResponse)
   //    }

   //    fetchData()
   // }, [viewport])

   console.log("viewport: ", viewport)

   function redraw({ project, width, height }: any) {
      console.log("heigth: ", height)
      console.log("width: ", width)

      const rows = values.length
      console.log("rows: ", rows)
      const columns = values[0].length
      console.log("columns: ", columns)

      const colWidth = width / columns
      const rowHeight = height / rows

      // const [cx, cy] = project([viewport.longitude, viewport.latitude])

      return values.map((rows, indexRow) => {
         return rows.map((column, indexCol) => {
            console.log("column: ", column)

            return (
               <rect
                  key={`${indexRow}-${indexCol}`}
                  height={rowHeight}
                  width={colWidth}
                  x={0 + colWidth * indexRow}
                  y={0 + rowHeight * indexCol}
                  fill="blue"
                  fill-opacity="0.4"
               />
            )
         })
      })
   }

   return (
      <div className="App">
         <div style={{ height: "500px" }}>
            <ReactMapGL
               {...viewport}
               mapStyle="https://api.maptiler.com/maps/basic/style.json?key=w4vlPeqRikTQVaCu9Vf1"
               width="100%"
               height="100%"
               onViewportChange={(viewport: any) => setViewport(viewport)}
            >
               {/* <Source id="my-data" type="geojson" data={geojson}>
                  <Layer {...layerStyle} />
               </Source> */}
               <SVGOverlay redraw={redraw} />
            </ReactMapGL>
         </div>
      </div>
   )
}

export default App
