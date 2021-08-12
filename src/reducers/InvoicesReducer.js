import {
  GET_INVOICES,
  OPEN_FORM,
  CLOSE_FORM,
  ADD_NEW_INVOICE,
  DELETE_INVOICE,
  SELECT_INVOICE,
  SELECT_INVOICE_EDIT,
  RESET_SELECTED_INVOICE,
  ADD_ITEM_TO_ITEMS,
  DELETE_ITEM,
  FILTERED_INVOICES,
} from "../types/index";

const initialState = {
  invoices: [],
  selectedinvoice: null,
  openform: false,
  items: [],
  filter: [],
  filtered: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };
    case OPEN_FORM:
      return {
        ...state,
        openform: true,
      };
    case CLOSE_FORM:
      return {
        ...state,
        openform: false,
        items: [],
      };
    case ADD_NEW_INVOICE:
    case DELETE_INVOICE:
      return {
        ...state,
        selectedinvoice: null,
      };
    case SELECT_INVOICE:
      return {
        ...state,
        selectedinvoice: action.payload,
      };
    case SELECT_INVOICE_EDIT:
      return {
        ...state,
        items: state.selectedinvoice.items,
      };
    case RESET_SELECTED_INVOICE:
      return {
        ...state,
        selectedinvoice: null,
      };
    case ADD_ITEM_TO_ITEMS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => action.payload !== item.id),
      };
    case FILTERED_INVOICES:
      return {
        ...state,
        filtered: action.payload,
      };
    default:
      return state;
  }
}
