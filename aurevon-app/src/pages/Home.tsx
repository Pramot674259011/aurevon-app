import Hero from '../components/Hero'

function Home() {
  return (
    <>
      <Hero />
      <section className="bg-black text-white px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-instrument text-3xl md:text-5xl mb-6">
            An archive of quiet, deliberate work
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
            Every piece in Aurevon passes through a single curator's eye before it
            reaches the gallery. Fewer works, held to a higher standard.
          </p>
        </div>
      </section>
    </>
  )
}

export default Home
