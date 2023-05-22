import { GET_STORE_PRODUCTS } from "../Actions/Types";

const INITIAL_VALUES = [];

export default function store_products_reducer(state = INITIAL_VALUES, action) {
  if (action.type === GET_STORE_PRODUCTS) {
    return (state = action.payload);
  }
  return state;
}
