import { useState, useEffect } from 'react'
import { getData } from '../api/apiconfig'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

const MovieCard = (props) => {
  const [trendDay, settrendDay] = useState([])

  const imgURL = 'https://image.tmdb.org/t/p/w200/'
  useEffect(() => {
    const url = props.url

    getData(url).then((data) => { settrendDay(data.results) })
  }, [])
  return (
    <div className='card swiper'>
      <h2 className='movie-heading'>{props.title}</h2>
      <Swiper
        slidesPerView={6}
        // spaceBetween={50}
        // breakpoints={{
        //   200:{
        //     // centeredSlides:true,
        //       slidesPerView: 1,
        //       spaceBetween: 0,
        //   },
        //   420:{
        //       slidesPerView: 2,
        //       spaceBetween: 5,
        //   },
        //   640: {
        //     slidesPerView: 3,
        //     spaceBetween: 10,
        //   },
        //   830: {
        //     slidesPerView: 4,
        //     spaceBetween: 20,
        //   },
        //   1024: {
        //     slidesPerView: 6,
        //     spaceBetween: 30,
        //   },
        // }}
        modules={[Pagination]}
        className="mySwiper1"
      >
        {trendDay.length > 0 ? (
          <div className='movie-listt swiper-wrapper'>
            {trendDay.map(item => {
              return <> 
              {item.poster_path?
                  <SwiperSlide key={item.id}>
                <div  className="swipe-head1 swiper-slider">
                  <img src={imgURL + item.poster_path} alt="img.jpg" />
                  <div className="head-data1">
                    <p>{item.title? item.title:item.name }</p>

                  </div>

                </div></SwiperSlide>: ""
                }
              </>
            }
            )}
          </div >
        ) : (
          <p>Loading data...</p>
        )}
      </Swiper>

    </div>
  )
}

export default MovieCard
