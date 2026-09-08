import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPieces, type Piece } from '../data/pieces'

const timeSlots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM']
const DEPOSIT = 50

function Reserve() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('piece') ?? ''

  const [pieces, setPieces] = useState<Piece[]>([])
  const [piece, setPiece] = useState(preselected)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(1)
  const [conditionReport, setConditionReport] = useState(false)
  const [provenance, setProvenance] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    let isMounted = true

    fetchPieces()
      .then((data) => {
        if (isMounted) setPieces(data)
      })
      .catch(() => {
        if (isMounted) setPieces([])
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!piece || !date || !time || !name.trim() || !email.trim()) {
      setError('Fill in the piece, date, time, name and email first')
      return
    }
    if (!cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
      setError('Card details are needed to hold the deposit')
      return
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          piece,
          date,
          time,
          guests,
          name,
          email,
          deposit: DEPOSIT,
          conditionReport,
          provenance,
        }),
      })

      if (!response.ok) {
        throw new Error('Unable to save reservation')
      }

      setError('')
      setConfirmed(true)
    } catch (submissionError) {
      setError('The reservation could not be saved. Please try again.')
    }
  }

  if (confirmed) {
    return (
      <section className="bg-black text-white min-h-screen px-6 md:px-10 pt-32 md:pt-40 pb-24 flex items-center">
        <div className="max-w-xl mx-auto w-full">
          <h1 className="font-instrument text-4xl md:text-6xl mb-6">Viewing confirmed</h1>
          <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
            {name}, your private viewing of <span className="text-white">{piece}</span> is
            held for {date} at {time} ({guests} {guests === 1 ? 'guest' : 'guests'}). A
            confirmation has been sent to {email}.
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            The ${DEPOSIT} deposit holds your slot and is credited toward the piece if you
            choose to acquire it, or refunded after your visit if you don't. This reserves
            your time with the work — it isn't a purchase.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-black text-white min-h-screen px-6 md:px-10 pt-32 md:pt-40 pb-24">
      <div className="max-w-xl mx-auto">
        <h1 className="font-instrument text-4xl md:text-6xl mb-6">Reserve a private viewing</h1>
        <p className="text-white/60 text-base md:text-lg mb-10 leading-relaxed">
          Spend unhurried time with a piece before deciding anything. A ${DEPOSIT} deposit
          holds your slot — it's credited toward the work if you acquire it, or refunded
          after your visit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-white/40 text-xs uppercase tracking-wide">Viewing details</h2>
            <div>
              <label className="block text-white/50 text-sm mb-2">Piece</label>
              <select
                value={piece}
                onChange={(e) => setPiece(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white/60"
              >
                <option value="" className="bg-black">Choose a piece</option>
                {pieces.map((p) => (
                  <option key={p.title} value={p.title} className="bg-black">
                    {p.title} — {p.artist}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-white/50 text-sm mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white/60"
                />
              </div>
              <div>
                <label className="block text-white/50 text-sm mb-2">Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white/60"
                >
                  <option value="" className="bg-black">Select</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-black">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">Guests</label>
              <input
                type="number"
                min={1}
                max={4}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white/60"
              />
            </div>
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 text-white/70 text-sm">
                <input
                  type="checkbox"
                  checked={conditionReport}
                  onChange={(e) => setConditionReport(e.target.checked)}
                  className="accent-white"
                />
                Send a condition report beforehand
              </label>
              <label className="flex items-center gap-3 text-white/70 text-sm">
                <input
                  type="checkbox"
                  checked={provenance}
                  onChange={(e) => setProvenance(e.target.checked)}
                  className="accent-white"
                />
                Include provenance documents
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-white/40 text-xs uppercase tracking-wide">Contact</h2>
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
          </div>

          <div className="space-y-6">
            <h2 className="text-white/40 text-xs uppercase tracking-wide">
              Refundable deposit — ${DEPOSIT}
            </h2>
            <div>
              <label className="block text-white/50 text-sm mb-2">Card number</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="•••• •••• •••• ••••"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/60"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-white/50 text-sm mb-2">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/60"
                />
              </div>
              <div>
                <label className="block text-white/50 text-sm mb-2">CVC</label>
                <input
                  type="text"
                  placeholder="•••"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/60"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="inline-block px-8 py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full hover:bg-white/90"
          >
            Confirm viewing — ${DEPOSIT}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Reserve
