import { useState, useEffect } from 'react'
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
const TVdata = () => {
  const param = useParams();

  const [apiData, setapiData] = useState({})
  const [peopleData, setpeopleData] = useState({})

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  const imgURL2 = 'https://image.tmdb.org/t/p/w200/'

  const similar = `/tv/${param.tvid}/similar?language=en-US&page=1`
  const recommend = `/tv/${param.tvid}/recommendations?language=en-US&page=1`
  useEffect(() => {
    const url = `/tv/${param.tvid}?language=en-US`
    const people = `/tv/${param.tvid}/credits?language=en-US`

    getData(url).then((data) => { setapiData(data) })
    getData(people).then((data) => { setpeopleData(data) })
  }, [])

  const imagePath = apiData.backdrop_path || apiData.poster_path;
  const posterPath = apiData.poster_path || apiData.backdrop_path;

  if (!imagePath) {
    console.error("No image path available for this movie.");
  }

  // console.log("Params:"+ param);
  // console.dir(param);
  // console.log("Data here is ss: " + apiData)
  console.dir(apiData);
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
                <h1>{apiData?.name}</h1>
              </div>
              <div className="b">
                <p>{apiData?.genres?.map(item => (
                  <span className='genre' key={item.id}>
                    {item.name}
                  </span>
                ))}</p>
              </div>
              <div className="c">
                <p>Rating: {apiData?.vote_average?.toFixed(1)}+</p>
                <span> | </span>
                <p>Views: {apiData?.vote_count}</p>
                <span> | </span>
                <p>Season: {apiData?.number_of_seasons}</p>
                <span> | </span>
                <p>Episodes: {apiData?.number_of_episodes}</p>
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
                <p>Release Date: {moment(apiData.first_air_date).format("Do MMMM, YYYY")}</p>
                {apiData.status === "Ended"? <><span> | </span>
                <p>Release Date: {moment(apiData.first_air_date).format("Do MMMM, YYYY")}</p></>:""}
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Director: {peopleData.crew ? peopleData.crew.find((member) => member.known_for_department === "Directing")?.name
                    : "Loading crew data..."}
                </p>
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Writer: {peopleData.crew ? peopleData.crew.find((member) => member.known_for_department === "Writing")?.name
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
            {/* infoData ending below */}
            </div>   

          </div>

        </div>)
        : (<p>Loading data</p>)}
      <div className="similarmov">
        <MovieCard title="Similar Shows" type="tv" url={similar} />

      </div>
      <div className="recommendmov">
        <MovieCard title="Recommended Web Series" type="tv" url={recommend} />

      </div>
    </div>
  )

}

export default TVdata
