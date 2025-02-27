import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/Toast/ToastProvider";
import { FAVORITE_POKEMON, UNFAVORITE_POKEMON } from "../api/queries";
import { fetchGraphQL } from "../api/fetchers";
import { GQLMutation } from "../../graphqlTypes";
import { useCallback } from "react";

export const useFavoritePokemon = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const handleSuccess = useCallback(
    (response: GQLMutation) => {
      if (response?.favoritePokemon) {
        showToast(
          `Pokemon ${response?.favoritePokemon?.name} added to favorites`
        );
      } else {
        showToast(
          `Pokemon ${response?.unFavoritePokemon?.name} removed from favoritesremoved from favoritesremoved from favorites`
        );
      }
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
      queryClient.invalidateQueries({ queryKey: ["pokemonByName"] });
    },
    [queryClient, showToast]
  );

  const favorite = useMutation<GQLMutation, Error, { id: string }>({
    mutationFn: ({ id }) => fetchGraphQL(FAVORITE_POKEMON, { id }),
    onSuccess: handleSuccess,
  });

  const unfavorite = useMutation<GQLMutation, Error, { id: string }>({
    mutationFn: ({ id }) => fetchGraphQL(UNFAVORITE_POKEMON, { id }),
    onSuccess: handleSuccess,
  });

  return { favorite, unfavorite };
};
