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

  const imagePath = apiData.backdrop_path || apiData.poster_path ;

  // console.log("Params:"+ param);
  // console.dir(param);
  // console.log("Data here is ss: " + apiData)
  // console.dir(apiData);
  return (
    <div>
      <Navbar />

      {apiData ? (
        <div>
          <div className="headimgdivD">
          <img className='headimgD' src={imagePath ? imgURL + imagePath : "fallback_image_url_here"} alt="img.jpg" />
          {console.log(apiData.backdrop_path?apiData.backdrop_path:apiData.poster_path) }
          {/* <div class="fade-effect"></div> */}
          </div>
        </div>) 
        : (<p>Loading data</p>)}

    </div>
  )
}

export default Data
