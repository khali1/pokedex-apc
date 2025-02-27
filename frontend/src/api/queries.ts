import { gql } from "graphql-tag";
export const GET_POKEMONS = gql`
  query GetPokemons(
    $limit: Int
    $offset: Int
    $search: String = null
    $filter: PokemonFilterInput = null
  ) {
    pokemons(
      query: {
        limit: $limit
        offset: $offset
        search: $search
        filter: $filter
      }
    ) {
      edges {
        id
        name
        types
        isFavorite
        image
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
      name
      isFavorite
    }
  }
`;

export const UNFAVORITE_POKEMON = gql`
  mutation UnfavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      name
      isFavorite
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
        name
        isFavorite
        image
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
      image
      sound
      isFavorite
    }
  }
`;
