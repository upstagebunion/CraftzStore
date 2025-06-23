"use client";
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavLink from '@/components/NavLink';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => { //Used to avoid scroll when menu open, remove if deprecate
        if (mobileMenuOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
        
        return () => {
            document.body.classList.remove('menu-open')
        }
        }, [mobileMenuOpen]
    )
    return (
    <>
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black z-0 md:hidden"
                />
            )}
        </AnimatePresence>
    <header className="shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                {/* Mobile menu button */}
                <button 
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                    ) : (
                    <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
                {/* Logo */}
                <Link href="/" className="relative h-10 w-32 md:w-48 block md:mr-0 mx-auto md:mx-0">
                    <Image 
                        src='/logo_solo.png'
                        fill={true}
                        alt="Craftz"
                        style={{ objectFit: 'contain' }}
                        className="md:hidden"
                    />
                    <Image 
                        src='/logo_horizontal.png'
                        fill={true}
                        alt="Craftz"
                        style={{ objectFit: 'contain' }}
                        className="hidden md:block"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <NavLink href="/">Inicio</NavLink>
                    <NavLink href="/productos">productos</NavLink>
                    <NavLink href="/about">about</NavLink>
                    <NavLink href="/contact">contact</NavLink>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:text-blue-600">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:text-blue-600 relative">
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        0
                    </span>
                    </button>
                    <Link href="/login" className="p-2 hover:text-blue-600">
                    <UserIcon className="h-5 w-5" />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                            opacity: 1,
                            height: 'auto',
                            transition: { 
                            opacity: { duration: 0.2 },
                            height: { duration: 0.3 }
                            }
                        }}
                        exit={{ 
                            opacity: 0,
                            height: 0,
                            transition: { 
                            opacity: { duration: 0.1 },
                            height: { duration: 0.2 }
                            }
                        }}
                        className="md:hidden overflow-hidden"
                    >
                        <motion.nav 
                            className="flex flex-col space-y-3 pb-4"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            exit={{ y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <NavLink 
                                href="/" 
                                className="px-2 py-1"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Inicio
                            </NavLink>
                            <NavLink 
                                href="/products" 
                                className="px-2 py-1"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Productos
                            </NavLink>
                            <NavLink 
                                href="/about" 
                                className="px-2 py-1"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Nosotros
                            </NavLink>
                            <NavLink 
                                href="/contact" 
                                className="px-2 py-1"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contacto
                            </NavLink>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </header>
    </>
  )
}