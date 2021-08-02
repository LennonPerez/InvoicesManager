import { useSelector } from "react-redux";
import Invoice from "./Invoice";

const InvoicesList = () => {
  const { invoices, filtered } = useSelector((state) => state.invoices);

  return (
    <div className="invoiceslist">
      {filtered.length > 0
        ? filtered.map((invoice) => (
            <Invoice invoice={invoice} key={invoice.id} />
          ))
        : invoices.map((invoice) => (
            <Invoice invoice={invoice} key={invoice.id} />
          ))}
    </div>
  );
};

export default InvoicesList;
