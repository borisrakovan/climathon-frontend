import { Text, Box, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import chroma from "chroma-js"

function TopPlaces() {
   const [topPlaces, setTopPlaces] = useState<{ rank: number; name: string }[]>([
      { rank: 1, name: "48.1467,17.5655" },
      { rank: 2, name: "47.8467,17.4565" },
      { rank: 3, name: "48.4235,17.45645" },
      { rank: 4, name: "48.54443,17.12140" },
      { rank: 5, name: "48.5545,17.345" },
      { rank: 6, name: "48.14671,17.12104" },
   ])
   // const [factorWeights, setFactorWeights] = useState({})
   // console.log("factorWeights: ", factorWeights)

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

   var colorScale = chroma.scale(["#D8EA9D", "#EA9F9D"])

   return (
      <Flex direction="column" pt={16} alignItems="center">
         <Text fontSize="lg" mb={"8px"}>
            Top 3
         </Text>

         <Box w="100%">
            {topPlaces.map((topPlace, index) => {
               const color = colorScale(index / 10).hex()

               return (
                  <Box mb={2} key={topPlace.rank} bg={color} borderRadius="2xl">
                     <Text pl="16px" fontSize="lg">
                        {topPlace.name}
                     </Text>
                  </Box>
               )
            })}
         </Box>
         <Text fontSize="lg">Worst 3</Text>
      </Flex>
   )
}
export default TopPlaces
