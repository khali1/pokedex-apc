"use client";
import styles from "./page.module.scss";
import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";
import { GET_POKEMON_TYPES, GET_POKEMONS } from "@/api/queries";
import { fetchGraphQL } from "@/api/fetchers";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import Select from "react-select";

const LIMIT = 10;

export default function BrowsePage() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [type, setType] = useQueryState<string[]>(
    "type",
    parseAsArrayOf(parseAsString)
  );
  const { data: typesData } = useQuery<GQLQuery>({
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
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          isClearable
          isMulti
          value={
            type?.map((type) => ({
              label: type,
              value: type,
            })) || []
          }
          options={
            typesData?.pokemonTypes.map((type) => ({
              label: type,
              value: type,
            })) || []
          }
          onChange={(e) => {
            setType(e?.map((value) => value.value) || null);
          }}
        />
      </div>
      {data?.pages
        .flatMap((page) => page.pokemons.edges)
        .map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      <button
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={() => {
          fetchNextPage();
        }}
      >
        Load more
      </button>
    </div>
  );
}
