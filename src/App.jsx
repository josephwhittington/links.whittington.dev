import { useState } from 'react'
import * as lucide from 'lucide-react'
import { FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6'
import './App.css'
import data from './data/links.json'

const brandIcons = {
  Twitter: FaXTwitter,
  Youtube: FaYoutube,
  Instagram: FaInstagram,
}

function LinkCard({ label, url, icon }) {
  const isExternal = url.startsWith('http') || url.startsWith('mailto')
  const Icon = brandIcons[icon] || lucide[icon]
  
  return (
    <a
      href={url}
      className="link-card"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </a>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const page = data.pages[currentPage]

  return (
    <main className="container">
      <nav className="nav">
        {data.nav.map((item) => (
          <button
            key={item.page}
            className={`nav-btn ${currentPage === item.page ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.page)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <header className="header">
        <h1>{page.greeting}</h1>
        <p className="tagline">{page.tagline}</p>
      </header>

      <div className="links">
        {page.links.map((link, index) => (
          <LinkCard key={index} {...link} />
        ))}
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {data.name}</p>
      </footer>
    </main>
  )
}

export default App
