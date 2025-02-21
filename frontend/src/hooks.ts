import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FAVORITE_POKEMON, UNFAVORITE_POKEMON } from "./api/queries";
import { fetchGraphQL } from "./api/fetchers";
import { GQLMutation } from "../graphqlTypes";

export const useFavoritePokemon = () => {
    const queryClient = useQueryClient();

    const favorite = useMutation<GQLMutation, Error, { id: string }>({
        mutationFn: ({ id }) => fetchGraphQL(FAVORITE_POKEMON, { id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pokemons'] });
        }
    });

    const unfavorite = useMutation<GQLMutation, Error, { id: string }>({
        mutationFn: ({ id }) => fetchGraphQL(UNFAVORITE_POKEMON, { id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pokemons'] });
        }
    });

    return {
        favorite, unfavorite
    };
}