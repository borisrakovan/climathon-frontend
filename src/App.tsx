import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { WebMercatorViewport } from "react-map-gl"
import "./App.css"
import ControlPanel from "./ControlPanel"
import Map from "./Map"
import TopPlaces from "./TopPlaces"
import { useDebounce } from "./useDebounce"

type Data = number[][]

function App() {
   const [viewport, setViewport] = useState({
      latitude: 48.1486,
      longitude: 17.1077,
      zoom: 11,
   })
   const [data, setData] = useState<Data>([[]])
   const [factorWeights, setFactorWeights] = useState({})
   const [isLoading, setIsLoading] = useState(true)

   const debouncedViewport = useDebounce(viewport, 300)
   const debouncedfactorWeights = useDebounce(factorWeights, 300)

   useEffect(() => {
      const vp = new WebMercatorViewport(debouncedViewport)
      const bounds = vp.getBounds().flat()

      async function fetchData() {
         if (bounds[0]) {
            try {
               setIsLoading(true)
               const response = await fetch("http://10.137.4.31:5000/index", {
                  method: "POST",
                  body: JSON.stringify({
                     bounds: bounds,
                     size: [120, 120],
                     factorWeights: debouncedfactorWeights,
                  }),
               })
               const parsedResponse = await response.json()

               setData(parsedResponse.result.index)
            } catch (error) {
               console.error(error)
            } finally {
               setIsLoading(false)
            }
         }
      }

      fetchData()
   }, [debouncedViewport, debouncedfactorWeights, setData])

   return (
      <Grid
         h="100vh"
         templateRows="repeat(10, 1fr)"
         templateColumns="repeat(6, 1fr)"
         gap={6}
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
                  isLoading={isLoading}
               />
               <Box
                  mt="32px"
                  w="100%"
                  h="50px"
                  borderRadius="3xl"
                  bgGradient="linear(to-r, #EA9F9D, #8CC7D1, #D8EA9D)"
               >
                  <Flex direction="row" justifyContent="space-between">
                     <Text fontSize="3xl" pl="16px">
                        0
                     </Text>
                     <Text fontSize="3xl" pr="16px">
                        1
                     </Text>
                  </Flex>
               </Box>
            </Box>
         </GridItem>
         <GridItem colSpan={1}>
            <Box pr={4}>
               <ControlPanel
                  factorWeights={factorWeights}
                  setFactorWeights={setFactorWeights}
               />
            </Box>
         </GridItem>
      </Grid>
   )
}
export default App
