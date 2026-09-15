import { useState } from 'react'

function Inquire() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Enter your name and email first')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="bg-black text-white min-h-screen px-6 md:px-10 pt-32 md:pt-40 pb-24">
      <div className="max-w-xl mx-auto">
        <h1 className="font-instrument text-4xl md:text-6xl mb-6">Inquire</h1>
        <p className="text-white/60 text-base md:text-lg mb-10">
          Reach out about a piece, a private viewing, or joining the waitlist.
        </p>

        {submitted ? (
          <p className="text-white/80 text-lg">
            Thank you, {name}. We'll be in touch at {email}.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/50 text-sm mb-2">Name</label>
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
            <div>
              <label className="block text-white/50 text-sm mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white/60 resize-none"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="inline-block px-8 py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full hover:bg-white/90"
            >
              Send inquiry
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Inquire
