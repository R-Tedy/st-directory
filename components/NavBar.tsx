import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

async function NavBar() {
  const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={100} height={40} />
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? 
          (
            <>
              <Link href='/startup/create'>
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className='size-6 sm:hidden text-black'/>
              </Link>

              <form action={async () => {
                'use server'

                await signOut({redirectTo:'/'})
              }}>
                <button type='submit'>
                  <span className='max-sm:hidden'>Logout</span>
                  <LogOut className='sm:hidden text-primary size-6'/>
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span className='max-sm:hidden'>{session?.user?.name}</span>
                <Avatar className='sm:hidden'>
                  <AvatarImage src={session?.user?.image}/>
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ):(
            <form action={async ()=>{
              'use server'

              await signIn('github')
            }}>
              <button type='submit'>
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar