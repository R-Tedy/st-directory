// import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query
  const params = {search: query || null}

  const session = await auth()

  console.log(session?.id)

  const {data: posts} = await sanityFetch({query: STARTUP_QUERY, params})
  
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your IDEA <br /> Connect with Greatness</h1>
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
                post={post}
              />
            ))
          ):(
            <p className="no-results">NO Startups Found</p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
