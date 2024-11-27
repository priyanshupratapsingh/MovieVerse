import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [nav, setnav] = useState(false)

  const changecolor = () => {
    if (window.scrollY >= 180) {
      setnav(true);
    }
    else {
      setnav(false);
    }
  }
  window.addEventListener('scroll', changecolor);
  return (
    <div>
      <header onScroll={() => { setnav(!nav) }}>
        <div class={nav ? "heading-scroll" : "heading"}>
          <div className="head2">

            <div class="title">
              <Link to="/" className='logo' >
                <img class="title-img" src="../svg/popcorn.png" alt="logo.svg" />
                <div className="title2">
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
            <form >
              <div class="search-container">
                <input class="ip" type="text" placeholder="search movie" />
                <button>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
            <Link to="/"><i class="fa-solid fa-house ibtn"></i></Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
