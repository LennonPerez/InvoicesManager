import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewItemAction } from "../actions/InvoicesActions";
import Item from "./Item";
import uuid from "uuid";

const ItemForm = ({ setFormError2 }) => {
  const dispatch = useDispatch();
  const invoiceitems = useSelector((state) => state.invoices.items);
  const [errorform, setErrorForm] = useState(false);
  const [item, readItem] = useState({
    name: "",
    quantity: "",
    price: "",
    total: "",
    id: uuid(),
  });

  const { name, quantity, price, total } = item;

  const handleChange = (e) => {
    readItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (quantity && price) {
      readItem({
        ...item,
        total: Number(quantity * price),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, price]);

  const inputError = () => {
    const input = document.querySelectorAll(".inputitem");
    input.forEach((i) => {
      if (i.value === "") {
        i.classList.add("bordererror");
        i.previousElementSibling.classList.add("labelerror");
      } else {
        i.classList.remove("bordererror");
        i.previousElementSibling.classList.remove("labelerror");
      }
    });
  };

  const handleSubmit = () => {
    if (name && quantity && price && total) {
      setErrorForm(false);
      setFormError2(false);
      inputError();
      dispatch(addNewItemAction(item));
      readItem({
        name: "",
        quantity: "",
        price: "",
        total: "",
      });
    } else {
      inputError();
      setErrorForm(true);
      setFormError2(true);
    }
  };

  return (
    <Fragment>
      <div className="item form">
        <div>
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            className="inputitem"
          />
        </div>
        <div>
          <div>
            <label>Qty</label>
            <input
              type="number"
              name="quantity"
              className="inputitem"
              onChange={handleChange}
              value={quantity}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="inputitem"
              onChange={handleChange}
              value={price}
            />
          </div>
          <div>
            <label>Total</label>
            <input
              type="text"
              className="total inputitem"
              name="total"
              disabled={true}
              value={total}
            />
          </div>
        </div>
      </div>
      {invoiceitems.map((item) => (
        <Item key={uuid()} itemm={item} readItem={readItem} />
      ))}
      <p className="errorform" style={errorform ? { display: "block" } : null}>
        All the inputs must be filled before add a new item
      </p>
      <button type="button" className="add-item" onClick={handleSubmit}>
        + Add New Item
      </button>
    </Fragment>
  );
};

export default ItemForm;
