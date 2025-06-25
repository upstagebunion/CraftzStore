import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'

interface NavLinkProps {
  isMobile?: Boolean
  href: string
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler
}

export default function NavLink({isMobile = false, href, children, className = '', onClick = ()=>{}}: NavLinkProps) {
  const baseClass = isMobile
    ? "px-8 py-2"
    : "py-4 px-4 rounded-lg hover:bg-background2 transition-colors duration-200";
  return (
    <Link
      href={href}
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}