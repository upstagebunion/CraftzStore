'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ReviewsCarousel() {
    const reviews = [
        {
            id: 'review-1',
            images: [
                '/images/home-page/reviews/billie-elish/billie.jpg'
            ],
            quote: '"Los recomiendo mucho, quedaron muy lindas las playeras que pedí.!!"',
            author: "Cliente Local.",
            date: "11 de Junio, 2024",
            rating: 5,
            link: null
        },
        {
            id: 'review-2',
            images: [
                '/images/home-page/reviews/ml/ml1.jpg',
                '/images/home-page/reviews/ml/ml2.png',
                '/images/home-page/reviews/ml/ml3.jpg'
            ],
            quote: '"Me encantó el estampado y muy buena calidad en tela, sin duda se que mi pareja le encantará cuando se la de."',
            author: "Cliente Mercado Libre",
            date: "20 de Agosto, 2024",
            rating: 5,
            link: 'https://articulo.mercadolibre.com.mx/MLM-2093753497-playera-manga-corta-calacas-chidas-toca-pierna-gym-_JM'
        },
        {
            id: 'review-3',
            images: [
                '/images/home-page/reviews/whatsapp/w1.png',
                '/images/home-page/reviews/whatsapp/w2.jpg',
                '/images/home-page/reviews/whatsapp/w3.jpg'
            ],
            quote: '"Exelente trabajo de la camisas , me gustaron como quedaron muchas gracias 🤩🫱🏽‍🫲🏽 Y la talla quedó perfecta 👌🏼"',
            author: "Cliente Local.",
            date: "10 de Septiembre, 2024",
            rating: 5,
            link: null
        },
        {
            id: 'review-3',
            images: [
                '/images/home-page/reviews/proem/p1.jpeg',
                '/images/home-page/reviews/proem/p2.jpg',
                '/images/home-page/reviews/proem/p3.jpg'
            ],
            quote: '"Solo para presumir mi super playera de @craftz.personaliza"',
            author: "Cliente Local.",
            date: "22 de Mayo, 2024",
            rating: 5,
            link: "https://www.instagram.com/stories/highlights/18347027146108004/"
        }
    ];

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const IMAGE_CHANGE_DELAY = 4000; // 4 segundos para cambio automático de imágenes
    const currentReview = reviews[currentReviewIndex];

    // Rotación automática de imágenes dentro de la review actual
    useEffect(() => {
        if (currentReview.images.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % currentReview.images.length);
        }, IMAGE_CHANGE_DELAY);
        
        return () => clearInterval(interval);
    }, [currentReviewIndex, currentReview.images.length]);

    const goToNextReview = () => {
        setCurrentReviewIndex(prev => (prev + 1) % reviews.length);
        setCurrentImageIndex(0); // Resetear índice de imagen al cambiar de review
    };

    const goToPrevReview = () => {
        setCurrentReviewIndex(prev => (prev - 1 + reviews.length) % reviews.length);
        setCurrentImageIndex(0); // Resetear índice de imagen al cambiar de review
    };

    // Animación tipo ruleta
    const reviewVariants = {
        enter: (direction: number) => ({
            rotateY: direction > 0 ? 90 : -90,
            opacity: 0
        }),
        center: {
            rotateY: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            rotateY: direction < 0 ? 90 : -90,
            opacity: 0
        })
    };

    return (
        <section className="py-10 bg-background">
            <div className="mx-auto relative">
                <h2 className="text-3xl font-bold text-center mb-12">Opiniones de nuestros clientes</h2>
                
                <div className="relative">
                    <AnimatePresence mode="wait" custom={1}>
                        <motion.div
                            key={currentReview.id}
                            className="flex flex-col mx-8 md:mx-15 lg:mx-25 lg:flex-row items-center gap-8 md:gap-12 bg-white rounded-2xl p-6 shadow-lg"
                            custom={1}
                            variants={reviewVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ 
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            }}
                        >
                            {/* Imágenes - Carrusel automático */}
                            <div className="w-full lg:w-1/2 relative">
                                <div className="relative h-80 md:h-100 lg:h-150 w-full rounded-xl overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={`${currentReview.id}-${currentImageIndex}`}
                                            src={currentReview.images[currentImageIndex]}
                                            alt={`Review ${currentReviewIndex + 1}`}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </AnimatePresence>
                                </div>
                                
                                {/* Indicadores de imágenes (solo si hay más de 1) */}
                                {currentReview.images.length > 1 && (
                                    <div className="flex justify-center mt-4 gap-2">
                                        {currentReview.images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}
                                                aria-label={`Ir a imagen ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Contenido de la review */}
                            <div className="w-full lg:w-1/2">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-6 h-6 ${i < currentReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                
                                <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                                    "{currentReview.quote}"
                                </blockquote>
                                
                                <div className="text-gray-600 mb-6">
                                    <p className="font-semibold">{currentReview.author}</p>
                                    <p className="text-sm">{currentReview.date}</p>
                                </div>
                                
                                {currentReview.link && (
                                    <a 
                                        href={currentReview.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                    >
                                        Ver review completa
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Flechas de navegación */}
                    <button
                        onClick={goToPrevReview}
                        className="absolute mouse-pointer left-1 md:left-3 lg:left-5 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 px-1 md:px-4 py-4 rounded-full shadow-md hover:bg-white transition"
                        aria-label="Review anterior"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={goToNextReview}
                        className="absolute mouse-pointer right-1 md:right-3 lg:right-5 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 px-1 md:px-4 py-4 rounded-full shadow-md hover:bg-white transition"
                        aria-label="Siguiente review"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}