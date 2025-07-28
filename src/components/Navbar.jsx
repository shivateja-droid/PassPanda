import React from 'react'
import Logo from './logo'

const Navbar = () => {
  return (
    <nav className='bg-purple-500 p-4 flex justify-between items-center mb-5'>
    <h1 className=" text-white text-3xl font-extrabold bg-clip-text ">
        PassPanda
      </h1>
      <div>
        <button className='flex items-center gap-2 rounded-3xl bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4  transition duration-300'>
            <img width={20} src="icons/github.svg" alt="github" />
            <span className='text-white'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
