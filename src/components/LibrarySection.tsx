'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

export default function LibrarySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [inspectedImage, setInspectedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  const inspectImage = (imageSrc: string) => {
    setInspectedImage(imageSrc);
  };

  const closeInspectImage = () => {
    setInspectedImage(null);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      // Calculate scroll amount for 1 image (400px + 24px gap)
      const imageWidth = 400;
      const gap = 24; // 6 * 4px from gap-6
      const scrollAmount = imageWidth + gap; // Scroll 1 image at a time
      
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount) // Prevent scrolling past start
        : currentScroll + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const photos = [
    '/p1.jpg',
    '/p3.png', 
    '/p5.png',
    '/p6.png',
    '/pac.jpg',
    '/pac2.png',
    '/padeu2.jpg',
    '/padeu3.jpg',
    '/_DSC9091.jpg'
  ];

  return (
    <section className="py-20 bg-[#f5f5f5]">
      {/* Full-screen image modal */}
      {isImageZoomed && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/pac.jpg"
              alt="Library Image Full Screen"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={toggleImageZoom}
              className="absolute top-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 bg-black/50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Carousel image inspection modal */}
      {inspectedImage && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={inspectedImage}
              alt="Inspected Image Full Screen"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={closeInspectImage}
              className="absolute top-4 right-4 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 bg-black/50 hover:bg-black/70"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          
        </motion.div>

        {/* Side-by-side media layout with symmetrical margins */}
        <div className="flex flex-col lg:flex-row gap-5 -mx-24">
          {/* Left column - Image */}
          <div className="flex-1">
            <div>
              <div className="relative">
                <img
                  src="/pac.jpg"
                  alt="Hallo"
                  className="w-full h-[600px] object-cover"
                  style={{ maxWidth: '100%' }}
                />
                <button
                  onClick={toggleImageZoom}
                  className="absolute bottom-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                >
                  {isImageZoomed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Video */}
          <div className="flex-1">
            <div>
              <div className="relative">
                <video
                  ref={videoRef}
                  src="/pf.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[600px] object-cover"
                  style={{ maxWidth: '100%' }}
                />
                <button
                  onClick={togglePlayPause}
                  className="absolute bottom-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 italic text-right">
                Playing with some friends in douro padel
              </p>
            </div>
          </div>
        </div>

                {/* Photo Carousel Section */}
        <div className="mt-20">
          <div className="relative -mx-24">
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                paddingRight: '24px',
                cursor: 'grab'
              }}
            >
              {photos.map((photo, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 group relative"
                >
                  <div className="relative overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <img
                      src={photo}
                      alt={`Gallery photo ${index + 1}`}
                      className="w-[400px] h-[500px] object-cover"
                      style={{ maxWidth: '100%' }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => inspectImage(photo)}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 bg-black/30 hover:bg-black/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 bg-black/30 hover:bg-black/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 italic text-right mt-2">
            Photo gallery
          </p>
        </div>
      </div>
    </section>
  );
}