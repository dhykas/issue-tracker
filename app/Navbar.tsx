'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillBug } from "react-icons/ai"

export const Navbar = () => {
    const currentPath = usePathname();
    // console.log(currentPath)

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ] 
    return(
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><AiFillBug /></Link>
            <ul className="flex space-x-6">
                {links.map(link =>
                    <Link 
                    className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                    key={link.href} href={link.href}>{link.label}</Link>                    
                    )}
            </ul>
        </nav>
    )
}