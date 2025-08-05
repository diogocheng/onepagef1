'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function ProfileSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <section id="experience" ref={ref} className="py-20 bg-gray-50 text-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/_DSC9091.jpg"
              alt="Diogo Cheng123"
              className="w-full h-80 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-4 italic">
              Padeu Tournament with Filipe Zhu M5
            </p>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Diogo Cheng</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Real Life Job</p>
                <p className="font-medium">I do what it takes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                <p className="font-medium">23 Oct 2002</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Playing since</p>
                <p className="font-medium">2024</p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-lg leading-relaxed text-gray-700">
              Hey, I’m Diogo, a Data Engineer who enjoys building clean, purposeful experiences.
              I built this to give people a space to create their own personal hobbies page — something we call a One Page. It’s all about helping users express what they’re passionate about in a clean, focused way.
              </p>
              

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
