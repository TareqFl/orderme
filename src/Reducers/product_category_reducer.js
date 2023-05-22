import { DISPLAY_CATEGORY_TYPE } from "../Actions/Types";

const INITIAL_STATE = null;

export default function product_category_reducer(
  state = INITIAL_STATE,
  action
) {
  if (action.type === DISPLAY_CATEGORY_TYPE) {
    return (state = action.payload);
  }
  return state;
}
