import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { GQLPokemon } from "../../../graphqlTypes";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
interface PokemonCardProps {
  pokemon: Partial<GQLPokemon>;
  favoritePokemon: ({ id }: { id: string }) => void;
  unfavoritePokemon: ({ id }: { id: string }) => void;
}

export const PokemonCard = ({
  pokemon,
  favoritePokemon,
  unfavoritePokemon,
}: PokemonCardProps) => {
  const onClick = pokemon.isFavorite ? unfavoritePokemon : favoritePokemon;

  return (
    <Link href={`/${pokemon.name}`} className={styles.card}>
      <h2>{pokemon.name}</h2>
      <button
        onClick={(e) => {
          e.preventDefault();
          pokemon.id && onClick({ id: pokemon.id });
        }}
      >
        {pokemon.isFavorite ? <IconHeartFilled /> : <IconHeart />}
      </button>
    </Link>
  );
};
