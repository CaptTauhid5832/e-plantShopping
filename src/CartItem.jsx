import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getPrice = (cost) => {
    return parseFloat(String(cost).replace('$', ''));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + getPrice(item.cost) * item.quantity;
    }, 0);
  };

  const calculateTotalCost = (item) => {
    return getPrice(item.cost) * item.quantity;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1,
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1,
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: {'$' + calculateTotalAmount()}</h2>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} className="cart-item-image" />

          <div className="cart-item-details">
            <h2>{item.name}</h2>
            <p>{item.cost}</p>

            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>

            <h3>Total: {'$' + calculateTotalCost(item)}</h3>

            <button className="delete-button" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <button className="continue-button" onClick={handleContinueShopping}>
        Continue Shopping
      </button>

      <button className="checkout-button" onClick={handleCheckoutShopping}>
        Checkout
      </button>
    </div>
  );
}

export default CartItem;
