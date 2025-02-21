import { fetchGraphQL } from "@/api/fetchers";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { GET_POKEMONS, GET_POKEMON_TYPES } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";
import { ResultsPreference } from "@/constants";
import { useMemo } from "react";

const LIMIT = 10;

export const useBrowsePokemons = (search: String, type: String[] | null, resultsPreference: ResultsPreference) => {
  const { data: typesData, isLoading: isTypesLoading } = useQuery<GQLQuery>({
    queryKey: ["pokemonTypes"],
    queryFn: () => fetchGraphQL(GET_POKEMON_TYPES),
  });

  const filters = useMemo(() => {
    return {
      ...(type && type.length ? { type } : {}),
      ...(resultsPreference === ResultsPreference.Favorites ? { isFavorite: true } : {}),
    }
  }, [type, resultsPreference]);
  
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<GQLQuery, Error, InfiniteData<GQLQuery>>({
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
          filter: filters,
        }),
    });

    return {
      data,
      error,
      isLoading: isTypesLoading || isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
      types: typesData?.pokemonTypes,
    }
};
