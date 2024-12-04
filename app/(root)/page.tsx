import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query

  const posts = await client.fetch(STARTUP_QUERY)
  // console.log(JSON.stringify(posts, null, 2))

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 75,
  //     author: {_id:1, name: 'Roland Stedy'},
  //     _id: 1,
  //     description: 'this is a post',
  //     image: '/pic.jpg',
  //     category: 'Magical',
  //     title: 'Just magic',
  //   }
  // ]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup <br /> Connects with Greatness</h1>
        <p className="sub-heading !max-w-3xl">
          Submit your Ideas, vote on pitches and get to improve on what you already have.
        </p>
        <SearchForm query={query}/>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Search results for "${query}"`:`All Startups`}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType)=>(
              <StartupCard 
                key={post?._id} 
                post={post}/>
            ))
          ):(
            <p className="no-results">NO Startups Found</p>
          )}
        </ul>
      </section>
    </>
  );
}
