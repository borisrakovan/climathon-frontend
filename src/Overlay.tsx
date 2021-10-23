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

   var colorScale = chroma.scale(["#EFBCB6", "#98C8D4", "#E5F2CE"])

   return (
      <>
         {indexMatrix.map((rows, indexRow) => {
            return rows.map((index, indexCol) => {
               return (
                  <rect
                     key={`${indexRow}-${indexCol}`}
                     height={rowHeight}
                     width={colWidth}
                     x={0 + colWidth * indexCol}
                     y={0 + rowHeight * indexRow}
                     fill={colorScale(index).hex()}
                     fill-opacity={0.5}
                  />
               )
            })
         })}
      </>
   )
}

export default React.memo(Overlay)
