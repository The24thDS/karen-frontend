export const types = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

export function incrementExampleCounter() {
  return {
    type: types.INCREMENT,
  };
}
export function decrementExampleCounter() {
  return {
    type: types.DECREMENT,
  };
}
