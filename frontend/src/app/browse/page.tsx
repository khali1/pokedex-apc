"use client";
import styles from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";
import { GET_POKEMON_TYPES, GET_POKEMONS } from "@/api/queries";
import { fetchGraphQL } from "@/api/fetchers";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import { useState } from "react";
import Select from "react-select";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string | null>(null);

  const { data: typesData } = useQuery<GQLQuery>({
    queryKey: ["pokemonTypes"],
    queryFn: () => fetchGraphQL(GET_POKEMON_TYPES),
  });

  const { data, error, isLoading } = useQuery<GQLQuery>({
    queryKey: ["pokemons", search, type],
    queryFn: () =>
      fetchGraphQL(GET_POKEMONS, {
        search,
        filter: { type },
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
          options={
            typesData?.pokemonTypes.map((type) => ({
              label: type,
              value: type.toLowerCase(),
            })) || []
          }
          onChange={(e) => setType(e?.value || null)}
        />
      </div>
      {data?.pokemons.edges.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
