import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <div className='font-semibold items-center mt-20 text-center text-2xl'>Ini Halaman Dashboard</div>
            <div className='flex justify-center'>
                <Link to='/logout'>
                    <button type="logout" className=" bg-blue-800 w-60 py-2 rounded text-white text-md mt-10">Logout</button>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard
