import { gql } from 'graphql-tag';
export const GET_POKEMONS = gql`
  query GetPokemons($search: String = null) {
    pokemons(query: { limit: 10, offset: 0, search: $search }) {
      edges {
        name
        types
      }
    }
  }
`;