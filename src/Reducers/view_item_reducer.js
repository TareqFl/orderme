import { VIEW } from "../Actions/Types";

const INITIAL_STATE = null;

export default function view(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  if (type === VIEW) {
    return (state = payload);
  }
  return state;
}
