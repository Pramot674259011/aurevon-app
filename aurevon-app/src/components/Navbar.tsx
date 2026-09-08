import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flower2 } from 'lucide-react'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Story', path: '/story' },
  { label: 'Collection', path: '/collection' },
  { label: 'Reserve', path: '/reserve' },
  { label: 'Inquire', path: '/inquire' },
]

function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [overlayOpen])

  const closeOverlay = () => setOverlayOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left — logo */}
          <Link
            to="/"
            className={`text-white text-xl md:text-2xl font-semibold tracking-tight z-50 transition-all duration-700 ease-entrance ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? '0ms' : '0ms' }}
          >
            Aurevon
          </Link>

          {/* Center — desktop pill */}
          <button
            type="button"
            onClick={() => setOverlayOpen((v) => !v)}
            className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm hover:bg-white/10 transition-all duration-700 ease-entrance ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? '200ms' : '0ms' }}
          >
            {overlayOpen ? 'Close' : 'Navigate'}
          </button>

          {/* Right — desktop flower icon */}
          <div
            className={`hidden md:flex items-center transition-all duration-700 ease-entrance ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? '400ms' : '0ms' }}
          >
            <Flower2 className="w-7 h-7 text-white/90" />
          </div>

          {/* Right — mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOverlayOpen((v) => !v)}
            className={`md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50 transition-all duration-700 ease-entrance ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? '200ms' : '0ms' }}
          >
            <span
              className={`w-6 h-[2px] bg-white transition-transform duration-500 ease-overlay ${
                overlayOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-transform duration-500 ease-overlay ${
                overlayOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center transition-all duration-700 ease-overlay ${
          overlayOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map(({ label, path }, index) => (
            <Link
              key={label}
              to={path}
              onClick={closeOverlay}
              className={`text-white font-instrument text-4xl md:text-6xl hover:opacity-60 transition-all duration-[600ms] ease-overlay ${
                overlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionDelay: overlayOpen ? `${150 + index * 80}ms` : '0ms',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar
