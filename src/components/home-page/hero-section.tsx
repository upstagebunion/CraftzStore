'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection(){
    return (
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          {/* Title - centered on all screens */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crea tu estilo único
          </motion.h1>

          {/* Content container - flex column on mobile, row on desktop */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - text content */}
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-semibold mb-4"
                whileHover={{ scale: 1.02 }}
              >
                Personalización ilimitada
              </motion.h3>
              
              <motion.p 
                className="text-xl mb-6"
                whileHover={{ scale: 1.01 }}
              >
                Playeras para todo tipo de evento, el regalo perfecto y con una calidad
                garantizada de al menos 50 lavadas, esto y más estas por descubrir.
              </motion.p>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link 
                  href="/customize" 
                  className="inline-flex items-center bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                >
                  Descubre nuestros productos <ArrowRightIcon className="ml-2 h-10" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - image */}
            <motion.div 
              className="w-full relative h-80 md:h-96 md:flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image 
                src='/images/home-page/playeras.png'
                alt="Custom t-shirts display"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>
    )
}