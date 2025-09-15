import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
 function Cart() {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url } = useContext(StoreContext);
  const navigate= useNavigate();
  return (
    <div className='cart' id='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if ((cartItems[item._id]||0) > 0) {
            return (
              <>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p> {item.name} </p>
                  <p> ${item.price} </p>
                  <p> {cartItems[item._id]||0} </p>
                  <p> ${item.price * cartItems[item._id]||0} </p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>X</p>
                </div>
                <hr className='hr' />
              </>

            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p> ${getTotalCartAmount()} </p>
            </div> <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p> ${getTotalCartAmount()===0?0:2}</p>
            </div> <hr />
            <div className="cart-total-details">
              <b>Total:</b>
              <b>$ {getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div> <hr />
          </div>
          <button type='submit' onClick={()=>navigate('/order')}>PROCESS TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promocode' />
              <button>Submite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
