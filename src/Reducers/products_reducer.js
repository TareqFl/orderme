import { GET_ALL_PRODUCTS } from "../Actions/Types";

const INITIAL_STATE = null;

export default function products_reducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  if (type === GET_ALL_PRODUCTS) {
    return (state = payload);
  }
  return state;
}
