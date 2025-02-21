import { LayoutPreference } from "@/constants";
import { GQLPokemon } from "../../../graphqlTypes";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import cx from "classnames";
import styles from "./PokemonList.module.scss";
import { useFavoritePokemon } from "@/hooks/useFavoritePokemon";

const PokemonList = ({
  values,
  layout,
}: {
  values: Partial<GQLPokemon>[];
  layout: LayoutPreference;
}) => {
  const { favorite, unfavorite } = useFavoritePokemon();

  return (
    <div
      className={cx({
        [styles.grid]: layout === LayoutPreference.Grid,
      })}
    >
      {values.map((value) => (
        <PokemonCard
          key={value.id}
          pokemon={value}
          favoritePokemon={favorite.mutate}
          unfavoritePokemon={unfavorite.mutate}
        />
      ))}
    </div>
  );
};

export default PokemonList;
