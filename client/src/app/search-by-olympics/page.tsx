import { ReactNode } from "react";
import Link from "next/link";

export default async function SearchOlympics() {

    const response = await fetch("http://127.0.0.1:5000/api/olympics-list")
    const data = await response.json()
    const olympicsList = data['olympics_list']

    const olympicsMenuElements: ReactNode = olympicsList.map((olympicsName: string) => {
        const path = olympicsName.toLowerCase().replace(/\s+/g, '-');

        return (
        <div className="flex flex-col items-center justify-center p-6" key={olympicsName}>
          <Link href={`/search-by-olympics/${path}`}>
            <h1 className="text-zinc-200 hover:text-amber-300">{olympicsName}</h1>
          </Link>
        </div>
      )});
    
    return (
        <div className="flex flex-col items-center justify-center p-8 w-screen min-h-screen">
            <h1 className="text-3xl font-bold mb-6">
                Search By Olympics
            </h1>
            <div className="grid grid-cols-3 gap-4">
                {olympicsMenuElements}
            </div>
        </div>
    )
}