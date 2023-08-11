"use client"
import Link from 'next/link'
import { useSearchParams } from "next/navigation"

const Navbar = () => {
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get("todos")
    return (
        <nav className='flex gap-5 text-2xl'>
            <Link href="/" className={todosFilter === null ? "active" : ""}>All</Link>
            <Link href="/?todos=active" className={todosFilter === "active" ? "active" : ""}>active</Link>
            <Link href="/?todos=completed" className={todosFilter === "completed" ? "active" : ""}>completed</Link>
        </nav>
    )
}

export default Navbar;