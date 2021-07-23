import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemAction } from "../actions/InvoicesActions";

const Item = ({ itemm, readItem }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState({
    name: itemm.name,
    quantity: itemm.quantity,
    price: itemm.price,
    total: itemm.total,
    id: itemm.id,
  });

  const editItem = () => {
    readItem(item);
    dispatch(deleteItemAction(itemm.id));
  };

  const deleteItem = () => {
    dispatch(deleteItemAction(itemm.id));
  };
  return (
    <div className="item">
      <div onClick={editItem}>
        {window.innerWidth > 768 ? null : <label>Item Name</label>}
        <input type="text" name="name" disabled={true} value={item.name} />
      </div>
      <div>
        <div onClick={editItem}>
          {window.innerWidth > 768 ? null : <label>Qty</label>}
          <input
            type="number"
            name="quantity"
            disabled={true}
            value={item.quantity}
          />
        </div>
        <div onClick={editItem}>
          {window.innerWidth > 768 ? null : <label>Price</label>}
          <input
            type="number"
            name="price"
            disabled={true}
            value={item.price}
          />
        </div>
        <div onClick={editItem}>
          {window.innerWidth > 768 ? null : <label>Total</label>}
          <input
            type="text"
            className="total"
            name="total"
            disabled={true}
            value={itemm.total}
          />
        </div>
        <button type="button" onClick={deleteItem}></button>
      </div>
    </div>
  );
};

export default Item;
