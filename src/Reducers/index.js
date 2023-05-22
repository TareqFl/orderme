import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import themeMode from "./themeMode";
import Navigation from "./navigation_reducer";
import Drawer from "./drawer_reducer";
import Authentication from "./auth_reducer";
import Modal from "./modal_reducer";
import Protection from "./buyer_pro_reducer";
import Flash_Message from "./snackBar_reducer";
import Cart from "./cart_reducer";
import Checkout from "./checkout_reducer";
import Item_view from "./view_item_reducer";
import Toast from "./toaster_reducer";
import Paper_view from "./paper_reducer";
import Products from "./products_reducer";
import Category from "./product_category_reducer";
import Store_Products from "./store_products_reducer";
const all_reducers = combineReducers({
  themeMode,
  Navigation,
  Drawer,
  Authentication,
  Modal,
  Protection,
  Flash_Message,
  Cart,
  Checkout,
  Item_view,
  Toast,
  Paper_view,
  Products,
  Category,
  Store_Products,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  all_reducers,
  composeEnhancers(applyMiddleware(thunk))
);
