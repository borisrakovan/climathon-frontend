import React from "react"
import "./App.css"
import Map from "./Map"
import { Grid, GridItem } from "@chakra-ui/react"
import ControlPanel from "./ControlPanel"

type Data = number[][]

function App() {
   const [viewport, setViewport] = React.useState({
      latitude: 48.1486,
      longitude: 17.1077,
      zoom: 11,
   })
   const [data, setData] = React.useState<Data>([[]])

   // const [isDragging, setIsDragging] = useState(false)
   // console.log("isDragging: ", isDragging)

   return (
      <Grid
         h="200px"
         templateRows="repeat(1, 1fr)"
         templateColumns="repeat(4, 1fr)"
         gap={4}
      >
         <GridItem rowSpan={1} colSpan={3}>
            <Map
               viewport={viewport}
               setViewport={setViewport}
               data={data}
               setData={setData}
            />
         </GridItem>
         <GridItem colSpan={1} bg="#E5F2CE">
            <ControlPanel />
         </GridItem>
      </Grid>
   )
}
// Heat, pollution, precipitation, pollen,
export default App
