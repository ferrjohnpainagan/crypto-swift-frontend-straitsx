import React from 'react'

const Card = (props) => {
  return (
    <div
      style={{ width: props.width }}
      className="mx-32 flex flex-col rounded-xl border border-solid border-cardStroke bg-white"
    >
      {props.children}
    </div>
  )
}

export default Card
