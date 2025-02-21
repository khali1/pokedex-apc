import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FAVORITE_POKEMON, UNFAVORITE_POKEMON } from "../api/queries";
import { fetchGraphQL } from "../api/fetchers";
import { GQLMutation } from "../../graphqlTypes";
import { useCallback } from "react";

export const useFavoritePokemon = () => {
    const queryClient = useQueryClient();
    
    const invalidateQueries = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['pokemons'] });
        queryClient.invalidateQueries({ queryKey: ['pokemonByName'] });
    }, [queryClient]);

    const favorite = useMutation<GQLMutation, Error, { id: string }>({
        mutationFn: ({ id }) => fetchGraphQL(FAVORITE_POKEMON, { id }),
        onSuccess: invalidateQueries
    });

    const unfavorite = useMutation<GQLMutation, Error, { id: string }>({
        mutationFn: ({ id }) => fetchGraphQL(UNFAVORITE_POKEMON, { id }),
        onSuccess: invalidateQueries
    });

    return { favorite, unfavorite };
}