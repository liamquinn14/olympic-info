import { FC } from "react"
import Link from "next/link"

const Navbar: FC = () => {
    return (
        <nav className="w-screen p-8 flex items-center justify-evenly">
            <Link href={'/'}>
                <h1 className="text-xl font-semibold">🥇🥈🥉 Olympic Info Hub</h1>
            </Link>
            <Link href={'/search-by-olympics'}>
                <h4 className="text-lg">Search by Olympics</h4>
            </Link>
            <Link href={'/search-by-athlete'}>
            <h4 className="text-lg">Search by Athlete</h4>
            </Link>
        </nav>
    )
} 

export default Navbar