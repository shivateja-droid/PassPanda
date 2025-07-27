import React from 'react'

const Logo = () => {
  return ( <>
    {/* <div className="bg-black text-green-400 font-mono p-6 rounded-md text-center mt-20">
      <h1 className="text-4xl tracking-widest">[ PassPanda ]</h1>
      <p className="text-green-200 text-sm mt-2"> Safe. Simple. Secure.</p>
    </div> */}
    <div className="text-center mb-6">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
        PassPanda
      </h1>
      <p className="text-sm text-gray-400 mt-1 tracking-wide">
        Your Ultimate Password  Manager 🛡️
      </p>
    </div>
    </>
  )
}

export default Logo
