import { DRAWER } from "../Actions/Types";

const INITIAL_STATE = false;

export default function Drawer(state = INITIAL_STATE, action) {
  if (action.type === DRAWER) {
    return (state = !state);
  }
  return (state = INITIAL_STATE);
}
