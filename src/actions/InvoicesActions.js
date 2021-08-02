import {
  GET_INVOICES,
  OPEN_FORM,
  CLOSE_FORM,
  ADD_NEW_INVOICE,
  DELETE_INVOICE,
  SELECT_INVOICE,
  SELECT_INVOICE_EDIT,
  EDIT_EXISTING_INVOICE,
  RESET_SELECTED_INVOICE,
  CHANGE_INVOICE_STATUS,
  ADD_ITEM_TO_ITEMS,
  DELETE_ITEM,
  FILTERED_INVOICES,
} from "../types/index";
import AxiosClient from "../config/axios";

export function getInvoiceAction() {
  return async (dispatch) => {
    //get all the invoices from the data base
    const invoices = await AxiosClient.get("/invoices");
    dispatch(getInvoices(invoices.data));
  };
}

const getInvoices = (invoices) => ({
  type: GET_INVOICES,
  payload: invoices,
});

export function openFormAction() {
  return (dispatch) => {
    dispatch(openForm());
  };
}

const openForm = () => ({
  type: OPEN_FORM,
});

export function closeFormAction() {
  return (dispatch) => {
    dispatch(closeForm());
  };
}

const closeForm = () => ({
  type: CLOSE_FORM,
});

export function selectInvoiceAction(invoice) {
  return (dispatch) => {
    dispatch(selectInvoice(invoice));
  };
}

const selectInvoice = (invoice) => ({
  type: SELECT_INVOICE,
  payload: invoice,
});

export function selectInvoiceEditAction() {
  return (dispatch) => {
    dispatch(selectinvoiceEdit());
  };
}

const selectinvoiceEdit = () => ({
  type: SELECT_INVOICE_EDIT,
});

export function resetSelectedInvoiceAction() {
  return (dispatch) => {
    dispatch(resetSelectedInvoice());
  };
}

const resetSelectedInvoice = () => ({
  type: RESET_SELECTED_INVOICE,
});

export function addNewInvoiceAction(invoice) {
  return async (dispatch) => {
    await AxiosClient.post("/invoices", invoice);
    dispatch(addNewInvoice());
  };
}

const addNewInvoice = () => ({
  type: ADD_NEW_INVOICE,
});

export function deleteInvoiceAction(invoice) {
  return async (dispatch) => {
    await AxiosClient.delete(`/invoices/${invoice.id}`);
    dispatch(deleteInvoice());
  };
}

const deleteInvoice = () => ({
  type: DELETE_INVOICE,
});

export function editExistingInvoiceAction(invoice) {
  return async (dispatch) => {
    await AxiosClient.put(`/invoices/${invoice.id}`, invoice);
    dispatch(editExistingInvoice(invoice));
  };
}

const editExistingInvoice = (invoice) => ({
  type: EDIT_EXISTING_INVOICE,
  payload: invoice,
});

export function changeInvoiceStatusAction(invoice) {
  return async (dispatch) => {
    await AxiosClient.put(`/invoices/${invoice.id}`, invoice);
    dispatch(changeInvoiceStatus(invoice));
  };
}

const changeInvoiceStatus = (invoice) => ({
  type: CHANGE_INVOICE_STATUS,
  payload: invoice,
});

export function addNewItemAction(item) {
  return (dispatch) => {
    dispatch(addNewItem(item));
  };
}

const addNewItem = (item) => ({
  type: ADD_ITEM_TO_ITEMS,
  payload: item,
});

export function deleteItemAction(id) {
  return (dispatch) => {
    dispatch(deleteItem(id));
  };
}

const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

export function filterInvoicesAction(invoices) {
  return (dispatch) => {
    dispatch(filterInvoices(invoices));
  };
}

const filterInvoices = (invoices) => ({
  type: FILTERED_INVOICES,
  payload: invoices,
});
