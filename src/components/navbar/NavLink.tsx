import Link from 'next/link'
import { NavLinkProps } from '@/types/navigation';
import DropdownLink from './Dropdown-link';

export default function NavLink({
    isMobile = false,
    href,
    children,
    className = '',
    onClick = ()=>{},
    hasDropdown = false,
    dropdownItems = []
  }: NavLinkProps) {

  const baseClass = isMobile
    ? "px-8 py-2"
    : "py-4 px-4 rounded-lg hover:bg-background2 transition-colors duration-200";
  return (
    hasDropdown 
    ? <DropdownLink 
        href={href}
        isMobile={isMobile}
        className={`${baseClass} ${className}`}
        dropdownItems={dropdownItems}
      >
        {children}
      </DropdownLink>
    : <Link
        href={href}
        className={`${baseClass} ${className}`}
        onClick={onClick}
      >
        {children}
    </Link>
  )
}