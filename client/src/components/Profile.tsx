type ProfileProps = {
    name: string,
    summary: string
}

export default function Profile({name, summary}: ProfileProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h1 className="text-2xl text-center font-semibold mb-4">{name}</h1>
            <p className="text-lg text-center w-4/5 md:w-2/5">{summary}</p>
        </div>
    )
}