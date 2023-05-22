import { BUYER_PRO } from "../Actions/Types";

const INITIAL_STATE = false;

export default function buyer_pro_reducer(state = INITIAL_STATE, action) {
  if (action.type === BUYER_PRO) return (state = action.payload);
  return state;
}
