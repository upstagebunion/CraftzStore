import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler
}

export default function NavLink({ href, children, className = '', onClick = ()=>{}}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`hover:text-[#C31349] transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}