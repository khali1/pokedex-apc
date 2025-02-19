import { gql } from 'graphql-tag';

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons(query: { limit: 10, offset: 0 }) {
      edges {
        name
      }
    }
  }
`;