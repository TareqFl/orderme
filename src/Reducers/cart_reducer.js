import { ADD_TO_CART } from "../Actions/Types";

const INTIIAL_STATE = [];

export default function addtocart(state = INTIIAL_STATE, action) {
  if (action.type === ADD_TO_CART) {
    return (state = action.payload);
  }
  return state;
}
