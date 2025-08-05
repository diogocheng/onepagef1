'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function DiogoStatsSection() {
  const [isClient, setIsClient] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Always call hooks in the same order - even during SSR
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const ballProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  
  // Pre-calculate all transforms at the top level
  const ballRotateX = useTransform(ballProgress, [0, 1], [0, 720])
  const ballRotateY = useTransform(ballProgress, [0, 1], [-30, 30])
  const ballScale = useTransform(ballProgress, [0, 0.5, 1], [0.8, 1.4, 0.9])
  const ballY = useTransform(ballProgress, [0, 1], [0, -50])
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const stats = [
    { 
      label: "Pure CSS", 
      value: "Tennis Ball", 
      description: "No Dependencies",
      icon: "🎾"
    },
    { 
      label: "720°", 
      value: "Rotation", 
      description: "Smooth Spinning",
      icon: "🔄"
    },
    { 
      label: "Dynamic", 
      value: "Scaling", 
      description: "Size Changes",
      icon: "📏"
    },
    { 
      label: "Buttery", 
      value: "Smooth", 
      description: "60fps Animation",
      icon: "⚡"
    }
  ]

  if (!isClient) {
    return (
      <section 
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Tennis Ball Animation
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Smooth scroll-triggered CSS animation
            </p>
          </div>
          <div className="flex justify-center items-center mb-16">
            <div className="w-96 h-96 relative flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-500 relative shadow-2xl">
                <div className="absolute inset-0 rounded-full border-2 border-white opacity-60"></div>
                <div className="absolute top-4 left-8 w-32 h-1 bg-white rounded-full opacity-80"></div>
                <div className="absolute bottom-4 right-8 w-32 h-1 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-8 right-4 w-8 h-8 bg-yellow-100 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-green-200 mb-2">{stat.label}</div>
                <div className="text-xs text-green-100 opacity-80">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden"
    >
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tennis Ball Animation
          </motion.h2>
          <motion.p 
            className="text-xl text-green-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Smooth scroll-triggered CSS animation
          </motion.p>
        </div>

        {/* Tennis Ball Container */}
        <div className="flex justify-center items-center mb-16">
          <motion.div 
            className="w-96 h-96 relative flex items-center justify-center"
            style={{
              rotateX: ballRotateX,
              rotateY: ballRotateY,
              scale: ballScale,
              y: ballY,
            }}
          >
            {/* Beautiful CSS Tennis Ball */}
            <div className="relative">
              {/* Main ball */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 relative shadow-2xl">
                {/* Curved seam lines */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white rounded-full transform -translate-y-1/2 rotate-12 opacity-90"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white rounded-full transform -translate-y-1/2 -rotate-12 opacity-90"></div>
                </div>
                
                {/* Highlight for 3D effect */}
                <div className="absolute top-8 left-12 w-16 h-16 bg-yellow-100 rounded-full opacity-50 blur-sm"></div>
                <div className="absolute top-12 left-16 w-8 h-8 bg-white rounded-full opacity-30"></div>
                
                {/* Subtle texture */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
              </div>
              
              {/* Dynamic shadow */}
              <motion.div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black/30 rounded-full blur-md"
                style={{
                  width: useTransform(ballScale, [0.8, 1.4, 0.9], [120, 200, 140]),
                  height: useTransform(ballScale, [0.8, 1.4, 0.9], [20, 35, 25]),
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-green-200 mb-2">{stat.label}</div>
              <div className="text-xs text-green-100 opacity-80">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
