import React from 'react'

type Props = {
    text:string;
    style?:React.CSSProperties
}

export const addText = (props:Props) => <Text {...props}/>
export default function Text({text,style}: Props) {
  return (
    <span style={style}>{text}</span>
  )
}