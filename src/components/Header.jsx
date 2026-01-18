import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['About', 'Education', 'Experience', 'Skills', 'Projects', 'Coding Profiles', 'Contact']

  const getNavHref = (item) => {
    if (item === 'Coding Profiles') {
      return '#competitiveprogramming'
    }
    return `#${item.toLowerCase()}`
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/60 shadow-2xl shadow-black/50 border-b border-white/10 py-3' 
          : 'bg-slate-900/40 border-b border-white/5 py-4'
      } backdrop-blur-xl backdrop-saturate-150`}>
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center">
            <div className="logo group">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-105 transition-transform cursor-pointer">
                Ayush Sharma
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a 
                  key={item}
                  href={getNavHref(item)} 
                  className="relative px-5 py-2.5 text-slate-300 font-semibold text-sm hover:text-cyan-400 transition-all duration-300 group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-[80%] rounded-full"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-cyan-400 text-2xl hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        
        {/* Drawer */}
        <div className={`absolute top-0 right-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20 pointer-events-none"></div>
          
          {/* Close button */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 relative">
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Menu
            </h2>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-cyan-400 text-2xl hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col p-6 gap-2 relative">
            {navItems.map((item, index) => (
              <a 
                key={item}
                href={getNavHref(item)}
                onClick={handleNavClick}
                className="group relative px-5 py-4 text-slate-300 font-semibold hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 border border-transparent hover:border-cyan-500/30"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: mobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}} />
    </>
  )
}

export default Header
