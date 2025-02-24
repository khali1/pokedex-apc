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

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Modal>
  );
};

export default PokemonCardModal;
