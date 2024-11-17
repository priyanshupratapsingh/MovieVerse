import { useState, useEffect } from 'react'
import './css/App.css'
import './css/mediaq.css'
// !--- swiper imports down below ---!
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
// !-------------------------------!
import { getData } from './api/apiconfig'
import { getGenreName } from './components/GenreData'
import MovieCard from './components/MovieCard';
import Celebrity from './components/Celebrity';

// 1. added <link stylesheet> from font awesome cdn for icons such as: search, cross, hamburger etc 
// 2. installed swiper by- npm i swiper then imported then above.
function App() {
  const [trendWeek, settrendWeek] = useState([])
  const [nav, setnav] = useState(false)

  const changecolor = () => {
    if (window.scrollY >= 600) {
      setnav(true);
    }
    else {
      setnav(false);
    }
  }
  window.addEventListener('scroll', changecolor);
  const imgURL = 'https://image.tmdb.org/t/p/original/'
  useEffect(() => {
    const url = '/trending/movie/week?language=en-US'

    getData(url).then((data) => { settrendWeek(data.results) })
  }, [])
  console.log(trendWeek)

  return (
    <div>
      <header onScroll={() => { setnav(!nav) }}>
        <div class={nav ? "heading-scroll" : "heading"}>
          <div className="head2">

            <div class="title">
              <Link to="/" className='logo' >
                <img class="title-img" src="./svg/popcorn.png" alt="logo.svg" />
                <div className="title">
                  <p>MovieVerse</p>
                  <p>Insights</p>
                </div>
              </Link>
            </div>
            <div >
              <ul className="menu">
                {/* <li><Link to="/">Home</Link></li> */}
                <li><Link to="/">Movies</Link></li>
                <li><Link to="/">TV Shows</Link></li>
              </ul>
            </div>
          </div>

          <div class="heading2">
            <input class="ip" type="text" placeholder="search movie" />
            <i class="fa-solid fa-magnifying-glass ibtn"></i>
            <Link to="/"><i class="fa-solid fa-house ibtn"></i></Link>
          </div>
        </div>
      </header>

      <Swiper
        spaceBetween={30}
        // loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >

        {trendWeek.length > 0 ? (
          <div >
            {trendWeek.map(item => {
              return <SwiperSlide key={item.id}>
                <div className="swipe-head">
                  <img src={imgURL + item.poster_path} alt="img.jpg" />
                  <div className="head-data">
                    {/* getGenreName is a Function imported from GenreData.jsx*/}
                    <div className="genreType">
                      <p>{getGenreName(item.genre_ids[0])} | {getGenreName(item.genre_ids[1])} {item.genre_ids[2] ? `| ${getGenreName(item.genre_ids[2])}` : ""}</p>
                    </div>
                    <div className="movieName">
                      <h1>{item.title}</h1>

                    </div>
                    <div className="movieInfo">
                      <p><span>Imdb Rating:</span> {item.vote_average.toFixed(1)} </p>
                      <p><span>Release Data:</span> {item.release_date}</p>
                    </div>
                    <div className="btnTrailer">
                      <button>View Description</button>
                      <button><i class="fa-solid fa-play"></i> Watch Trailer</button>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            }
            )}
          </div >
        ) : (
          <p>Loading data...</p>
        )}
      </Swiper>

      <MovieCard title="trending now" url='/trending/all/day?language=en-US' />
      {/* <MovieCard title="Indian movies" url = '/discover/movie?language=hindi&page=1&sort_by=popularity.desc&watch_region=India'/> */}
      <MovieCard title="popular movies" url='/discover/movie?language=en-US&page=1&sort_by=popularity.desc' />
      <MovieCard title="popular tv-shows" url='/discover/tv?language=en-US&page=1&sort_by=popularity.desc' />
      <Celebrity title="popular celebrities" url='/person/popular?language=en-US&page=1' />
      <MovieCard title="Highest grossing movies" url='/discover/movie?language=en-US&page=1&sort_by=revenue.desc&year=2024' />
      <MovieCard title="top rated movies" url='/discover/movie?language=en-US&page=1&primary_release_year=2024&sort_by=vote_average.desc' />
      <MovieCard title="top rated tv-shows" url='/discover/tv?language=en-US&page=1&primary_release_year=2024&sort_by=vote_average.desc' />

    </div>
  )
}

export default App
