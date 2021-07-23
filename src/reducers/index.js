import { combineReducers } from "redux";
import InvoicesReducer from "./InvoicesReducer";

export default combineReducers({
  invoices: InvoicesReducer,
});
