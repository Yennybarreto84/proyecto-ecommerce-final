import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { getCartItemsThunk, deleteCartItemThunk, updateCartItemThunk, cartCheckoutThunk } from '../store/slices/cart.slice';

export const Cart = ({ show, handleClose }) => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItemsThunk());
  }, []);

  const updateCart = (id, quantity) => {
    const data = {
      quantity: quantity
    }
    dispatch(updateCartItemThunk( id, data));
  }

  return (
    <Offcanvas 
    show={show} 
    onHide={handleClose}
    placement="end"
    >
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
     <ul className='cart-items'>
        {cartItems.map((item) => (
          <li key={item.id}>
            <img src={item.product.images[0].url} alt={item.product.name} />
            <div className='cart-item-info'>
              <h4>{item.product.title}</h4>
              <p>{item.product.price}</p>
              <button
              onClick={ () => updateCart(item.id, item.quantity + 1) }
              >+</button>
              <span> { item.quantity } </span>
              <button
              onClick={() => updateCart(item.id, item.quantity - 1)}
              >-</button>
              <button
              onClick={() => dispatch(deleteCartItemThunk(item.id))}
              >delete</button>
            </div>
          </li>
        ))}
        <p>Total: { 
          cartItems.reduce((acc, item) => {
            return acc + item.product.price * item.quantity
          }, 0)
        }</p>
        <button
        onClick={() => dispatch(cartCheckoutThunk())}
        >CheckOut</button>
     </ul>
    </Offcanvas.Body>
  </Offcanvas>
  )
}

export default Cart
