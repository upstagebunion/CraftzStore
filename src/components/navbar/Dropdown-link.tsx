'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLinkProps } from '@/types/navigation'
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownLinkProps extends NavLinkProps {
  dropdownItems: Array<{name: string, href: string}>;
}

export default function DropdownLink({
  isMobile = false,
  href,
  children,
  className = '',
  onClick = () => {},
  dropdownItems = []
}: DropdownLinkProps) {
const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
        className={`relative ${isMobile ? 'w-full' : 'group'} ${className}`} 
        onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <Link
        href={href}
        className='flex items-center'
        onClick={(e) => {
          if (isMobile) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
          onClick(e);
        }}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
      >
        <span>{children}</span>
        <motion.span
          className={`${ isMobile ? 'ml-2 text-[10px]' : 'ml-1 ' }`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </Link>
      
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            className={`
              ${isMobile ? 'w-full' : 'absolute left-0 mt-0 w-48'} 
              bg-background shadow-lg rounded-md z-10 overflow-hidden
            `}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0 
            } }
            exit={ { height: 0, opacity: 0 } }
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="py-1">
                {dropdownItems.map((item) => {
                    const isPrimaryActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
                    return (
                        <Link
                        key={item.name}
                        href={item.href}
                        className= {isPrimaryActive 
                            ? "block pr-4 py-2 pl-10 text-normal text-foreground bg-background2"
                            : "block pr-4 py-2 pl-10 font-normal text-foreground hover:bg-background2"}
                        onClick={(e) => {
                            setIsOpen(false);
                            onClick(e);
                        }}
                        >
                        {item.name}
                        </Link>
                    )
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}