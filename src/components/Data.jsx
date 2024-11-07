import React from 'react'
import { useParams } from 'react-router-dom'
const Data = () => {
    const param = useParams();
  return (
    <div>
      <h2>Movie id dynamically extracted is: {param.movieid}</h2>
    </div>
  )
}

export default Data
