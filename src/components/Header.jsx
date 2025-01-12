import React from 'react'
import { assets } from '../assets/assets'
import headerVideo from '../assets/header_video.mp4';
import { useNavigate } from 'react-router-dom';
import './Header.css'

// import './css/bootstrap.css'
// import './css/font-awesome.min.css'
// import './css/responsive.css'
// import './css/style.css'
// import './css/style.css.map'
                                



const Header = () => {
  const navigate=useNavigate();
    return (
      <div style ={{marginTop:"-48px"}}class="hero_area">

      <div class="hero_bg_box">
        <img src="src/images/hero_bg.png" alt=""/>
      </div>
  
      {/* <!-- header section strats --> */}
      <header class="header_section">
        <div class="container">
          <nav class="navbar navbar-expand-lg custom_nav-container ">
            <a class="navbar-brand" href="index.html">
              <span>
                SwasthyaPro
              </span>
            </a>
  
            {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class=""> </span>
            </button> */}
  
            {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
           
            </div> */}
          </nav>
        </div>
      </header>
      {/* <!-- end header section -->
      <!-- slider section --> */}
      <section class="slider_section ">
        <div id="customCarousel1" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container ">
                <div class="row">
                  <div class="col-md-7">
                    <div class="detail-box">
                      <h1>
                      Book Your Appointment Today
                      </h1>
                      <p>
                      Stay on top of your schedule and make time for what matters. Choose a convenient date and time to get started—it's quick and easy!                      </p>
                      <div class="btn-box">
                        <button onClick={() => navigate("/doctors")} class="btn1">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container ">
                <div class="row">
                  <div class="col-md-7">
                    <div class="detail-box">
                      <h1>
                        We Provide Best Healthcare
                      </h1>
                      <p>
                        Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
                      </p>
                      <div class="btn-box">
                      <button onClick={() => navigate("/doctors")} class="btn1">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container ">
                <div class="row">
                  <div class="col-md-7">
                    <div class="detail-box">
                      <h1>
                        We Provide Best Healthcare
                      </h1>
                      <p>
                        Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
                      </p>
                      <div class="btn-box">
                        <a href="" class="btn1">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ol class="carousel-indicators">
            <li data-target="#customCarousel1" data-slide-to="0" class="active"></li>
            <li data-target="#customCarousel1" data-slide-to="1" class="active"></li>
            <li data-target="#customCarousel1" data-slide-to="2" class="active"></li>
          </ol>
        </div>
  
      </section>
      {/* <!-- end slider section --> */}
    </div>
    )
}

export default Header