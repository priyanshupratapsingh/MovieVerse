import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import moment from "moment";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import '../css/Data.css'
import { getData } from '../api/apiconfig'
import Navbar from './Navbar';
import MovieCard from './MovieCard';
const Data = () => {
  const param = useParams();

  const [apiData, setapiData] = useState({})
  const [peopleData, setpeopleData] = useState({})

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  const imgURL2 = 'https://image.tmdb.org/t/p/w200/'

  const similar = `/movie/${param.movieid}/similar?language=en-US&page=1`
  const recommend = `/movie/${param.movieid}/recommendations?language=en-US&page=1`
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
        <div className='allData'>
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
                <p>Casts</p>
                <Swiper
                  slidesPerView={7}
                  spaceBetween={30}
                  modules={[Pagination]}
                  className="mySwiper swiperData"
                >
                  {peopleData.cast ?
                    peopleData.cast.map(item => {
                      return <>

                        {item.profile_path ?
                          <SwiperSlide>
                            <div className="swiper-slider swiper-sliderData">

                              <img src={imgURL2 + item.profile_path} alt="img.jpg" />
                              <div className="">
                                <p>{item.name}</p>

                              </div>
                            </div>
                          </SwiperSlide> : ""}
                      </>
                    }

                    )
                    : "loading"}

                </Swiper>
              </div>
            </div>
          </div>
        </div>)
        : (<p>Loading data</p>)}

      <div className="similarmov">
        <MovieCard title="Similar Movies" type="movie" url={similar} />

      </div>
      <div className="recommendmov">
        <MovieCard title="Recommended Movies" type="movie" url={recommend} />

      </div>
    </div>
  )
}

export default Data
