"use client";
import styles from "./page.module.scss";
import { SegmentedControl } from "@mantine/core";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useBrowsePokemons } from "./hooks";
import TypeFilter from "./components/TypeFilter/TypeFilter";
import PokemonList from "@/components/PokemonList/PokemonList";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import { useLocalStorage } from "@mantine/hooks";
import { LayoutPreference, ResultsPreference } from "@/constants";
import { useState } from "react";

export default function BrowsePage() {
  const [resultsPreference, setResultsPreference] = useState<ResultsPreference>(
    ResultsPreference.All
  );
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [type, setType] = useQueryState<string[] | null>("type", {
    clearOnDefault: true,
    defaultValue: null,
    parse: parseAsArrayOf(parseAsString).parse,
  });
  const [layout, setLayout] = useLocalStorage<LayoutPreference>({
    key: "layout-preference",
    defaultValue: LayoutPreference.Grid,
  });

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    types,
  } = useBrowsePokemons(search, type, resultsPreference);

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div>
        <SegmentedControl
          value={resultsPreference}
          onChange={(value) => setResultsPreference(value as ResultsPreference)}
          data={[
            { label: "Favorites", value: ResultsPreference.Favorites },
            { label: "All", value: ResultsPreference.All },
          ]}
        />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TypeFilter
          value={type || []}
          options={types || []}
          onChange={setType}
        />
        <SegmentedControl
          value={layout}
          onChange={(value) => setLayout(value as LayoutPreference)}
          data={[
            { label: <IconLayoutGrid />, value: LayoutPreference.Grid },
            { label: <IconLayoutList />, value: LayoutPreference.List },
          ]}
        />
      </div>
      {data?.pages && (
        <PokemonList
          layout={layout}
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
