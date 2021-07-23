import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  closeFormAction,
  addNewInvoiceAction,
  getInvoiceAction,
  editExistingInvoiceAction,
} from "../actions/InvoicesActions";
import ItemForm from "./ItemForm";

const Form = () => {
  const dispatch = useDispatch();
  const trimmedString = uuidv4().substring(0, 6);
  const selectedinvoice = useSelector(
    (state) => state.invoices.selectedinvoice
  );
  const [newinvoice, setNewInvoice] = useState({
    clientAddress: {
      city: selectedinvoice ? selectedinvoice.clientAddress.city : null,
      country: selectedinvoice ? selectedinvoice.clientAddress.country : null,
      postCode: selectedinvoice ? selectedinvoice.clientAddress.postCode : null,
      street: selectedinvoice ? selectedinvoice.clientAddress.street : null,
    },
    senderAddress: {
      city: selectedinvoice ? selectedinvoice.senderAddress.city : null,
      country: selectedinvoice ? selectedinvoice.senderAddress.country : null,
      postCode: selectedinvoice ? selectedinvoice.senderAddress.postCode : null,
      street: selectedinvoice ? selectedinvoice.senderAddress.street : null,
    },
    items: selectedinvoice ? selectedinvoice.items : [],
    clientEmail: selectedinvoice ? selectedinvoice.clientEmail : null,
    clientName: selectedinvoice ? selectedinvoice.clientName : null,
    createdAt: selectedinvoice ? selectedinvoice.createdAt : null,
    description: selectedinvoice ? selectedinvoice.description : null,
    paymentDue: selectedinvoice ? selectedinvoice.paymentDue : null,
    paymentTerm: selectedinvoice ? selectedinvoice.paymentTerm : null,
    status: selectedinvoice ? selectedinvoice.status : "pending",
    total: selectedinvoice ? selectedinvoice.total : 0,
    id: selectedinvoice ? selectedinvoice.id : trimmedString,
  });
  const { items, createdAt } = newinvoice;
  const [term, setTerm] = useState(
    selectedinvoice ? selectedinvoice.paymentTerm : null
  );
  const [formerror, setFormError] = useState(false);
  const [formerror2, setFormError2] = useState(false);

  const invoiceitems = useSelector((state) => state.invoices.items);

  const CloseForm = () => {
    dispatch(closeFormAction());
  };

  const openTerms = () => {
    const hiddenterms = document.querySelector(".hiddenmenu2");
    const arrow = document.querySelector(".arrow2");
    if (hiddenterms.style.opacity === "1") {
      hiddenterms.style.opacity = "0";
      hiddenterms.style.pointerEvents = "none";
      arrow.style.transform = "rotate(0)";
    } else {
      hiddenterms.style.opacity = "1";
      hiddenterms.style.pointerEvents = "all";
      arrow.style.transform = "rotate(-180deg)";
    }
  };

  const readInput = (e) => {
    setNewInvoice({
      ...newinvoice,
      [e.target.name]: e.target.value,
    });
  };

  const readClientAddress = (e) => {
    setNewInvoice({
      ...newinvoice,
      clientAddress: {
        ...newinvoice.clientAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  const readSenderAddress = (e) => {
    setNewInvoice({
      ...newinvoice,
      senderAddress: {
        ...newinvoice.senderAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  const readItems = () => {
    setNewInvoice({
      ...newinvoice,
      items: invoiceitems,
    });
  };

  const getPaymentDue = () => {
    const createdat = newinvoice.createdAt;

    function addDays(date, days) {
      const copy = new Date(Number(date));
      copy.setDate(date.getDate() + days);
      return copy;
    }

    const date = new Date(createdat);
    const newDate = addDays(date, term);

    setNewInvoice({
      ...newinvoice,
      paymentTerm: term,
      paymentDue: newDate,
    });
  };

  const getTotal = () => {
    let sum = 0;
    for (let i = 0; i < invoiceitems.length; i++) {
      sum += Number(invoiceitems[i].total);
    }
    setNewInvoice({
      ...newinvoice,
      total: sum,
      items: invoiceitems,
    });
  };

  useEffect(() => {
    getPaymentDue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, createdAt]);

  useEffect(() => {
    readItems();
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceitems, items]);

  const addNewInvoice = (e) => {
    e.preventDefault();
    if (
      newinvoice.clientEmail &&
      newinvoice.clientName &&
      newinvoice.createdAt &&
      newinvoice.paymentTerm &&
      newinvoice.description &&
      newinvoice.clientAddress.city &&
      newinvoice.clientAddress.street &&
      newinvoice.clientAddress.country &&
      newinvoice.clientAddress.postCode &&
      newinvoice.senderAddress.city &&
      newinvoice.senderAddress.street &&
      newinvoice.senderAddress.country &&
      newinvoice.senderAddress.postCode &&
      newinvoice.items.length > 0
    ) {
      if (selectedinvoice) {
        dispatch(editExistingInvoiceAction(newinvoice));
      } else {
        dispatch(addNewInvoiceAction(newinvoice));
      }
      dispatch(getInvoiceAction());
      CloseForm();
    } else if (newinvoice.status === "draft") {
      if (selectedinvoice) {
        dispatch(editExistingInvoiceAction(newinvoice));
      } else {
        dispatch(addNewInvoiceAction(newinvoice));
      }
      dispatch(getInvoiceAction());
      CloseForm();
    } else {
      setFormError(true);
      inputError(true);
      if (invoiceitems.length === 0) {
        setFormError2(true);
      }
    }
  };

  const inputError = (bool) => {
    const input = document.querySelectorAll(".forminput");
    const terms = document.querySelector(".terms").firstChild;
    input.forEach((i) => {
      if (i.value === "" && bool === true) {
        i.classList.add("bordererror");
        i.previousElementSibling.classList.add("labelerror");
      } else {
        i.classList.remove("bordererror");
        i.previousElementSibling.classList.remove("labelerror");
      }
    });
    if (term === null && bool === true) {
      terms.classList.add("bordererror");
      terms.parentElement.previousElementSibling.classList.add("labelerror");
    } else {
      terms.classList.remove("bordererror");
      terms.parentElement.previousElementSibling.classList.remove("labelerror");
    }
  };

  return (
    <Fragment>
      <form className="edit-container" onSubmit={addNewInvoice}>
        <div className="container">
          {window.innerWidth > 768 ? null : (
            <div className="back-btn">
              <button type="button" className="btn-back" onClick={CloseForm}>
                Go back
              </button>
            </div>
          )}
          {selectedinvoice ? (
            <h2>
              Edit <span>#</span>
              <span>{selectedinvoice.id}</span>
            </h2>
          ) : (
            <h2 style={{ textTransform: "capitalize" }}>New Invoice</h2>
          )}
          <div className="form">
            <div className="Address">
              <h4>Bill from</h4>
              <label>Street Access</label>
              <input
                type="text"
                name="street"
                className="forminput"
                onChange={readSenderAddress}
                value={newinvoice.senderAddress.street}
              />
              <div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="forminput"
                    onChange={readSenderAddress}
                    value={newinvoice.senderAddress.city}
                  />
                </div>
                <div>
                  <label>Post-Code</label>
                  <input
                    type="text"
                    name="postCode"
                    className="forminput"
                    onChange={readSenderAddress}
                    value={newinvoice.senderAddress.postCode}
                  />
                </div>
                <div className="country">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    className="forminput"
                    onChange={readSenderAddress}
                    value={newinvoice.senderAddress.country}
                  />
                </div>
              </div>
            </div>
            <h4>Bill to</h4>
            <label>Client's Name</label>
            <input
              type="text"
              name="clientName"
              className="forminput"
              onChange={readInput}
              value={newinvoice.clientName}
            />
            <label>Client's Email</label>
            <input
              type="email"
              name="clientEmail"
              className="forminput"
              onChange={readInput}
              value={newinvoice.clientEmail}
            />
            <div className="Address">
              <label>Street Access</label>
              <input
                type="text"
                name="street"
                className="forminput"
                onChange={readClientAddress}
                value={newinvoice.clientAddress.street}
              />
              <div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="forminput"
                    onChange={readClientAddress}
                    value={newinvoice.clientAddress.city}
                  />
                </div>
                <div>
                  <label>Post-Code</label>
                  <input
                    type="text"
                    name="postCode"
                    className="forminput"
                    onChange={readClientAddress}
                    value={newinvoice.clientAddress.postCode}
                  />
                </div>
                <div className="country">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    className="forminput"
                    onChange={readClientAddress}
                    value={newinvoice.clientAddress.country}
                  />
                </div>
              </div>
            </div>
            <div className="form3">
              <div>
                <label>Invoice Date</label>
                <input
                  type="date"
                  name="createdAt"
                  className="forminput"
                  onChange={readInput}
                  value={newinvoice.createdAt}
                  // disabled={selectedinvoice ? true : false}
                  // style={selectedinvoice ? { opacity: "0.5" } : null}
                />
              </div>
              <div>
                <label>Payment Terms</label>
                <ul className="terms" onClick={openTerms}>
                  <li>
                    {term ? "Net " + term + " Days" : "Select a Payment Term"}
                    <span className="arrow2"></span>
                    <ul className="hiddenmenu2">
                      <li onClick={(e) => setTerm(1)}>Net 1 Day</li>
                      <li onClick={(e) => setTerm(7)}>Net 7 Days</li>
                      <li onClick={(e) => setTerm(14)}>Net 14 Days</li>
                      <li onClick={(e) => setTerm(30)}>Net 30 Days</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <label>Proyect Description</label>
                <input
                  type="text"
                  name="description"
                  className="forminput"
                  onChange={readInput}
                  value={newinvoice.description}
                />
              </div>
            </div>
          </div>
          <div className="item-list">
            <h3>Item List</h3>
            <ItemForm setFormError2={setFormError2} />
          </div>
          <div className="errors">
            <p
              className="formerror"
              style={formerror ? { opacity: "1" } : null}
            >
              All the inputs must be filled
            </p>
            <p
              className="formerror2"
              style={formerror2 ? { opacity: "1" } : null}
            >
              At least an item must be added
            </p>
          </div>
          <div className="edit-footer">
            {selectedinvoice ? (
              <button type="button" onClick={CloseForm}>
                Cancel
              </button>
            ) : (
              <button type="button" onClick={CloseForm}>
                Discard
              </button>
            )}
            {selectedinvoice ? null : (
              <button
                type="submit"
                className="draft"
                onClick={() => {
                  setNewInvoice({
                    ...newinvoice,
                    status: "draft",
                  });
                }}
              >
                Save as Draft
              </button>
            )}
            {selectedinvoice ? (
              <button type="submit">Save Changes</button>
            ) : (
              <button type="submit">Save & Send</button>
            )}
          </div>
        </div>
      </form>
      <div
        className="transparent-background-form"
        onClick={() => CloseForm()}
      />
    </Fragment>
  );
};

export default Form;
