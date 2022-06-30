import React from 'react'

const Loader = () => {
  let circleCommonClasses = 'h-3.5 w-3.5 bg-current rounded-full'

  return (
    <div className="my-1 flex">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  )
}

export default Loader
