import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InvoicesBar from "./InvoicesBar";
import Empty from "./Empy";
import InvoicesList from "./InvoicesList";
import { getInvoiceAction } from "../actions/InvoicesActions";

const Invoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices);

  useEffect(() => {
    dispatch(getInvoiceAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="invoices-list">
      <InvoicesBar />
      {invoices.length > 0 ? <InvoicesList /> : <Empty />}
    </div>
  );
};

export default Invoices;
