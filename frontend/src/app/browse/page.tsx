'use client';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import { GQLQuery } from '../../../graphqlTypes';
import { GET_POKEMONS } from '@/api/queries';
import { fetchGraphQL } from '@/api/fetchers';
import { PokemonCard } from '@/components/PokemonCard/PokemonCard';

export default function BrowsePage() {
  const { data, error, isLoading } = useQuery<GQLQuery>({
    queryKey: ['pokemons'],
    queryFn: () => fetchGraphQL(GET_POKEMONS),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
        {data?.pokemons.edges.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
    </div>
  );
} 