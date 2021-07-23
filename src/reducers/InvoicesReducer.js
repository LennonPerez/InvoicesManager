import {
  GET_INVOICE,
  OPEN_FORM,
  CLOSE_FORM,
  SELECT_INVOICE,
  SELECT_INVOICE_EDIT,
  EDIT_EXISTING_INVOICE,
  RESET_SELECTED_INVOICE,
  ADD_NEW_INVOICE,
  DELETE_INVOICE,
  CHANGE_INVOICE_STATUS,
  ADD_ITEM_TO_ITEMS,
  DELETE_ITEM,
  FILTER_INVOICES_BY_STATUS,
  FILTERED_INVOICES,
} from "../types/index";

const initialState = {
  openform: false,
  invoices: [],
  selectedinvoice: null,
  items: [],
  filter: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVOICE:
    case ADD_NEW_INVOICE:
      return {
        ...state,
        invoices: action.payload,
        items: [],
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
      };
    case SELECT_INVOICE:
    case EDIT_EXISTING_INVOICE:
    case CHANGE_INVOICE_STATUS:
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
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) => invoice.id !== state.selectedinvoice.id
        ),
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
    case FILTER_INVOICES_BY_STATUS:
      return {
        ...state,
        filter: action.payload,
      };
    case FILTERED_INVOICES:
      return {
        ...state,
        invoices: action.payload.filter((invoice) =>
          invoice.status.includes(state.filter)
        ),
      };
    default:
      return state;
  }
}
