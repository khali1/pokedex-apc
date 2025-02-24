"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GQLQuery } from "../../../graphqlTypes";
import { fetchGraphQL } from "@/api/fetchers";
import { GET_POKEMON_BY_NAME } from "@/api/queries";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import { useFavoritePokemon } from "@/hooks/useFavoritePokemon";
import { SoundPlayer } from "./SoundPlayer/SoundPlayer";
import { motion } from "framer-motion";

export default function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const queryClient = useQueryClient();

  // Get the pokemon from the list cache
  const cachedData = queryClient
    .getQueryData<GQLQuery>(["pokemons"])
    ?.pokemons.edges.find((p) => p.name === name);

  const { data } = useQuery<GQLQuery>({
    queryKey: ["pokemonByName", name],
    queryFn: () => fetchGraphQL(GET_POKEMON_BY_NAME, { name }),
  });
  const { favorite, unfavorite } = useFavoritePokemon();
  const pokemon = data?.pokemonByName;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <motion.img
            layoutId={`pokemon-${name}`}
            // Use cached image first, then fall back to detail data
            src={cachedData?.image || pokemon?.image}
            alt={name}
          />
        </div>
        <SoundPlayer sound={pokemon?.sound} />
      </div>
      <div className={styles.evolutions}>
        {pokemon?.evolutions.map((evolution) => (
          <PokemonCard
            secondary
            key={evolution.id}
            pokemon={evolution}
            unfavoritePokemon={unfavorite.mutate}
            favoritePokemon={favorite.mutate}
          />
        ))}
      </div>
      <Link href="/browse" className={styles.backLink}>
        ← Back to list
      </Link>
    </div>
  );
}
