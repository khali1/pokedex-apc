import { print } from 'graphql';
import { DocumentNode } from 'graphql';

export const fetchGraphQL = async <T>(query: DocumentNode, variables?: Record<string, any>): Promise<T> => {
  const res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const { data } = await res.json();
  return data;
}; 