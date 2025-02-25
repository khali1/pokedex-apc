import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GQLPokemon } from "../../../graphqlTypes";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import TypeTag from "../TypeTag/TypeTag";
import PokemonCardModal from "./PokemonCardModal";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface PokemonCardProps {
  pokemon: Partial<GQLPokemon>;
  secondary?: boolean;
}

export const PokemonCard = ({
  pokemon,
  secondary = false,
}: PokemonCardProps) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Link href={`/${pokemon.name}`}>
          <h2>{pokemon.name}</h2>
        </Link>
        <div className={styles.headerButtons}>
          {pokemon.id && (
            <FavoriteButton
              pokemonId={pokemon.id}
              isFavorite={pokemon.isFavorite ?? false}
            />
          )}
          {!secondary && (
            <button
              className={styles.infoButton}
              onClick={(e) => {
                setIsInfoModalOpen(!isInfoModalOpen);
              }}
            >
              <IconInfoCircle />
            </button>
          )}
        </div>
      </div>
      <Link href={`/${pokemon.name}`}>
        <div className={styles.imageWrapper}>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      </Link>
      <div className={styles.typeTags}>
        {pokemon.types?.map((type) => (
          <TypeTag type={type} key={type} />
        ))}
      </div>
      {isInfoModalOpen && (
        <PokemonCardModal
          name={pokemon.name}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
    </div>
  );
};
