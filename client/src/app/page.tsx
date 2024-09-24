import Profile from "@/components/Profile";

interface OlympianData {
  athlete_name: string;
  summary: string;
}

export default async function Home() {

  const response = await fetch("http://127.0.0.1:5000/api/random-olympian")
  const data: OlympianData = await response.json()
  const { athlete_name: random_name, summary: random_summary } = data;


  return (
    <div className="flex flex-col items-center justify-center w-screen h-full p-8">
      <h1 className="text-3xl font-bold text-center">
        Random Olympian
      </h1>
      <Profile name={random_name} summary={random_summary} />
    </div>
  );
}
