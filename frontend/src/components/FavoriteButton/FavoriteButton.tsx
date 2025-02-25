import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useCallback } from "react";
import { useFavoritePokemon } from "@/hooks/useFavoritePokemon";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  pokemonId: string;
  isFavorite: boolean;
}

const FavoriteButton = ({ pokemonId, isFavorite }: FavoriteButtonProps) => {
  const { favorite, unfavorite } = useFavoritePokemon();
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const favFn = isFavorite ? unfavorite : favorite;
      pokemonId && favFn.mutate({ id: pokemonId });
    },
    [pokemonId, isFavorite, favorite, unfavorite]
  );
  return (
    <button className={styles.favoriteButton} onClick={onClick}>
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </button>
  );
};

export default FavoriteButton;
