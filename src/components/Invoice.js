import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectInvoiceAction } from "../actions/InvoicesActions";

const Invoice = ({ invoice }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const getInvoice = (invoice) => {
    history.push(`/details/${invoice.id}`);
    dispatch(selectInvoiceAction(invoice));
  };

  return (
    <div
      className="invoice-container"
      key={invoice.id}
      onClick={() => getInvoice(invoice)}
    >
      <div className="half head">
        <h3>
          <span>#</span>
          {invoice.id}
        </h3>
        <p>{invoice.clientName}</p>
      </div>
      <div className="half bottom">
        <div>
          <p>
            Due{" "}
            {invoice.paymentDue === "" ? "" : dateFomater(invoice.paymentDue)}
          </p>
          <h3>{formatter.format(invoice.total)}</h3>
        </div>
        <div>
          <div className="status-box">
            <h4 className={`status ${invoice.status}`}>{invoice.status}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
