import { GQLPokemon } from "../../../graphqlTypes";
import { PokemonCard } from "../PokemonCard/PokemonCard";

const PokemonGrid = ({ values }: { values: Partial<GQLPokemon>[] }) => {
  return (
    <div>
      {values.map((value) => (
        <PokemonCard key={value.id} pokemon={value} />
      ))}
    </div>
  );
};

export default PokemonGrid;
