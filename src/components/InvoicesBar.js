import { useSelector, useDispatch } from "react-redux";
import {
  openFormAction,
  filterInvoicesAction,
} from "../actions/InvoicesActions";

const InvoicesBar = () => {
  let filtered = [];
  const invoices = useSelector((state) => state.invoices.invoices);
  const dispatch = useDispatch();

  const openForm = () => {
    dispatch(openFormAction());
  };

  const readFilter = (e) => {
    if (e.target.checked) {
      filtered = filtered.concat(
        invoices.filter((invoice) => invoice.status === e.target.id)
      );
    } else {
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].status === e.target.id) {
          filtered.splice(i, 1);
          i--;
        }
      }
    }
    dispatch(filterInvoicesAction(filtered));
  };

  const openFilter = () => {
    const hiddenfilter = document.querySelector(".hiddenmenu");
    const arrow = document.querySelector(".arrow");
    if (hiddenfilter.style.opacity === "1") {
      hiddenfilter.style.opacity = "0";
      hiddenfilter.style.pointerEvents = "none";
      arrow.style.transform = "rotate(0)";
    } else {
      hiddenfilter.style.opacity = "1";
      hiddenfilter.style.pointerEvents = "all";
      arrow.style.transform = "rotate(-180deg)";
    }
  };

  return (
    <div className="invoices-bar">
      <div className="tittle-box">
        <h2>Invoices</h2>
        {invoices.length > 0 ? (
          <p>
            {window.innerWidth > 768 && "There are "}
            {invoices.length} {window.innerWidth > 768 && "total "} invoices
          </p>
        ) : (
          <p>No invoices</p>
        )}
      </div>
      <ul className="filter-box">
        <li>
          <button onClick={openFilter}>
            Filter {window.innerWidth > 768 && "by status"}
            <span className="arrow"></span>
          </button>

          <ul className="hiddenmenu">
            <li>
              <span></span>
              <input type="checkbox" id="draft" onChange={readFilter} />
              <label htmlFor="draft">Draft</label>
            </li>
            <li>
              <span></span>
              <input type="checkbox" id="pending" onChange={readFilter} />
              <label htmlFor="pending">Pending</label>
            </li>
            <li>
              <span></span>
              <input type="checkbox" id="paid" onChange={readFilter} />
              <label htmlFor="paid">Paid</label>
            </li>
          </ul>
        </li>
      </ul>
      <div className="button-box">
        <button type="button" onClick={openForm}>
          New {window.innerWidth > 768 && "Invoice"}
        </button>
      </div>
    </div>
  );
};

export default InvoicesBar;
