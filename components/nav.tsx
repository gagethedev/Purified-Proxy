'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Search', href: '/p' },
  { name: 'Games', href: '/g' },
  { name: 'Apps', href: '/a' },
  { name: 'Chat', href: '/chat' }
]

export default function Navbar() {
  return (
    <nav className="bg-transparent shadow text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              Purified
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-blue-500"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="pt-5 pb-6">
                  <div className="px-2 space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-500 hover:bg-muted"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}