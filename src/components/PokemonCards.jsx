export default function PokemonCards({ pokemonData }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg items-center justify-center m-10">
      <figure className="flex justify-center items-center">
        <img
          className="object-cover object-center h-16 w-16"
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
        />
      </figure>
      <h1 className="font-sans text-lg text-center uppercase font-bold">
        {pokemonData.name}
      </h1>
      <div className="flex w-fit p-4 rounded-full bg-gray-400 justify-center">
        <p className="font-sans text-sm">
          {pokemonData.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <p>
          <span className="text-sm font-semibold">Height:</span>{" "}
          {pokemonData.height}
        </p>
        <p>
          <span className="text-sm font-semibold">Weight:</span>{" "}
          {pokemonData.weight}
        </p>
        <p>
          <span className="text-sm font-semibold">speed:</span>{" "}
          {pokemonData.stats[5].base_stat}
        </p>
      </div>
      <div className="flex gap-4 justify-center mt-10">
        <div>
          <p>{pokemonData.base_experience}</p>
          <span className="text-sm font-semibold">Experience:</span>
        </div>
        <div>
          <p>{pokemonData.stats[1].base_stat}</p>
          <span className="text-sm font-semibold">Attack:</span>
        </div>
        <div>
          <p>
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
          <span className="text-sm font-semibold">Abilities:</span>
        </div>
      </div>
    </div>
  );
}
