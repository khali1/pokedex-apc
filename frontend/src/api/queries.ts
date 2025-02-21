import { gql } from 'graphql-tag';
export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int, $search: String = null, $filter: PokemonFilterInput = null) {
    pokemons(query: { limit: $limit, offset: $offset, search: $search, filter: $filter }) {
      edges {
        id
        name
        types
        isFavorite
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

export const FAVORITE_POKEMON = gql`
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;

export const UNFAVORITE_POKEMON = gql`
  mutation UnfavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`;

