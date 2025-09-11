"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/events', label: 'Events' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-stone/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Logo + site name */}
        <Link href="/" className="flex items-center gap-3 font-head text-xl text-forest">
          <Image
            src="/images/logo.png"
            alt="Yuba Watershed Institute logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span>Yuba Watershed Institute</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm font-medium text-stone hover:text-forest ${pathname === n.href ? 'active' : ''}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/membership" className="btn-primary text-sm">Become a Member</Link>
      </div>
    </header>
  )
}
