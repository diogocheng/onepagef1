'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function TemperatureSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <section id="temperature" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/padeu2.jpg"
          alt="Padel tournament"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Temperature Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ 
          duration: 1.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="relative z-10 text-center text-white"
      >
        <div className="relative">
          {/* Temperature Circle */}
          <motion.div
            initial={{ rotate: -180, scale: 0.8 }}
            animate={inView ? { rotate: 360, scale: 1 } : {}}
            transition={{ 
              duration: 2.5, 
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }}
                className="text-center"
              >
                <motion.div 
                  initial={{ y: 20 }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-6xl font-bold mb-2"
                >
                  21
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-xl font-light"
                >
                  Times Played
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-xl font-light"
                >
                  August
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wind Speed Info */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: -30 }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ 
          duration: 1.2, 
          delay: 1.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="absolute bottom-32 left-6 md:left-12 text-white z-10"
      >
        <p className="text-lg">Diogo has played 21 times in the month of August</p>
      </motion.div>

      {/* All Stats on Right Side */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: 30 }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ 
          duration: 1.2, 
          delay: 2.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="absolute top-16 right-6 md:right-12 text-white z-10 text-right"
      >
        <div className="space-y-6 text-sm font-mono">
          {/* Core Performance Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-2"
          >
            <div className="text-lg font-light mb-2">August Performance</div>
            {['14 Matches Won this month', '67% Win Rate in August', '42 Hours Played total', 'Favorite Shot: Bandeja', 'Biggest Streak of 6 games in a row'].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 2.4 + (index * 0.1),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {stat}
              </motion.div>
            ))}
          </motion.div>

          {/* Monthly Progress */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-2"
          >
            <div className="text-lg font-light mb-2">Monthly Progress</div>
            {['July: 18 matches → August: 21 matches (+17%)', 'July Win Rate: 61% → August: 67% (+6%)', 'Average Match Duration: 68 minutes', 'Best Performance: 5-0 streak'].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 3.0 + (index * 0.1),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {stat}
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements & Records */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 3.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-2"
          >
            <div className="text-lg font-light mb-2">Achievements</div>
            {['🏆 Won Summer Tournament 2024', '🥈 2nd Place Regional Championship', '🏅 Club Champion 2024', '⭐ Player of the Month - August', '🎯 95% First Serve Accuracy', '💪 Longest Rally: 47 shots', 'Has played the most in Douro Padel'].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 3.6 + (index * 0.1),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {stat}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
