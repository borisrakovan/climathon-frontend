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
   // console.logcolWidth: ", colWidth)
   const rowHeight = viewportHeight / rows

   var colorScale = chroma.scale(["yellow", "red"])

   return (
      <>
         {indexMatrix.map((rows, indexRow) => {
            return rows.map((index, indexCol) => {
               // console.log("index: ", index)
               return (
                  <rect
                     key={`${indexRow}-${indexCol}`}
                     height={rowHeight}
                     width={colWidth}
                     x={0 + colWidth * indexCol}
                     y={0 + rowHeight * indexRow}
                     fill={colorScale(index).hex()}
                     fill-opacity={0.3}
                  />
               )
            })
         })}
      </>
   )
}

export default React.memo(Overlay)
