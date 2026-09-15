import { useState } from 'react'

function Waitlist() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Enter your email first')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="bg-black text-white min-h-screen px-6 md:px-10 pt-32 md:pt-40 pb-24 flex items-center">
      <div className="max-w-xl mx-auto w-full">
        <h1 className="font-instrument text-4xl md:text-6xl mb-6">Join the waitlist</h1>
        <p className="text-white/60 text-base md:text-lg mb-10">
          Be first to know when a new piece enters the collection.
        </p>

        {submitted ? (
          <p className="text-white/80 text-lg">
            You're on the list{name ? `, ${name}` : ''}. We'll email {email} when
            something new arrives.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/50 text-sm mb-2">Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white/60"
              />
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white/60"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="inline-block px-8 py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full hover:bg-white/90"
            >
              Join the waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Waitlist
