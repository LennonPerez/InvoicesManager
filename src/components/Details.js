import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import {
  selectInvoiceEditAction,
  addInvoiceAction,
  changeInvoiceStatusAction,
  openFormAction,
} from "../actions/InvoicesActions";

const Details = () => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const selectedinvoice = useSelector(
    (state) => state.invoices.selectedinvoice
  );

  const {
    status,
    id,
    description,
    senderAddress,
    createdAt,
    clientName,
    clientAddress,
    paymentDue,
    clientEmail,
    items,
    total,
  } = selectedinvoice;

  const returnToHome = () => {
    history.push("/");
    dispatch(addInvoiceAction(null));
  };

  const openEdit = () => {
    dispatch(selectInvoiceEditAction());
    dispatch(openFormAction());
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  const dateFomater = (date) => {
    const day = new Date(date).getDate() + 1;
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${day}-${month}-${year}`;
  };

  const markAsPaid = () => {
    selectedinvoice.status = "paid";
    dispatch(changeInvoiceStatusAction(selectedinvoice));
    history.push(`/details/${id}`);
  };

  const markAsPendient = () => {
    const error = document.querySelector(".errorpendient");
    if (
      selectedinvoice.clientEmail &&
      selectedinvoice.clientName &&
      selectedinvoice.createdAt &&
      selectedinvoice.paymentTerm &&
      selectedinvoice.description &&
      selectedinvoice.clientAddress.city &&
      selectedinvoice.clientAddress.street &&
      selectedinvoice.clientAddress.country &&
      selectedinvoice.clientAddress.postCode &&
      selectedinvoice.senderAddress.city &&
      selectedinvoice.senderAddress.street &&
      selectedinvoice.senderAddress.country &&
      selectedinvoice.senderAddress.postCode &&
      selectedinvoice.items.length > 0
    ) {
      selectedinvoice.status = "pending";
      dispatch(changeInvoiceStatusAction(selectedinvoice));
      error.style.opacity = "0";
      history.push(`/details/${id}`);
    } else {
      const btn = document.querySelector(".paid");
      btn.style.border = "2px solid red";
      error.style.opacity = "1";
    }
  };

  return (
    <div className="container">
      <div className="details-container">
        <button type="button" className="btn-back" onClick={returnToHome}>
          Go Back
        </button>
        <div className="status-container">
          <p>status</p>
          <h4 className={`status ${status}`}>{status}</h4>
        </div>
        <div className="details-box">
          <div>
            <h3>
              <span>#</span>
              {id}
            </h3>
            <p>{description}</p>
          </div>
          <div className="address">
            <p>{senderAddress.street}</p>
            <p>{senderAddress.city}</p>
            <p>{senderAddress.postCode}</p>
            <p>{senderAddress.country}</p>
          </div>
          <div className="payment">
            <div>
              <p>Invoice Date</p>
              <h4>{createdAt === null ? "" : dateFomater(createdAt)}</h4>
              <p>Payment Due</p>
              <h4>{paymentDue === null ? "" : dateFomater(paymentDue)}</h4>
            </div>
            <div>
              <p>Bill to</p>
              <h4>{clientName}</h4>
              <p>{clientAddress.street}</p>
              <p>{clientAddress.city}</p>
              <p>{clientAddress.postCode}</p>
              <p>{clientAddress.country}</p>
            </div>
          </div>
          <div className="email-container">
            <p>Sent to</p>
            <h4>{clientEmail}</h4>
          </div>
          <div className="princing">
            <div className="items">
              {window.innerWidth > 768 ? (
                <div className="item-price">
                  <div>
                    <p style={{ color: "#fff", fontWeight: "400" }}>
                      Item Name
                    </p>
                    <div className="price-quantity">
                      <p style={{ fontWeight: "400" }}>QTY.</p>
                      <p style={{ fontWeight: "400" }}>Price</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontWeight: "400" }}>Total</p>
                  </div>
                </div>
              ) : null}
              {items.map((item) => (
                <div className="item-price" key={uuidv4()}>
                  <div>
                    <h5>{item.name}</h5>
                    {window.innerWidth > 768 ? (
                      <div className="price-quantity">
                        <p>{item.quantity}</p>
                        <p>{formatter.format(item.price)}</p>
                      </div>
                    ) : (
                      <p>
                        {item.quantity} x {formatter.format(item.price)}
                      </p>
                    )}
                  </div>
                  <div>
                    <p>{formatter.format(item.total)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="total">
              <p>Grand Total</p>
              <p>{formatter.format(total)}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="errorpendient">
        {window.innerWidth > 768
          ? 'All the inputs must be filled before set the invoice as "Pendient"'
          : "All the inputs must be filled"}
      </p>
      <div className="footer-details">
        {selectedinvoice.status !== "paid" ? (
          <button type="button" onClick={openEdit} className="edit">
            Edit
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="delete"
        >
          Delete
        </button>
        {selectedinvoice.status === "pending" ? (
          <button type="button" onClick={markAsPaid} className="paid">
            Mark as Paid
          </button>
        ) : null}
        {selectedinvoice.status === "draft" ? (
          <button type="button" onClick={markAsPendient} className="paid">
            {window.innerWidth > 768 ? "Mark as Pendient" : "Pendient"}
          </button>
        ) : null}
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        selectedinvoice={selectedinvoice}
      >
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the invoice <span>#{id}</span>?, this
          action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default Details;
