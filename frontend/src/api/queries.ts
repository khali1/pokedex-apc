import { gql } from 'graphql-tag';
export const GET_POKEMONS = gql`
  query GetPokemons($search: String = null, $filter: PokemonFilterInput = null) {
    pokemons(query: { limit: 10, offset: 0, search: $search, filter: $filter }) {
      edges {
        name
        types
      }
    }
  }
`;

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemonTypes
  }
`;
