import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function NavLink({ href, children, className = '' }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`hover:text-[#C31349] transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  )
}