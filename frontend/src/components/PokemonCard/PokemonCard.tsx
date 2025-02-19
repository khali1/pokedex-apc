import styles from './PokemonCard.module.scss';
import Link from 'next/link';
import { GQLPokemon } from '../../../graphqlTypes';

interface PokemonCardProps {
  pokemon: GQLPokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link href={`/${pokemon.name}`} className={styles.card}>
      <h2>{pokemon.name}</h2>
    </Link>
  );
}; 