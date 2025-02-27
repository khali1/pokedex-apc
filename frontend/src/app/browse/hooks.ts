import { GQLPokemonFilterInput } from "../../../graphqlTypes";
import { ResultsPreference } from "@/constants";
import { useMemo } from "react";
import { useListPokemons } from "@/hooks/useListPokemons";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDebouncedValue } from "@mantine/hooks";

export const useBrowsePokemons = (
  search: string,
  type: string[] | null,
  resultsPreference: ResultsPreference
) => {
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const filters = useMemo(() => {
    return {
      ...(type && type.length ? { type } : {}),
      ...(resultsPreference === ResultsPreference.Favorites
        ? { isFavorite: true }
        : {}),
    } as GQLPokemonFilterInput;
  }, [type, resultsPreference]);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useListPokemons(filters, debouncedSearch, type, resultsPreference);

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
  };
};
