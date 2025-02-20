import { gql } from 'graphql-tag';
export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int, $search: String = null, $filter: PokemonFilterInput = null) {
    pokemons(query: { limit: $limit, offset: $offset, search: $search, filter: $filter }) {
      edges {
        id
        name
        types
      }
      count
    }
  }
`;

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemonTypes
  }
`;
