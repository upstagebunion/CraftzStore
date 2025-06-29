'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';

export default function FeatureCarousel() {
    const features = [
        {
            id: 'quality',
            image: '/images/home-page/feature/calidad.webp',
            title: "Calidad Premium",
            description: "Materiales de primera calidad 100% algodón que garantizan durabilidad y comodidad en cada prenda.",
            bgColor: 'bg-feature1'
        },
        {
            id: 'durability',
            image: '/images/home-page/feature/durabilidad.jpg',
            title: "Durabilidad",
            description: "Estampado resistente a al menos 50 lavadas sin perder color.",
            bgColor: 'bg-feature2'
        },
        {
            id: 'breathability',
            image: '/images/home-page/feature/semitonos.jpg',
            title: "Transpirabilidad",
            description: "Impresion en semitonos para mayor transpirabilidad y evitar efecto de desgaste.",
            bgColor: 'bg-feature3'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const TRANSITION_DELAY = 5000; // 3 segundos por slide

    // Rotación automática
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % features.length);
        }, TRANSITION_DELAY);
        
        return () => clearInterval(interval);
    }, [features.length]);

    const activeFeature = features[currentIndex];

    // Animaciones
    const imageVariants: Variants = {
        hidden: { opacity: 0, x: -50, rotate: -5 },
        visible: { 
            opacity: 1, 
            x: 0, 
            rotate: 0,
            transition: { 
                type: 'spring', 
                stiffness: 100,
                damping: 10
            } as Transition
        },
        exit: { opacity: 0, x: 50, rotate: 5 }
    };

    const textVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                delay: 0.2,
                type: 'spring', 
                stiffness: 100 
            } as Transition
        },
        exit: { opacity: 0, y: -20 }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            } as Transition
        },
        exit: { opacity: 0 }
    };

    return (
        <section className={`py-12 ${activeFeature.bgColor} transition-colors duration-500`}>
            <div className="container mx-auto px-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFeature.id}
                        className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        {/* Imagen - Izquierda en escritorio, centrada en móvil */}
                        <motion.div 
                            className="w-full md:w-1/2 flex justify-center"
                            variants={imageVariants}
                        >
                            <motion.img
                                src={activeFeature.image}
                                alt={activeFeature.title}
                                className="rounded-2xl object-cover w-full max-w-md h-64 md:h-80 shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 400 } as Transition}
                            />
                        </motion.div>

                        {/* Texto - Derecha en escritorio, debajo en móvil */}
                        <motion.div 
                            className="w-full md:w-1/2 text-center md:text-left"
                            variants={textVariants}
                        >
                            <motion.h2 
                                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                                whileHover={{ scale: 1.01 }}
                            >
                                {activeFeature.title}
                            </motion.h2>
                            <motion.p 
                                className="text-lg md:text-xl text-foreground/90"
                                whileHover={{ scale: 1.01 }}
                            >
                                {activeFeature.description}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Indicadores (opcional) */}
                <div className="flex justify-center mt-8 gap-2">
                    {features.map((_, idx) => (
                        <motion.div
                            key={idx}
                            className={`h-2 rounded-full ${idx === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                            initial={{ scale: 0.8, width: 8 }}
                            animate={{ 
                                scale: idx === currentIndex ? 1.2 : 0.8,
                                width: idx === currentIndex ? 24 : 8
                            }}
                            transition={{ duration: 0.3 } as Transition}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}