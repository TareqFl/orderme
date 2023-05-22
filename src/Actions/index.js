import {
  DARK_MODE,
  LIGHT_MODE,
  NAVIGATION,
  DRAWER,
  AUTH,
  MODAL,
  BUYER_PRO,
  SNACKBAR,
  REMEMBERME,
  ADD_TO_CART,
  CHECKOUT,
  VIEW,
  TOASTER,
  TOASTER_SUCCESS,
  TOASTER_ERROR,
  CATEGORY_BUTTON,
  NOTIFICATION_BUTTON,
  MESSAGE_BUTTON,
  LANGUAGE_BUTTON,
  GET_ALL_PRODUCTS,
  DISPLAY_CATEGORY_TYPE,
  GET_STORE_PRODUCTS,
} from "./Types";
import fakeData from "../Data";
export const dark_mode = () => {
  return {
    type: DARK_MODE,
  };
};

export const light_mode = () => {
  return {
    type: LIGHT_MODE,
  };
};

export const navigation = (navigate) => {
  return {
    type: NAVIGATION,
    payload: navigate,
  };
};

export const handle_drawer = () => {
  return {
    type: DRAWER,
  };
};

export const authentication = (value) => {
  return {
    type: AUTH,
    payload: value,
  };
};

export const open_modal = (value) => {
  return {
    type: MODAL,
    payload: value,
  };
};

export const open_Buyer_pro = (value) => {
  return {
    type: BUYER_PRO,
    payload: value,
  };
};

export const snackBar = (value) => {
  return {
    type: SNACKBAR,
    payload: value,
  };
};

export const remember_me = (value) => {
  return {
    type: REMEMBERME,
    payload: value,
  };
};

// Handle Cart

export const add_to_cart = (value) => {
  return {
    type: ADD_TO_CART,
    payload: value,
  };
};

export const checkout = (value) => {
  return {
    type: CHECKOUT,
    payload: value,
  };
};

export const view_item = (value) => {
  return {
    type: VIEW,
    payload: value,
  };
};

export const toaster_toaster = (value) => {
  return {
    type: TOASTER,
    payload: value,
  };
};
export const toaster_success = (value) => {
  return {
    type: TOASTER_SUCCESS,
    payload: value,
  };
};
export const toaster_error = (value) => {
  return {
    type: TOASTER_ERROR,
    payload: value,
  };
};

export const open_category = (value) => {
  return {
    type: CATEGORY_BUTTON,
    payload: value,
  };
};
export const open_notification = (value) => {
  return {
    type: NOTIFICATION_BUTTON,
    payload: value,
  };
};
export const open_message = (value) => {
  return {
    type: MESSAGE_BUTTON,
    payload: value,
  };
};
export const open_language = (value) => {
  return {
    type: LANGUAGE_BUTTON,
    payload: value,
  };
};

export const get_all_products = () => async (dispatch) => {
  const response = await fetch(
    process.env.REACT_APP_DOMAIN_NAME + "/all_products",
    {
      method: "GET",
    }
  );
  const data = await response.json();

  if (data.products) {
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: [...data.products, ...fakeData],
    });
  } else {
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: fakeData,
    });
  }
};

export const category_type = (value) => {
  return {
    type: DISPLAY_CATEGORY_TYPE,
    payload: value,
  };
};

export const show_store_products = (value) => {
  return {
    type: GET_STORE_PRODUCTS,
    payload: value,
  };
};
