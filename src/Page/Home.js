import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='font-semibold items-center mt-20 text-center text-2xl'>Sewa & Rental Mobil Terbaik di Kawasan Probolinggo</div>
        <div className='flex justify-center'>
            <Link to='/logout'>
                <button type="logout" className="bg-blue-800 w-60 py-2 rounded text-white text-md mt-10">Logout</button>
            </Link>
        </div>
    </div>
  )
}

export default Home
