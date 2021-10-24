import {
   Slider,
   SliderTrack,
   SliderFilledTrack,
   SliderThumb,
   Text,
   Box,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface Factor {
   id: string
   name: string
}

function ControlPanel({ factorWeights, setFactorWeights }: any) {
   const [factors, setFactors] = useState<Factor[]>([])

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await fetch("http://10.137.4.31:5000/factors", {
               method: "GET",
            })
            const parsedResponse = await response.json()
            const factors = parsedResponse.result
            setFactors(factors)

            const defaultFactorValues: { [key: string]: number } = {}
            factors.forEach((factor: Factor) => (defaultFactorValues[factor.id] = 5))
            setFactorWeights(defaultFactorValues)
         } catch (error) {
            console.error(error)
         }
      }

      fetchData()
   }, [setFactorWeights])

   return (
      <Box pt={64}>
         {factors.map((factor) => {
            return (
               <Box mb={2} key={factor.id}>
                  <Text fontSize="lg">{factor.name}</Text>
                  <Text fontSize="md">{factorWeights[factor.id]}</Text>
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
