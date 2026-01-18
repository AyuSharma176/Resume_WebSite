import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated dark background */}
      <div className="absolute inset-0 bg-slate-950"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <div className="animate-fadeInUp">
          {/* Profile Image and Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center mb-8">
            {/* Profile Image */}
            <div className="relative group mx-auto md:mx-0">
              {/* Animated gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-300 animate-pulse"></div>
              {/* Image container */}
              <div className="relative w-48 h-48 md:w-full md:h-48 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/profile.png" 
                  alt="Ayush Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                    Ayush Sharma
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"></span>
                </span>
              </h2>
              <p className="text-2xl md:text-3xl text-cyan-300 font-bold flex items-center gap-3">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                B.Tech Computer Science Engineering Student
              </p>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-12 max-w-4xl">
            Passionate computer science student with a strong foundation in{' '}
            <span className="text-cyan-400 font-semibold">software development</span>,{' '}
            <span className="text-blue-400 font-semibold">data structures</span>, and{' '}
            <span className="text-purple-400 font-semibold">algorithms</span>. 
            Building innovative solutions and seeking opportunities to make an impact.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="group flex items-center gap-4 text-slate-200 bg-slate-800/40 backdrop-blur-xl rounded-2xl px-6 py-5 border border-slate-700/50 hover:bg-slate-800/60 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <FaEnvelope className="text-white text-xl animate-float" />
              </div>
              <div className="flex-1 min-w-0">
                <a href="mailto:ayusharma1706@gmail.com" className="text-sm font-semibold hover:text-indigo-300 transition-colors truncate block">
                  ayusharma1706@gmail.com
                </a>
              </div>
            </div>
            
            <div className="group flex items-center gap-4 text-slate-200 bg-slate-800/40 backdrop-blur-xl rounded-2xl px-6 py-5 border border-slate-700/50 hover:bg-slate-800/60 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <FaPhone className="text-white text-xl animate-float" style={{animationDelay: '0.2s'}} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">+91 6396168485</span>
              </div>
            </div>
            
            <div className="group flex items-center gap-4 text-slate-200 bg-slate-800/40 backdrop-blur-xl rounded-2xl px-6 py-5 border border-slate-700/50 hover:bg-slate-800/60 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <FaMapMarkerAlt className="text-white text-xl animate-float" style={{animationDelay: '0.4s'}} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">India</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="#contact" className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
              Get In Touch
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a href="/AyushSharma_BtechCSE_GLAU.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 bg-slate-800/40 backdrop-blur-xl border-2 border-slate-700/50 text-white rounded-xl font-bold text-lg hover:bg-slate-800/60 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300">
              <FaDownload className="group-hover:animate-bounce" />
              Download CV 
            </a>
            
            <div className="flex gap-4">
              <a href="https://github.com/AyuSharma176" target="_blank" rel="noopener noreferrer" 
                 className="w-14 h-14 flex items-center justify-center bg-slate-800/40 backdrop-blur-xl rounded-xl text-white text-2xl border-2 border-slate-700/50 hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-600 hover:to-blue-600 hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/ayusharma17/" target="_blank" rel="noopener noreferrer" 
                 className="w-14 h-14 flex items-center justify-center bg-slate-800/40 backdrop-blur-xl rounded-xl text-white text-2xl border-2 border-slate-700/50 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default About
