import styles from "./PokemonCard.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GQLPokemon } from "../../../graphqlTypes";
import {
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useCallback, useState } from "react";
import TypeTag from "../TypeTag/TypeTag";
import Modal from "../Modal/Modal";

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

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Link href={`/${pokemon.name}`}>
          <h2>{pokemon.name}</h2>
        </Link>
        <div>
          <button className={styles.favoriteButton} onClick={onClick}>
            {pokemon.isFavorite ? <IconHeartFilled /> : <IconHeart />}
          </button>
          {!secondary && (
            <button
              className={styles.infoButton}
              onClick={(e) => {
                e.stopPropagation();
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
        <Modal onClose={() => setIsInfoModalOpen(false)}>
          <div>Info</div>
        </Modal>
      )}
    </div>
  );
};
