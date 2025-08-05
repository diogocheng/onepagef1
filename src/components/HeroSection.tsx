'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -300])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Fixed position */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/_title_padel_202508021759_ginj5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Permanent dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {/* Content with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-20"
      >

      {/* BAIKAL Text with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="relative z-10 text-center mt-72"
      >
        <motion.h1
          className="text-8xl md:text-[12rem] lg:text-[15rem] font-bold tracking-wider text-white/90"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {["O", "N", "E", " ", "P", "A", "G", "E"].map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="inline-block hover:text-[rgba(200,200,200,0.15)] transition-colors duration-300"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>

      {/* Expedition Description with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: -50 }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute bottom-20 left-6 md:left-12 max-w-md text-white z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3 mb-4 cursor-pointer"
        >
          <div className="relative">
            <img
              src="/_DSC9091.jpg"
              alt="Diogo Cheng"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <p className="text-sm font-medium">Diogo Cheng</p>
            <p className="text-xs text-gray-300">Recreational Padel Player</p>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg leading-relaxed"
        >
          Started from tennis to now a padel newbie, now I can actually hit the ball over the net most of the time! Living proof that anyone can fall in love with this crazy sport.
        </motion.p>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => {
          const profileSection = document.getElementById('experience');
          if (profileSection) {
            const offset = profileSection.offsetTop - 82; // 100px above the section
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 group"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center group-hover:border-blue-400 transition-colors">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2 group-hover:bg-blue-400 transition-colors"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-blue-400 transition-colors" />
        </motion.div>
      </motion.div>

      {/* Floating elements for atmosphere */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/3 w-1 h-1 bg-white/20 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1
        }}
      />
      </motion.div>
    </section>
  )
}
