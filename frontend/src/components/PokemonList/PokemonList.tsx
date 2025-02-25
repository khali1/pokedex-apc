import { LayoutPreference } from "@/constants";
import { GQLPokemon } from "../../../graphqlTypes";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import styles from "./PokemonList.module.scss";

const PokemonList = ({
  values,
  layout,
}: {
  values: Partial<GQLPokemon>[];
  layout: LayoutPreference;
}) => {
  return (
    <div className={`${styles.container} ${layout}`}>
      {values.map((value) => (
        <PokemonCard key={value.id} pokemon={value} />
      ))}
    </div>
  );
};

export default PokemonList;
