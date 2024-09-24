"use client"
import { usePathname } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

export default function SpecificOlympics(){

    const [allGolds, setAllGolds] = useState(null)

    const pathname = usePathname()
    const pathnameArray = pathname.split("/")
    const olympicsToSearch = pathnameArray[pathnameArray.length - 1]
    const formattedOlympics = olympicsToSearch.replace(/(\d{4})-(\w+)/, (match, year, season) => {
        return `${year} ${season.charAt(0).toUpperCase()}${season.slice(1)}`;
        });
    

    async function grabSpecificOlympics() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        console.log(olympicsToSearch)
        const response = await fetch('http://127.0.0.1:5000/api/specific-olympics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "olympics": formattedOlympics
            })
        });
        const data = await response.json()
        setAllGolds(data['all_golds'])
    }

    useEffect(() => {
        grabSpecificOlympics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const goldMedallistElements = allGolds && Object.keys(allGolds).map((athleteName, key) => {
        const age = allGolds[athleteName]['Age']
        const sport = allGolds[athleteName]['Sport']
        const event = allGolds[athleteName]['Event']
        const medal = allGolds[athleteName]['Medal']
        const team = allGolds[athleteName]['Team']
        return (
            <div key={key} className="flex flex-col items-center justify-center p-4 border border-zinc-300 m-2 text-center rounded-md">
                <h3 className="text-lg">{athleteName}</h3>
                <p>{age} years old</p>
                <p>{team}</p>
                <p>{sport}</p>
                <p>{event}</p>
                <p>{medal}</p>
            </div>
        )
    })

    return (
        <Suspense>
            <div className="flex flex-col items-center justify-center p-16 w-screen min-h-screen">
            {goldMedallistElements && <h1 className="text-3xl font-bold mb-4">{formattedOlympics}</h1> }
            {allGolds && goldMedallistElements}
            </div>
        </Suspense>
    )
}