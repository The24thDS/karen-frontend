export const generateFetchActionNames = (item) => {
  const actionTypes = ['REQUESTED', 'SUCCEEDED', 'FAILED'];
  const generatedNames = actionTypes.map((type) => {
    const name = `${item}_FETCH_${type}`.toUpperCase();
    return [name, name];
  });
  return Object.fromEntries(generatedNames);
};
