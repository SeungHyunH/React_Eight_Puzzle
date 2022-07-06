import React from 'react'
import createPuzzle from '../util/createPuzzle';
const MainPage = () => {
  return (
    <div onClick={()=>createPuzzle(4)}>MainPage</div>
  )
}

export default MainPage