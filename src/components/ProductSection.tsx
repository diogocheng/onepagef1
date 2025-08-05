'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Thermometer, Shield, Zap } from 'lucide-react'

export function ProductSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="technology" ref={ref} className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="text-sm text-orange-500 flex items-center space-x-4">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer border-b border-orange-500 pb-1"
              >
                Men
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer hover:border-b hover:border-orange-400 pb-1 transition-all"
              >
                Women
              </motion.span>
            </div>

            <motion.h2
              className="text-4xl font-bold leading-tight"
              variants={itemVariants}
            >
              The <span className="text-orange-500 relative">
                Eigerjoch Pro IN Hooded Jacket
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-orange-500"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
              {' '}is designed for extremely cold and harsh conditions,
              keeping him warm even when temperatures drop to -40°C.
            </motion.h2>

            <motion.button
              whileHover={{ x: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors group"
              variants={itemVariants}
            >
              <ArrowRight className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-medium">Shop Jacket</span>
            </motion.button>
          </motion.div>

          {/* Right Product Image */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.img
                src="https://ext.same-assets.com/3039044760/458691725.webp"
                alt="Eigerjoch Pro IN Hooded Jacket"
                className="w-full max-w-sm mx-auto relative z-10"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Product Features with icons */}
            <motion.div
              variants={containerVariants}
              className="mt-6 space-y-4 text-sm"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="group-hover:text-orange-400 transition-colors">Ultra-light Pertex Quantum Pro</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="group-hover:text-orange-400 transition-colors">Treated with an ultra-thin water-repellent and insulated with a water-resistant filling</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="group-hover:text-orange-400 transition-colors">Fill power 850 in Water-repellent 90/10 goose down</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span className="font-medium group-hover:text-orange-400 transition-colors">The warmest jacket Mammut offers</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Nordwand Pro Section */}
      <div className="container mx-auto px-6 md:px-12 mt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Product Images */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg"
            >
              <img
                src="https://ext.same-assets.com/3039044760/389806600.webp"
                alt="Climber in orange gear on ice"
                className="w-full h-64 object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg"
            >
              <img
                src="https://ext.same-assets.com/3039044760/3173120181.webp"
                alt="Close-up of climbing boots on ice"
                className="w-full h-64 object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="text-sm text-orange-500 flex items-center space-x-4">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer border-b border-orange-500 pb-1"
              >
                Men
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer hover:border-b hover:border-orange-400 pb-1 transition-all"
              >
                Women
              </motion.span>
            </div>

            <motion.h3
              className="text-4xl font-bold leading-tight"
              variants={itemVariants}
            >
              The rugged <span className="text-orange-500 relative">
                Nordwand Pro HS Hooded
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-orange-500"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: 1.5 }}
                />
              </span>
              {' '}is perfect for extreme conditions and ensures unrestricted freedom of motion.
              Today, Arnold is pioneering a new route.
            </motion.h3>

            <motion.button
              whileHover={{ x: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors group"
              variants={itemVariants}
            >
              <ArrowRight className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-medium">Shop Jacket</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
