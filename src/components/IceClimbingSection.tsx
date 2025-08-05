'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function IceClimbingSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section id="discover" ref={ref} className="py-20 bg-white text-black">
      <div className="container mx-auto px-6 md:px-12">
        {/* Challenge Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <p className="text-sm text-gray-600 mb-4">
            Just standing on the glass-like surface was a challenge.
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Temperatures are extreme and documentation of the area is scant at best,
            making it difficult to find climbing sites. Finally, the first challenge:
            a cave. Or rather an art installation made of ice. This calls for an outfit change.
          </h2>
        </motion.div>

        {/* Video/Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-96 rounded-lg overflow-hidden mb-16"
        >
          <img
            src="https://ext.same-assets.com/3039044760/588940217.webp"
            alt="Dani Arnold drilling into ice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Ice Climbing Gallery */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="https://ext.same-assets.com/3039044760/3296606409.webp"
              alt="Ice climbing route"
              className="w-full h-80 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-2">
              Exhilarating routes directly above the deepest lake on the planet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img
              src="https://ext.same-assets.com/3039044760/4040474945.webp"
              alt="Climbing in extreme conditions"
              className="w-full h-80 object-cover rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <img
              src="https://ext.same-assets.com/3039044760/1110120851.webp"
              alt="Close-up ice climbing technique"
              className="w-full h-80 object-cover rounded-lg"
            />
          </motion.div>
        </div>

        {/* GORE-TEX Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gray-900 text-white rounded-lg p-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-6">
            Ice and rock. Cold and moisture. A crucible for outdoor gear.
          </h3>
          <p className="text-xl mb-8">
            Superior <span className="text-orange-500 font-semibold">GORE-TEX PRO</span> technology
            offers uncompromising protection in any weather conditions as well as maximum durability.
          </p>
          <div className="text-6xl font-bold text-orange-500 mb-4">
            The biggest challenge is dealing with the cold.
          </div>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            The ice contracts to form a rock-hard surface, smooth as glass.
            It takes a lot of strength to drive the pick into the ice.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
