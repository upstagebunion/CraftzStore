'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBagIcon, TruckIcon, GiftIcon, ChevronLeftIcon, ChevronRightIcon, CloudIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function Carousel(){
    const carouselItems = [
        {
            id: 'item-1',
            icon: <TruckIcon className="w-8 h-8 mx-auto" />, //icono de camion
            title: "Envío Gratuito",
            text: "En compras mayores a $699.00 MXN.",
            button: {
                text: 'Conocer más',
                url: '/detalles-de-envio'
            }
        },
        {
            id: 'item-2',
            icon: <ShoppingBagIcon className="w-8 h-8 mx-auto" />, 
            title: "Entrega Rápida y Eficiente",
            text: "Disfruta de un servicio ágil sin sacrificar la calidad. Descubre nuestros tiempos de procesamiento y envío detallados.",
            button: {
                text: "Conoce más",
                url: '/tiempos-de-procesamiento-y-envio'
            }
        },
        {
            id: 'item-3',
            icon: <GiftIcon className="w-8 h-8 mx-auto" />, //Icono de palomita xd
            title: "Calidad Premium Garantizada",
            text: "Más de 100 ventas en Mercado Libre con reputación Intacta.",
            button: {
                text: "Comprobar en mercado libre",
                url: "https://listado.mercadolibre.com.mx/_CustId_1783022037?item_id=MLM2093753497&category_id=MLM113782&seller_id=1783022037&client=recoview-selleritems&recos_listing=true#origin=vip&component=sellerData&typeSeller=classic"
            }
        },
        {
            id: 'item-4',
            icon: <CreditCardIcon className="w-8 h-8 mx-auto" />, //icono de tarjeta
            title: "Hasta 3 MSI",
            text: "Pago a 3 meses sin intereses en compras mayores a $999 MXN.",
            button: {
                text: "Conoce más",
                url: "/pagos-y-meses"
            }
        },
        {
            id: 'item-5',
            icon: <CloudIcon className="w-8 h-8 mx-auto" />, //icono de nube
            title: "Personalización Única",
            text: "Sin límites, tu imaginas, nosotros creamos.",
            button: null
        }
    ];

    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
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

    // Auto-rotate carousel
    useEffect(() => {
        resetAutoSlide();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [carouselItems.length]);

    const variants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }, // Animate exiting items upwards
    };

    const activeItem = carouselItems[currentCarouselIndex];

    return (
    <section className="bg-radial from-background to-background2 py-2">
        <div className="container mx-auto px-4 relative">
          <div className="relative h-45 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeItem.id}
                        className="absolute inset-0 flex flex-col items-center justify-center px-7 "
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        {activeItem.icon}
                        <h4 className="mt-1">{activeItem.title}</h4>
                        <p className="text-sm text-center">{activeItem.text}</p>
                        {activeItem.button && (
                            activeItem.button.url.startsWith('/') ? (
                                <Link href={activeItem.button.url} className="py-1 md:py-2 px-4 mt-3 rounded-lg bg-primary hover:bg-primary2 text-sm front-medium text-white">
                                    <motion.p   
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {activeItem.button.text}
                                    </motion.p>
                                </Link>
                            ) : (
                                <motion.a 
                                    href={activeItem.button.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="py-2 md:py-3 px-4 mt-2 rounded-lg bg-primary hover:bg-primary2 text-sm font-medium text-white"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {activeItem.button.text}
                                </motion.a>
                            )
                        )}
                    </motion.div>
                </AnimatePresence>
          </div>
           {/* Navigation Arrows */}
            <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/70 text-white p-2 rounded-full cursor-pointer hover:bg-primary transition"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-4 md:w-6 h-4 md:h-6" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/70 text-white p-2 rounded-full cursor-pointer hover:bg-primary transition"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-4 md:w-6 h-4 md:h-6" />
            </button>
            {/* Pagination Dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentCarouselIndex(idx)}
                        className={`w-2 h-2 rounded-full ${idx === currentCarouselIndex ? 'bg-primary' : 'bg-gray-400'} transition-colors duration-300`}
                        aria-label={`Go to slide ${idx + 1}`}
                    ></button>
                ))}
            </div>
        </div>
      </section>
    )
}