import React from 'react'
import NewsList from './Components/NewsList'
import AddNews from './Components/AddNews'
import NewsCarousel from './Components/NewsCarousel'
import Navbar from './Components/Navbar'
import FooterComponent from './Components/FooterComponent'

function App() {
  return (
    <div>
      <Navbar/>
      <NewsCarousel/>
      <NewsList/>
      <FooterComponent/>
      {/* <AddNews/> */}

    </div>
  )
}

export default App