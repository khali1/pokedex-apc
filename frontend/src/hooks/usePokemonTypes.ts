import { fetchGraphQL } from "@/api/fetchers";
import { GQLQuery } from "../../graphqlTypes";
import { GET_POKEMON_TYPES } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";

export const usePokemonTypes = () => {
    const { data, error, isLoading } = useQuery<GQLQuery>({
        queryKey: ["pokemonTypes"],
        queryFn: () => fetchGraphQL(GET_POKEMON_TYPES),
    });

    return { data: data?.pokemonTypes, error, isLoading };
}