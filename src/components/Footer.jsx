import React from 'react'

const Footer = () => {
  return (
    <div className='bg-purple-500 text-white p-4 mt-6 rounded-t-lg fixed bottom-0 left-0 right-0'>
      <p className="text-center text-sm">
        &copy; {new Date().getFullYear()} Password Manager. All rights reserved.
      </p>
        <p className="text-center text-xs mt-2">
            Made with ❤️ by Shivateja
        </p>
    </div>
  )
}

export default Footer
