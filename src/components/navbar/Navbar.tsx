"use client";
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavLink from '@/components/navbar/NavLink';
import useDarkMode from '@/hooks/useDarkMode';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isDarkMode = useDarkMode();
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

    const navLinks = [
        {name: "INICIO", href: "/"},
        {name: "CONOCENOS", href: "/about"},
        {name: "TIENDA", href: "/products"},
        {name: "ADMIN", href: "/admin"},
        {name: "REDES", href: "/contact"},
        {name: "CUENTA", href:'#', children:
            [
                {name: "LISTA DE DESEOS", href: '/wishlist'},
                {name: "MI CUENTA", href: '/profile'},
                {name: "CARRITO", href: '/cart'}
            ]
        }
    ]


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
        <div>
            <div className="flex justify-between items-center px-4 py-2 md:py-0">
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
                <Link href="/" className="relative h-10 w-32 md:w-30 lg:w-40 block md:mr-0 mx-auto md:mx-0 flex justify-center items-center">
                    <p className="text-center font-bold text-3xl md:hidden pt-1">CRAFTZ</p>
                    <Image 
                        src= {isDarkMode ? '/logo_horizontal_white.png' : '/logo_horizontal.png'}
                        fill={true}
                        alt="Craftz"
                        style={{ objectFit: 'contain' }}
                        className="hidden md:block"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:text-[11px] lg:text-[15px] lg:space-x-4 xl:text-[18px] xl:space-x-8">
                    {navLinks.map((link) => {
                        const hasDropdown = link.children && link.children.length > 0;
                        const isPrimaryActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
                        const isChildActive = hasDropdown && link.children.some(child =>
                            pathname === child.href || (pathname.startsWith(child.href) && child.href !== '/')
                        );
                        const isActive = isPrimaryActive || isChildActive;
                        return (
                            <NavLink 
                                href={link.href}
                                key={link.name}
                                className= {isActive ? 'font-bold bg-background2' : ''}
                                hasDropdown={hasDropdown}
                                dropdownItems={link.children}
                            >
                                {link.name}
                            </NavLink>
                        )
                    })}
                </nav>

                {/* Icons */}
                <div className="flex items-center md:space-x-2 lg:space-x-4">
                    <button className="p-2 cursor-pointer rounded-lg hover:bg-background2 transition-colors duration-200">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 relative cursor-pointer rounded-lg hover:bg-background2 transition-colors duration-200">
                        <ShoppingCartIcon className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-primary text-onPrimary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            0
                        </span>
                    </button>
                    <Link href="/login" className="p-2 rounded-lg hover:bg-background2 transition-colors duration-200">
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
                            className="flex flex-col pb-1"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            exit={{ y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || 
                                    (pathname.startsWith(link.href) && link.href !== '/');
                                const hasDropdown = link.children != undefined;
                                return (
                                    <NavLink
                                        isMobile={true}
                                        href={link.href}
                                        key={link.name}
                                        className= {isActive ? 'font-bold bg-background2 pl-10' : ''}
                                        hasDropdown={hasDropdown}
                                        dropdownItems={link.children}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </NavLink>
                                )
                            })}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </header>
    </>
  )
}