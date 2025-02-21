"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";
import { fetchGraphQL } from "@/api/fetchers";
import { GET_POKEMON_BY_NAME } from "@/api/queries";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import { useFavoritePokemon } from "@/hooks/useFavoritePokemon";

export default function PokemonDetail() {
  const { name } = useParams();
  const { data, isLoading } = useQuery<GQLQuery>({
    queryKey: ["pokemonByName"],
    queryFn: () => fetchGraphQL(GET_POKEMON_BY_NAME, { name }),
  });
  const { favorite, unfavorite } = useFavoritePokemon();
  const pokemon = data?.pokemonByName;
  return (
    <div className={styles.container} style={{ background: "black" }}>
      <img src={pokemon?.image} alt={pokemon?.name} />
      <div className={styles.evolutions} style={{ background: "white" }}>
        {pokemon?.evolutions.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              unfavoritePokemon={unfavorite.mutate}
              favoritePokemon={favorite.mutate}
            />
          );
        })}
      </div>
      <Link href="/browse" className={styles.backLink}>
        ← Back to list
      </Link>
    </div>
  );
}
