import { fetchGraphQL } from "@/api/fetchers";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { GET_POKEMONS, GET_POKEMON_TYPES } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";

const LIMIT = 10;

export const useBrowsePokemons = (search: String, type: String[] | null) => {
  const { data: typesData, isLoading: isTypesLoading } = useQuery<GQLQuery>({
    queryKey: ["pokemonTypes"],
    queryFn: () => fetchGraphQL(GET_POKEMON_TYPES),
  });

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<GQLQuery, Error, InfiniteData<GQLQuery>>({
      queryKey: ["pokemons", search, type],
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) =>
        Math.ceil(lastPage.pokemons.count / LIMIT) > pages.length
          ? pages.length
          : undefined,
      queryFn: (context) =>
        fetchGraphQL(GET_POKEMONS, {
          limit: LIMIT,
          offset: (context.pageParam as number) * 10,
          search,
          filter: type && type.length ? { type } : undefined,
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
