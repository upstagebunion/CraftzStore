import { MouseEventHandler, ReactNode } from 'react'

export interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavItem[];
}

export interface NavLinkProps {
  isMobile?: boolean
  href: string
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler
  hasDropdown? : boolean
  dropdownItems?: Array<{name: string, href: string}>
}