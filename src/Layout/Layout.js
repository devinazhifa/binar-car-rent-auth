import React from 'react'

import Header from './Header'
import Main from './Main'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header />
        <Main />
    </div>
  )
}

export default Layout