import { fetchGraphQL } from "@/api/fetchers";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { GET_POKEMONS } from "@/api/queries";
import { GQLPokemonFilterInput, GQLQuery } from "../../graphqlTypes";
import { ResultsPreference } from "@/constants";

const LIMIT = 10;

export const useListPokemons = (filter: GQLPokemonFilterInput, search: string, type: string[] | null, resultsPreference: ResultsPreference) => {
    return useInfiniteQuery<GQLQuery, Error, InfiniteData<GQLQuery>>({
      placeholderData: lastData => lastData,
      queryKey: ["pokemons", search, type, resultsPreference],
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) =>
        Math.ceil(lastPage.pokemons.count / LIMIT) > pages.length
          ? pages.length
          : undefined,
      queryFn: (context) =>
        fetchGraphQL(GET_POKEMONS, {
          limit: LIMIT,
          offset: (context.pageParam as number) * LIMIT,
          search,
          filter,
        })
    });
};