import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteInvoiceAction,
  getInvoiceAction,
} from "../actions/InvoicesActions";

const Modal = ({ open, children, onClose, selectedinvoice }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteInvoice = async (invoice) => {
    await dispatch(deleteInvoiceAction(invoice));
    history.push("/");
    await dispatch(getInvoiceAction());
  };

  if (!open) return null;

  return (
    <Fragment>
      <div className="transparent-background" />
      <div className="modal">
        {children}
        <div>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              deleteInvoice(selectedinvoice);
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
