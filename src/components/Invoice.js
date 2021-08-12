import { useHistory } from "react-router-dom";

const Invoice = ({ invoice }) => {
  const history = useHistory();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  const getInvoice = (invoice) => {
    history.push(`/details/${invoice.uid}`);
  };

  return (
    <div
      className="invoice-container"
      key={invoice.uid}
      onClick={() => getInvoice(invoice)}
    >
      <div className="half head">
        <h3>
          <span>#</span>
          {invoice.uid}
        </h3>
        <p>{invoice.clientName}</p>
      </div>
      <div className="half bottom">
        <div>
          <p>Due {invoice.paymentDue === "" ? "" : invoice.paymentDue}</p>
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
