"use client";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useBrowsePokemons } from "./hooks";
import TypeFilter from "./components/TypeFilter/TypeFilter";
import PokemonList from "@/components/PokemonList/PokemonList";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import { useLocalStorage } from "@mantine/hooks";
import { LayoutPreference, ResultsPreference } from "@/constants";
import { useEffect, useState } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import styles from "./page.module.scss";
import ContentSwitcher from "./components/ContentSwitcher/ContentSwitcher";

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

  // Fixes the infinite data fetching when changing the layout in the middle of the list
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [layout]);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    types,
  } = useBrowsePokemons(search, type, resultsPreference);

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <ContentSwitcher
          value={resultsPreference}
          onChange={(value) => setResultsPreference(value as ResultsPreference)}
          data={[
            { label: "Favorites", value: ResultsPreference.Favorites },
            { label: "All", value: ResultsPreference.All },
          ]}
        />
        <div className={styles.filters}>
          <input
            className={styles.search}
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
          <ContentSwitcher
            value={layout}
            onChange={(value) => setLayout(value as LayoutPreference)}
            data={[
              { label: <IconLayoutGrid />, value: LayoutPreference.Grid },
              { label: <IconLayoutList />, value: LayoutPreference.List },
            ]}
          />
        </div>
      </div>
      {data?.pages && (
        <PokemonList
          layout={layout}
          values={data.pages.flatMap((page) => page.pokemons.edges)}
        />
      )}
      <div ref={loadMoreRef} className={styles.loadMore}>
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
}
