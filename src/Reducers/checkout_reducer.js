import { CHECKOUT } from "../Actions/Types";

const INITIAL_STATE = false;

export default function checkout_reducer(state = INITIAL_STATE, action) {
  if (action.type === CHECKOUT) {
    return (state = action.payload);
  }
  return state;
}
