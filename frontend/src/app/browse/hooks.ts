import { fetchGraphQL } from "@/api/fetchers";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";
import { GET_POKEMONS } from "@/api/queries";

const LIMIT = 10;

export const useBrowseQuery = (search: String, type: String[] | null) => {
  return useInfiniteQuery<GQLQuery, Error, InfiniteData<GQLQuery>>({
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
};
