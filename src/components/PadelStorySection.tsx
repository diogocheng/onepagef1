'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function PadelStorySection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section id="library" ref={ref} className="bg-gray-50 text-black">
      <div className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold leading-tight">
                At the beginning of capturing my padel journey, it wasn't clear whether
                there would be any memorable moments to document at all. In the end,
                the collection was a complete success. A curated <span className="text-blue-400">library</span> of photos
                showcasing the passion, dedication, and triumphs on the courts.
              </h2>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/padel123.jpg"
                alt="Padel court action"
                className="w-full h-80 object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
