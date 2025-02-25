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
import TypeTag from "@/components/TypeTag/TypeTag";
import { IconArrowLeft } from "@tabler/icons-react";

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
      <Link href="/browse" className={styles.backLink}>
        <IconArrowLeft /> Browse
      </Link>
      <div className={styles.header}>
        <h2 className={styles.name}>{pokemon?.name}</h2>
        <div className={styles.icons}>
          <SoundPlayer sound={pokemon?.sound} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.stats}>
          <div className={styles.physical}>
            <div>
              <h3>Weight</h3>
              <p>
                {pokemon?.weight.minimum} - {pokemon?.weight.maximum}
              </p>
            </div>
            <div>
              <h3>Height</h3>
              <p>
                {pokemon?.height.minimum} - {pokemon?.height.maximum}
              </p>
            </div>
          </div>

          <div className={styles.battle}>
            <div>
              <h3>Max CP</h3>
              <p>{pokemon?.maxCP}</p>
            </div>
            <div>
              <h3>Max HP</h3>
              <p>{pokemon?.maxHP}</p>
            </div>
          </div>

          <div className={styles.types}>
            <h3>Types</h3>
            <div className={styles.tags}>
              {pokemon?.types.map((type) => (
                <TypeTag key={type} type={type} />
              ))}
            </div>
          </div>

          <div className={styles.attributes}>
            <div>
              <h3>Weaknesses</h3>
              <div className={styles.tags}>
                {pokemon?.weaknesses.map((type) => (
                  <TypeTag key={type} type={type} />
                ))}
              </div>
            </div>
            <div>
              <h3>Resistant</h3>
              <div className={styles.tags}>
                {pokemon?.resistant.map((type) => (
                  <TypeTag key={type} type={type} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.media}>
          <motion.img
            layoutId={`pokemon-${name}`}
            className={styles.image}
            src={cachedData?.image || pokemon?.image}
            alt={name}
          />
        </div>
      </div>
      {pokemon?.evolutions?.length ? (
        <div className={styles.evolutions}>
          <h2>Evolutions</h2>
          <div className={styles.evolutionsContent}>
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
        </div>
      ) : null}
    </div>
  );
}
