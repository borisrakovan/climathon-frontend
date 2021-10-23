import React from "react"
import "./App.css"
import Map from "./Map"
import { Grid, GridItem, Text } from "@chakra-ui/react"
import ControlPanel from "./ControlPanel"
import TopPlaces from "./TopPlaces"
import { Box, Flex } from "@chakra-ui/react"

type Data = number[][]

function App() {
   const [viewport, setViewport] = React.useState({
      latitude: 48.1486,
      longitude: 17.1077,
      zoom: 11,
   })
   const [data, setData] = React.useState<Data>([[]])

   return (
      // <Box p={4}>
      <Grid
         h="100vh"
         templateRows="repeat(10, 1fr)"
         templateColumns="repeat(6, 1fr)"
         gap={6}
         // py="32px"
      >
         <GridItem colSpan={1}>
            <Flex justifyContent="center">
               <img src="/logo.png" height="150px" width="150px" />
            </Flex>
            <Box pl={4}>
               <TopPlaces />
            </Box>
         </GridItem>
         <GridItem colSpan={4}>
            <Box pt="64px">
               <Map
                  viewport={viewport}
                  setViewport={setViewport}
                  data={data}
                  setData={setData}
               />
               <Box
                  mt="32px"
                  w="100%"
                  h="50px"
                  borderWidth="1px"
                  borderRadius="lg"
                  bgGradient="linear(to-r, #D8EA9D, #8CC7D1, #EA9F9D)"
               >
                  <Flex direction="row" justifyContent="space-between">
                     <Text fontSize="3xl">1</Text>
                     <Text fontSize="3xl">10</Text>
                  </Flex>
               </Box>
            </Box>
         </GridItem>
         <GridItem colSpan={1}>
            <Box pr={4}>
               <ControlPanel />
            </Box>
         </GridItem>
      </Grid>
      // </Box>
   )
}
// Heat, pollution, precipitation, pollen,
export default App
