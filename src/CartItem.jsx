import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getNumericCost = (cost) => {
    return parseFloat(String(cost).replace('$', ''));
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + getNumericCost(item.cost) * item.quantity;
    }, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return getNumericCost(item.cost) * item.quantity;
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon - Checkout functionality will be added in the future.');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Shopping Cart
      </h2>

      <h3 style={{ color: 'black' }}>
        Total Number of Plants: {calculateTotalQuantity()}
      </h3>

      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h2>

      {cart.length === 0 && (
        <div style={{
          color: 'black',
          textAlign: 'center',
          margin: '30px'
        }}>
          <h2>Your cart is empty 🌱</h2>
          <p>Add some plants to your cart.</p>
        </div>
      )}

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>

            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">

              <div className="cart-item-name">
                {item.name}
              </div>

              <div className="cart-item-cost">
                Unit Price: {item.cost}
              </div>

              <div className="cart-item-quantity">

                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>

              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '20px',
          color: 'black'
        }}
        className="total_cart_amount"
      >
        Final Total: ${calculateTotalAmount().toFixed(2)}
      </div>

      <div className="continue_shopping_btn">

        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>

      </div>
    </div>
  );
};

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;
