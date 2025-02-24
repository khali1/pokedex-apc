import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GQLPokemon } from "../../../graphqlTypes";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

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
  const onClick = pokemon.isFavorite ? unfavoritePokemon : favoritePokemon;

  return (
    <Link href={`/${pokemon.name}`} className={styles.card}>
      <h2>{pokemon.name}</h2>
      <div className={styles.imageWrapper}>
        <motion.img
          layoutId={secondary ? undefined : `pokemon-${pokemon.name}`}
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>
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
