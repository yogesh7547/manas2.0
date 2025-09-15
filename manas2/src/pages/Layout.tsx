import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'


const Layout: React.FC= () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Navigation/>

    </div>
  )
}

export default Layout