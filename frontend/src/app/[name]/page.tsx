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
import { SoundPlayer } from "./SoundPlayer/SoundPlayer";

export default function PokemonDetail() {
  const { name } = useParams();
  const { data, isLoading } = useQuery<GQLQuery>({
    queryKey: ["pokemonByName", name],
    queryFn: () => fetchGraphQL(GET_POKEMON_BY_NAME, { name }),
  });
  const { favorite, unfavorite } = useFavoritePokemon();
  const pokemon = data?.pokemonByName;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={pokemon?.image} alt={pokemon?.name} />
        <SoundPlayer sound={pokemon?.sound} />
      </div>
      <div className={styles.evolutions}>
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
