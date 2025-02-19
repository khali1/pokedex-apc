'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-tag';
import { print } from 'graphql';
import { GQLQuery } from '../../graphqlTypes';

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons(query: { limit: 10, offset: 0 }) {
      edges {
        name
      }
    }
  }
`;

export default function Home() {
  const { data, error, isLoading } = useQuery<GQLQuery>({
    queryKey: ['pokemons'],
    queryFn: async () => {
      const res = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: print(GET_POKEMONS),
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await res.json();
      return data;
    },
  });
  console.log(error, data);
  return (
    <div className={styles.page}>
    </div>
  );
}
