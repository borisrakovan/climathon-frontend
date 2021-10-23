import React from "react"
import logo from "./logo.svg"
import "./App.css"
import ReactMapGL from "react-map-gl"
// import "mapbox-gl/dist/mapbox-gl.css"

function App() {
   const [viewport, setViewport] = React.useState({
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
   })

   return (
      <div className="App">
         <p>Hello world</p>
         <div style={{ height: "500px" }}>
            <ReactMapGL
               {...viewport}
               mapStyle="https://api.maptiler.com/maps/basic/style.json?key=w4vlPeqRikTQVaCu9Vf1"
               width="100%"
               height="100%"
               onViewportChange={(viewport: any) => setViewport(viewport)}
            />
         </div>
      </div>
   )
}

export default App
