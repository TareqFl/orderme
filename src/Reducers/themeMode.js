import { DARK_MODE, LIGHT_MODE } from "../Actions/Types";

const INITIAL_STATE = "light";

export default function themeMode_reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DARK_MODE:
      return (state = "dark");
    case LIGHT_MODE:
      return (state = "light");
    default:
      return state;
  }
}
