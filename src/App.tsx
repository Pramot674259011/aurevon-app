import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Story from './pages/Story'
import Collection from './pages/Collection'
import Inquire from './pages/Inquire'
import Waitlist from './pages/Waitlist'
import Reserve from './pages/Reserve'

function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/inquire" element={<Inquire />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/reserve" element={<Reserve />} />
      </Routes>
    </div>
  )
}

export default App
