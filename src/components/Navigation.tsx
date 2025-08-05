'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.9, 1])
  const backdropBlur = useTransform(scrollYProgress, [0, 0.1], [0, 20])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.offsetTop
      // Individual offsets for each section - easily adjustable
      const offsets: { [key: string]: number } = {
        'temperature': 80,  // Profile section
        'library': 50,       // Library section  
        'gear': 80,          // Gear section
        'watch': 80          // Alternative gear section ID
      }
      
      const offset = offsets[sectionId] || 100 // Default to 100 if section not found
      const offsetPosition = elementPosition - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ opacity }}
        className={`fixed top-0 left-0 right-0 z-40 p-6 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm">D</span>
            </div>
            <span className="text-sm font-light tracking-wider">Unposted</span>
          </motion.div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-light">
            <motion.button
              onClick={() => scrollToSection('temperature')}
              className="hover:text-blue-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Profile
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
              />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('library')}
              className="hover:text-blue-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Library
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
              />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('watch')}
              className="hover:text-blue-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Gear
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
              />
            </motion.button>
          </div>

          {/* Language Selection & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selection */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <motion.button
                className="underline"
                whileHover={{ scale: 1.1 }}
              >
                English
              </motion.button>
              <motion.button
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Portuguese
              </motion.button>
              <motion.button
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Chinese
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-6 space-y-4">
            <motion.button
              onClick={() => scrollToSection('temperature')}
              className="block w-full text-left hover:text-blue-400 transition-colors"
              whileHover={{ x: 10 }}
            >
              Profile
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('library')}
              className="block w-full text-left hover:text-blue-400 transition-colors"
              whileHover={{ x: 10 }}
            >
              Library
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('watch')}
              className="block w-full text-left hover:text-blue-400 transition-colors"
              whileHover={{ x: 10 }}
            >
              Gear
            </motion.button>

            {/* Mobile Language Selection */}
            <div className="pt-4 border-t border-gray-700 space-y-2">
              <motion.button
                className="block underline"
                whileHover={{ x: 10 }}
              >
                English
              </motion.button>
              <motion.button
                className="block text-gray-400 hover:text-white transition-colors"
                whileHover={{ x: 10 }}
              >
                Deutsch
              </motion.button>
              <motion.button
                className="block text-gray-400 hover:text-white transition-colors"
                whileHover={{ x: 10 }}
              >
                Français
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}
