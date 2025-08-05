'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

export function FinalSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section id="watch" ref={ref} className="bg-gray-50 text-black">
      {/* Success Story */}
      <div className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Video */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-96 object-cover rounded-lg"
              >
                <source src="/unb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold leading-tight">
                At the beginning of my padel journey, it wasn't clear whether
                there would be any essential equipment needed at all. In the end,
                the selection was a complete success. The perfect <span className="text-blue-400">gear</span> that
                became my trusted companion on court.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Nordwand Knit High GTX Section */}
      <div className="relative bg-white py-20 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/DROPSHOT PADEL Promo video nottennis.com.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Product */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="/jg.png"
                alt="Nox AT10 Genius 18K Limited Edition racket"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6 text-white"
            >
              <div className="text-sm text-blue-400 flex items-center space-x-2">
                Current Racket
              </div>

              <h3 className="text-3xl font-bold leading-tight text-white">
                My racket of choice. The{' '}
                <span className="text-blue-400">Nox AT10 Genius 18K Limited Edition</span>{' '}
                racket that became my trusted companion. Precision meets power in every shot,
                delivering exceptional control on court.
              </h3>

              <div className="space-y-4 text-sm text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Surprisingly really comfortable and dynamic</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Really versatile in the air both on volleys and upper shots</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Great balance between power and control</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Just feels right in my hands during matches</span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Shop Racket</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Final Quote */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h4 className="text-3xl md:text-4xl font-light mb-8 text-gray-300">
              A sublime moment in a spectacular setting.
            </h4>

            {/* Product Showcase */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <span className="text-blue-500">Eigerjoch Pro IN Hooded Jacket</span>
              <span className="text-blue-500">Nox AT10 Genius 18K Limited Edition</span>
              <span className="text-blue-500">Nordwand MIPS Helmet</span>
              <span className="text-blue-500">Nordwand Pro HS Pants</span>
              <span className="text-blue-500">Nordwand Pro HS Hooded Jacket</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
