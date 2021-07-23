import { useDispatch } from "react-redux";
import { deleteItemAction } from "../actions/InvoicesActions";

const Item = ({ itemm }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(deleteItemAction(itemm.id));
  };
  return (
    <div className="item">
      <div>
        {itemm.id === 0 ? (
          <label>Item Name</label>
        ) : window.innerWidth > 768 ? null : (
          <label>Item Name</label>
        )}
        <input
          type="text"
          name="name"
          disabled={itemm.name.length > 0 ? true : false}
          value={itemm.name}
        />
      </div>
      <div>
        <div>
          {itemm.id === 0 ? (
            <label>Qty</label>
          ) : window.innerWidth > 768 ? null : (
            <label>Qty</label>
          )}
          <input
            type="number"
            name="quantity"
            disabled={itemm.quantity.length > 0 ? true : false}
            value={itemm.quantity}
          />
        </div>
        <div>
          {itemm.id === 0 ? (
            <label>Price</label>
          ) : window.innerWidth > 768 ? null : (
            <label>Price</label>
          )}
          <input
            type="number"
            name="price"
            disabled={itemm.price.length > 0 ? true : false}
            value={itemm.price}
          />
        </div>
        <div>
          {itemm.id === 0 ? (
            <label>Total</label>
          ) : window.innerWidth > 768 ? null : (
            <label>Total</label>
          )}
          <input
            type="text"
            className="total"
            name="total"
            disabled={true}
            value={itemm.total}
          />
        </div>
        {itemm.id === 0 ? null : (
          <button type="button" onClick={deleteItem}></button>
        )}
      </div>
    </div>
  );
};

export default Item;
