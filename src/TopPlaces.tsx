import {
   Slider,
   SliderTrack,
   SliderFilledTrack,
   SliderThumb,
   Text,
   Box,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

function TopPlaces() {
   const [topPlaces, setTopPlaces] = useState<{ id: number; name: string }[]>([
      { id: 1, name: "asdsda" },
      { id: 2, name: "asdsda" },
      { id: 3, name: "asdsda" },
      { id: 4, name: "asdsda" },
      { id: 5, name: "asdsda" },
   ])
   // const [factorValues, setFactorValues] = useState({})
   // console.log("factorValues: ", factorValues)

   useEffect(() => {
      // async function fetchData() {
      //    try {
      //       const response = await fetch("http://10.137.4.31:5000/factors", {
      //          method: "GET",
      //       })
      //       const parsedResponse = await response.json()
      //       setFactors(parsedResponse.result)
      //    } catch (error) {
      //       console.error(error)
      //    }
      // }
      // fetchData()
   }, [])

   return (
      <Box pt={64}>
         {topPlaces.map((topPlace) => {
            return (
               <Box mb={2} key={topPlace.id}>
                  <Text fontSize="lg">{topPlace.name}</Text>
               </Box>
            )
         })}
      </Box>
   )
}
export default TopPlaces
