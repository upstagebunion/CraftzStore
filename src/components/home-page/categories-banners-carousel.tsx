'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CategoriesBannersCarousel() {
    const carouselItems = [
        {
            id: 'hoodies',
            image: '/images/home-page/categories-banners/hoodies-banner.jpg', // Ruta a tu imagen
            title: "Hoodies",
            description: "Sudaderas con capucha de alta calidad",
            url: "/products?category=hoodies"
        },
        {
            id: 'tshirts',
            image: '/images/home-page/categories-banners/oversize-banner.jpg',
            title: "Oversized",
            description: "Playeras cortes oversized",
            url: "/products?category=oversized"
        },
        /*{
            id: 'pants',
            image: '/images/pants.jpg',
            title: "Pants",
            description: "Pantalones cómodos y con estilo",
            url: "/categoria/pantalones"
        },
        {
            id: 'accessories',
            image: '/images/accessories.jpg',
            title: "Accessories",
            description: "Complementos para completar tu look",
            url: "/categoria/accesorios"
        }*/
    ];

    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const AUTOSLIDE_DELAY = 5000;

    const resetAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentCarouselIndex((prev) => (prev + 1) % carouselItems.length);
        }, AUTOSLIDE_DELAY);
    };

    const goToNext = () => {
        setCurrentCarouselIndex((prev) => (prev + 1) % carouselItems.length);
        resetAutoSlide();
    };

    const goToPrev = () => {
        setCurrentCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
        resetAutoSlide();
    };

    useEffect(() => {
        resetAutoSlide();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [carouselItems.length]);

    const variants = {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const activeItem = carouselItems[currentCarouselIndex];

    return (
        <section className="py-8">
            <div className="mx-auto px-4 md:px-20 relative">
                <div className="relative h-30 md:h-40 lg:h-55 overflow-hidden rounded-xl">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={activeItem.id}
                            className="absolute inset-0 w-full h-full"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        >
                            <Link href={activeItem.url} passHref>
                                <div 
                                    className="relative w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${activeItem.image})` }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {/* Overlay que se oscurece al hacer hover */}
                                    <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'opacity-30' : 'opacity-0'}`}></div>
                                    
                                    {/* Contenido del carousel */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                        <motion.div
                                            initial={{ y: 0 }}
                                            animate={{ y: isHovered ? -10 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-center px-4"
                                        >
                                            <h2 className="text-2xl md:text-4xl xl:text-[65px] font-bold mb-0 md:mb-2">{activeItem.title}</h2>
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ 
                                                    opacity: isHovered ? 1 : 0,
                                                    height: isHovered ? 'auto' : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="text-md md:text-xl"
                                            >
                                                {activeItem.description}
                                            </motion.p>
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute left-5 md:left-4 top-1/2 -translate-y-1/2 bg-foreground/30 text-white p-2 rounded-full cursor-pointer hover:bg-foreground/50 transition backdrop-blur-sm"
                    aria-label="Previous slide"
                >
                    <ChevronLeftIcon className="w-4 md:w-6 h-4 md:h-6" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-5 md:right-4 top-1/2 -translate-y-1/2 bg-foreground/30 text-white p-2 rounded-full cursor-pointer hover:bg-foreground/50 transition backdrop-blur-sm"
                    aria-label="Next slide"
                >
                    <ChevronRightIcon className="w-4 md:w-6 h-4 md:h-6" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {carouselItems.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentCarouselIndex(idx)}
                            className={`w-2 h-2 rounded-full ${idx === currentCarouselIndex ? 'bg-white' : 'bg-white/50'} transition-colors duration-300`}
                            aria-label={`Go to slide ${idx + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}