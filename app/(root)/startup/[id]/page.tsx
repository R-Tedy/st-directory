import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'

export const experimental_ppr = true

async function page({params}: {params: Promise<{id: string}>}) {
  const id = (await params).id

  const [post] = await client.fetch(STARTUP_BY_ID_QUERY, {id})

  console.log(post.title)

  if (!post) return notFound()

  return (
    <>
      <h1 className='text-3xl'>
        {post.title}
      </h1>
    </>
  )
}

export default page