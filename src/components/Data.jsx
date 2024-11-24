import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import moment from "moment";

import '../css/Data.css'
import { getData } from '../api/apiconfig'
import Navbar from './Navbar';
const Data = () => {
  const param = useParams();

  const [apiData, setapiData] = useState({})
  const [peopleData, setpeopleData] = useState({})

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  useEffect(() => {
    const url = `/movie/${param.movieid}?language=en-US`
    const people = `/movie/${param.movieid}/credits?language=en-US`

    getData(url).then((data) => { setapiData(data) })
    getData(people).then((data) => { setpeopleData(data) })
  }, [])

  const imagePath = apiData.backdrop_path || apiData.poster_path;
  const posterPath = apiData.poster_path || apiData.backdrop_path;
  // console.log("Params:"+ param);
  // console.dir(param);
  console.dir(peopleData)
  // console.dir(apiData);
  return (
    <div>
      <Navbar />

      {apiData ? (
        <div>
          <div className="headimgdivD">
            <img className='headimgD' src={imagePath ? imgURL + imagePath : "fallback_image_url_here"} alt="img.jpg" />

          </div>

          <div className="movieData">
            <div className="imgData">
              <img src={imagePath ? imgURL + posterPath : "fallback_image_url_here"} alt="img.jpg" width={225} />
            </div>
            <div className="infoData">
              <div className="a">
                <h1>{apiData?.title}</h1>

              </div>
              <div className="b">
                <p>{apiData?.genres?.map(item => (
                  <span className='genre' key={item.id}>
                    {item.name}
                  </span>
                ))}</p>
              </div>
              {/* <div className="divider"></div> */}
              <div className="c">
                <p>Rating: {apiData?.vote_average?.toFixed(1)}+</p>
                <span> | </span>
                <p>Views: {apiData?.vote_count}</p>
                <span> | </span>
                <p>Runtime: {Math.floor(apiData?.runtime / 60)}h {apiData?.runtime % 60}m</p>
              </div>
              <div className="divider"></div>
              <div className="d">
                <h3>Overview</h3>
                <p>{apiData?.overview}</p>
              </div>
              <div className="divider"></div>
              <div className="e">
                <p>Status: {apiData.status}</p>
                <span> | </span>
                <p>Release Date: {moment(apiData.release_date).format("Do MMMM, YYYY")}</p>
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Director: {peopleData.crew ? peopleData.crew.find((member) => member.job === "Director").name
                    : "Loading crew data..."}
                </p>
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Producer: {peopleData.crew ? peopleData.crew.find((member) => member.job === "Producer")?.name
                    : "Loading crew data..."}
                </p>
              </div>
              <div className="divider"></div>
              <div className="g">
                f
              </div>
            </div>
          </div>
        </div>)
        : (<p>Loading data</p>)}

    </div>
  )
}

export default Data
