import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
const Data = () => {
    const param = useParams();
  return (
    <div>
      <h2>Movie id dynamically extracted is: {param.movieid}</h2>
      <Link to="/"><i class="fa-solid fa-house ibtn"></i></Link>
    </div>
  )
}

export default Data
