import { useState, useEffect } from 'react'
import './App.css'
// !--- swiper imports down below ---!
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination} from 'swiper/modules';
// !-------------------------------!
import {getData} from './api/apiconfig'
import MovieCard from './components/MovieCard';
import Celebrity from './components/Celebrity';

// 1. added <link stylesheet> from font awesome cdn for icons such as: search, cross, hamburger etc 
// 2. installed swiper by- npm i swiper then imported then above.
function App() {
  const [trendWeek, settrendWeek] = useState([])
  const [nav, setnav] = useState(false)

  const changecolor=()=>{
    if (window.scrollY>=600) {
      setnav(true);
    }
    else{
      setnav(false);
    }
  }
  window.addEventListener('scroll', changecolor);
  const imgURL = 'https://image.tmdb.org/t/p/original/'
  useEffect(() => {
    const url = '/trending/movie/week?language=en-US'

    getData(url).then((data)=> {settrendWeek(data.results)})
  }, [])
  // console.log("state: "+ trendWeek)
  // console.log("state value: "+ trendWeek.title)
  
  return (
    <div>
    <header onScroll={()=>{setnav(!nav)}}>
        <div  class={nav?"heading-scroll":"heading"}>
          <div className="head2">

            <div class="title">
                <Link to="/" className='logo' >
                    <img class="title-img" src="./svg/popcorn.png" alt="logo.svg"/>
                    <div className="title">
                      <p>MovieVerse</p>
                      <p>Insights</p>
                    </div>
                </Link>
            </div>
            <div >
              <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Movies</Link></li>
                <li><Link to="/">TV Shows</Link></li>
              </ul>
            </div>
          </div>
            
            <div class="heading2">
                <input class="ip" type="text" placeholder="search movie"/>
                <i class="fa-solid fa-magnifying-glass"></i>
                <i class="fa-solid fa-bars"></i>
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
          {trendWeek.map(item=> {
             return <SwiperSlide key={item.id}>
              <div className="swipe-head">
                <img src={imgURL+item.poster_path} alt="img.jpg" />
                <div className="head-data">
                  <p>Name: {item.title}</p>

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

    <MovieCard title="trending now" url = '/trending/all/day?language=en-US'/>
    {/* <MovieCard title="Indian movies" url = '/discover/movie?language=hindi&page=1&sort_by=popularity.desc&watch_region=India'/> */}
    <MovieCard title="popular movies" url = '/discover/movie?language=en-US&page=1&sort_by=popularity.desc'/>
    <MovieCard title="popular tv-shows" url = '/discover/tv?language=en-US&page=1&sort_by=popularity.desc'/>
    <Celebrity title="popular celebrities" url = '/person/popular?language=en-US&page=1'/>
    <MovieCard title="Highest grossing movies" url = '/discover/movie?language=en-US&page=1&sort_by=revenue.desc&year=2024'/>
    <MovieCard title="top rated movies" url = '/discover/movie?language=en-US&page=1&primary_release_year=2024&sort_by=vote_average.desc'/>
    <MovieCard title="top rated tv-shows" url = '/discover/tv?language=en-US&page=1&primary_release_year=2024&sort_by=vote_average.desc'/>
        
    </div>
  )
}

export default App
