import { MODAL } from "../Actions/Types";

const INITIAL_STATE = false;

export default function modal_reducer(state = INITIAL_STATE, action) {
  if (action.type === MODAL) {
    return (state = action.payload);
  }
  return state;
}
