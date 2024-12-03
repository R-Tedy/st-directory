import React from 'react'
import NavBar from '../../components/NavBar'

function layout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='font-work-sans'>
      <NavBar/>
      {children}
    </main>
  )
}

export default layout