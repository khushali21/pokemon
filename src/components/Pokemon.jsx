import { useState } from "react";
import { useEffect } from "react";
import PokemonCards from "./PokemonCards";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const detailedPokemonData = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon?.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <button type="button" class="bg-indigo-500" disabled>
          <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
        </button>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center">
      <section>
        <header>
          <h1 className="text-teal-500 mt-10">Lets catch Pokemon</h1>
        </header>
        <div class="w-full max-w-sm min-w-[200px]">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mt-10"
            placeholder="search Pokemon"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 mt-10">
          {searchData.map((curPokemon) => {
            return (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            );
          })}
        </div>
      </section>
    </div>
  );
}
