import React from "react"
import chroma from "chroma-js"

type IndexMatrix = number[][]

interface Props {
   indexMatrix: IndexMatrix
   viewportWidth: number
   viewportHeight: number
}
const Overlay = ({ indexMatrix, viewportWidth, viewportHeight }: Props) => {
   const rows = indexMatrix.length
   const columns = indexMatrix[0].length

   const colWidth = viewportWidth / columns
   const rowHeight = viewportHeight / rows

   var colorScale = chroma.scale(["#D8EA9D", "#8CC7D1", "#EA9F9D"])
   // var colorScale = chroma.scale(["green", "red"])

   return (
      <>
         {indexMatrix.map((rows, indexRow) => {
            return rows.map((index, indexCol) => {
               let fill = colorScale(1 - index).hex()
               return (
                  <rect
                     key={`${indexRow}-${indexCol}`}
                     height={rowHeight}
                     width={colWidth}
                     x={0 + colWidth * indexCol}
                     y={0 + rowHeight * indexRow}
                     fill={fill}
                     fillOpacity={0.7}
                  />
               )
            })
         })}
      </>
   )
}

export default React.memo(Overlay)
