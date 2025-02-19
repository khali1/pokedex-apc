import axios from 'axios';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';

export const fetchGraphQL = async <T>(query: DocumentNode, variables?: Record<string, any>): Promise<T> => {
  const { data } = await axios.post('/graphql', {
    query: print(query),
    variables,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data.data;
}; 