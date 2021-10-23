import {
   Slider,
   SliderTrack,
   SliderFilledTrack,
   SliderThumb,
   Text,
   Box,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

function ControlPanel({ factorWeights, setFactorWeights }: any) {
   const [factors, setFactors] = useState<{ id: string; name: string }[]>([])
   console.log("factorWeights: ", factorWeights)

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await fetch("http://10.137.4.31:5000/factors", {
               method: "GET",
            })
            const parsedResponse = await response.json()

            setFactors(parsedResponse.result)
         } catch (error) {
            console.error(error)
         }
      }

      fetchData()
   }, [])

   return (
      <Box pt={64}>
         {factors.map((factor) => {
            return (
               <Box mb={2} key={factor.id}>
                  <Text fontSize="lg">{factor.name}</Text>
                  <Slider
                     defaultValue={5}
                     min={0}
                     max={10}
                     step={1}
                     onChange={(value) =>
                        setFactorWeights((state: any) => ({
                           ...state,
                           [factor.id]: value,
                        }))
                     }
                  >
                     <SliderTrack>
                        <SliderFilledTrack />
                     </SliderTrack>
                     <SliderThumb />
                  </Slider>
               </Box>
            )
         })}
      </Box>
   )
}
export default ControlPanel
