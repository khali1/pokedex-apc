"use client";

import { useQuery } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import { fetchGraphQL } from "@/api/fetchers";
import { GQLQuery } from "../../../graphqlTypes";
import { GET_POKEMON_BY_NAME } from "@/api/queries";
import styles from "./PokemonCardModal.module.scss";

const PokemonCardModal = ({
  onClose,
  name,
}: {
  onClose: () => void;
  name: string | undefined;
}) => {
  const { data } = useQuery<GQLQuery>({
    queryKey: ["pokemonByName", name],
    queryFn: () => fetchGraphQL(GET_POKEMON_BY_NAME, { name }),
  });

  const pokemon = data?.pokemonByName;

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2>Additional information</h2>
        <h3>{name}</h3>
        <div className={styles.pokemonInfo}>
          <div>
            <h4>Type</h4>
            <p>{pokemon?.types.join(", ") || "None"}</p>
          </div>
          <div>
            <h4>Max Height</h4>
            <p>{pokemon?.height.maximum}</p>
          </div>
          <div>
            <h4>Max Weight</h4>
            <p>{pokemon?.weight.maximum}</p>
          </div>
          <div>
            <h4>Max CP</h4>
            <p>{pokemon?.maxCP}</p>
          </div>
          <div>
            <h4>Max HP</h4>
            <p>{pokemon?.maxHP}</p>
          </div>
          <div>
            <h4>Resistance</h4>
            <p>{pokemon?.resistant.join(", ") || "None"}</p>
          </div>
          <div>
            <h4>Weaknesses</h4>
            <p>{pokemon?.weaknesses.join(", ") || "None"}</p>
          </div>
          {pokemon?.attacks &&
            Object.keys(pokemon?.attacks).map((key) => (
              <div key={key}>
                <h4>Attacks - {key}</h4>
                <p>
                  {pokemon?.attacks[key as keyof typeof pokemon.attacks]
                    .map((attack) => attack.name)
                    .join(", ") || "None"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default PokemonCardModal;
