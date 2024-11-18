import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

import '../css/Data.css'
import { getData } from '../api/apiconfig'
import Navbar from './Navbar';
const Data = () => {
  const param = useParams();

  const [apiData, setapiData] = useState({})

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  useEffect(() => {
    const url = `/movie/${param.movieid}?language=en-US`

    getData(url).then((data) => { setapiData(data) })
  }, [])
  console.log("Data here is: " + apiData)
  return (
    <div>
      <Navbar />
      {/* <div className="navspace"></div> */}

      {apiData ? (
        <div>
          <div className="headimgdivD">
          <img className='headimgD' src={imgURL + (apiData.backdrop_path?apiData.backdrop_path:apiData.poster_path)} alt="img.jpg" />

          {/* <div class="fade-effect"></div> */}
          </div>
        </div>) 
        : (<p>Loading data</p>)}

      {/* <h2>Movie id dynamically extracted is: {param.movieid}</h2> */}
    </div>
  )
}

export default Data
