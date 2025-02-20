"use client";
import styles from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";
import { GET_POKEMON_TYPES } from "@/api/queries";
import { fetchGraphQL } from "@/api/fetchers";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useBrowseQuery } from "./hooks";
import TypeFilter from "./components/TypeFilter/TypeFilter";
import PokemonGrid from "@/components/PokemonGrid/PokemonGrid";

const LIMIT = 10;

export default function BrowsePage() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [type, setType] = useQueryState<string[] | null>("type", {
    clearOnDefault: true,
    defaultValue: null,
    parse: parseAsArrayOf(parseAsString).parse,
  });
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
  } = useBrowseQuery(search, type);
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
        <TypeFilter
          value={type || []}
          options={typesData?.pokemonTypes || []}
          onChange={setType}
        />
      </div>
      {data?.pages && (
        <PokemonGrid
          values={data?.pages.flatMap((page) => page.pokemons.edges)}
        />
      )}
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
