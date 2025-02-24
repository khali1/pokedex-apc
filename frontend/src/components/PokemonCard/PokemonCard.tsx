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
      <div className={styles.header}>
        <h2>{pokemon.name}</h2>
        <button className={styles.favoriteButton} onClick={onClick}>
          {pokemon.isFavorite ? <IconHeartFilled /> : <IconHeart />}
        </button>
      </div>
      <div className={styles.imageWrapper}>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className={styles.typeTags}>
        {pokemon.types?.map((type) => (
          <TypeTag type={type} key={type} />
        ))}
      </div>
    </Link>
  );
};
