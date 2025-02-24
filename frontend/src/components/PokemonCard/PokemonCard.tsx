import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GQLPokemon } from "../../../graphqlTypes";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useCallback } from "react";
import TypeTag from "../TypeTag/TypeTag";

interface PokemonCardProps {
  pokemon: Partial<GQLPokemon>;
  favoritePokemon: ({ id }: { id: string }) => void;
  unfavoritePokemon: ({ id }: { id: string }) => void;
  secondary?: boolean;
}

export const PokemonCard = ({
  pokemon,
  favoritePokemon,
  unfavoritePokemon,
  secondary = false,
}: PokemonCardProps) => {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const favFn = pokemon.isFavorite ? unfavoritePokemon : favoritePokemon;
      pokemon.id && favFn({ id: pokemon.id });
    },
    [pokemon.id, pokemon.isFavorite, favoritePokemon, unfavoritePokemon]
  );

  return (
    <Link href={`/${pokemon.name}`} className={styles.card}>
      <h2>{pokemon.name}</h2>
      <div className={styles.imageWrapper}>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      {pokemon.types?.map((type) => (
        <TypeTag type={type} key={type} />
      ))}
      <button className={styles.favoriteButton} onClick={onClick}>
        {pokemon.isFavorite ? <IconHeartFilled /> : <IconHeart />}
      </button>
    </Link>
  );
};
