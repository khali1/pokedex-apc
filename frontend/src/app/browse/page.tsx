'use client';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import { GQLQuery } from '../../../graphqlTypes';
import { GET_POKEMONS } from '@/api/queries';
import { fetchGraphQL } from '@/api/fetchers';
import { PokemonCard } from '@/components/PokemonCard/PokemonCard';
import { useState } from 'react';

export default function BrowsePage() {
  const [search, setSearch] = useState('');
  const { data, error, isLoading } = useQuery<GQLQuery>({
    queryKey: ['pokemons', search],
    queryFn: () => fetchGraphQL(GET_POKEMONS, { search }),
  });

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
        <div><input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/></div>
        {data?.pokemons.edges.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
    </div>
  );
} 