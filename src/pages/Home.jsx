import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import MainContent from '../components/Maincomponent'
import MainContent2 from '../components/Maincontent' 
import Banner2 from '../components/Banner2'
import Support from '../components/Support'
import Services from '../components/Services'
// import Animationmid from '../components/Animationmid';

const Home = () => {
  return (
    <div>
      <Header />
      <Banner2 />
      <MainContent2/>
      <SpecialityMenu />
      {/* <TopDoctors /> */}
      <Services/>
     <Banner />
      {/* <Support/> */}
    </div>
  )
}

export default Home