import { Text, Box, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import chroma from "chroma-js"

function TopPlaces() {
   const [topPlaces, setTopPlaces] = useState<{ rank: number; name: string }[]>([
      { rank: 1, name: "asdsda" },
      { rank: 2, name: "zxc" },
      { rank: 3, name: "rer" },
      { rank: 4, name: "sd" },
      { rank: 5, name: "asdczxsda" },
      { rank: 6, name: "asdsda" },
      { rank: 7, name: "fsdf" },
      { rank: 8, name: "54" },
      { rank: 9, name: "asdertsda" },
      { rank: 10, name: "gb" },
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

   var colorScale = chroma.scale(["#D8EA9D", "#8CC7D1", "#EA9F9D"])

   return (
      <Flex direction="row" pt={16}>
         <Text fontSize="lg" transform="rotate(90deg)">
            Top 5
         </Text>

         <Box>
            {topPlaces.map((topPlace, index) => {
               const color = colorScale(index / 10).hex()
               console.log("color: ", color)

               return (
                  <Box mb={2} key={topPlace.rank} bg={color} borderRadius="2xl">
                     <Text fontSize="lg">{topPlace.name}</Text>
                  </Box>
               )
            })}
         </Box>
         <Text fontSize="lg">Worst 5</Text>
      </Flex>
   )
}
export default TopPlaces
