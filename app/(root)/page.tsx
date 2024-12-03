import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup <br /> Connects with Greatness</h1>
        <p className="sub-heading !max-w-3xl">
          Submit your Ideas, vote on pitches and get to improve on what you already have.
        </p>
        <SearchForm query={query}/>
      </section>
    </>
  );
}
