export default async (query, params) => {
  const result = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: params
    })
  });
  const res = await result.json();
  return res;
};
