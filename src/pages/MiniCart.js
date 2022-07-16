import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CartItem2 from '../componets/CartItem2';
import { CartContext } from '../context/Cart/CartContext'

export default class MiniCart extends Component {
  static contextType = CartContext;
  render() {
    const { cartToggle, products, currency, priceFilter } = this.context;
    let quantity = 0;
    let Total = 0;
    products.forEach(product => {
      let price = priceFilter(product.prices);
      quantity = quantity + product.quantity;
      Total = Total + (price.amount * product.quantity);
    });
    return (
      <div className='mini-cart'>
        <div className='row header'>
          <p><strong>My Bag, </strong>{quantity} items</p>
        </div>
        { products.length <= 0 && <p className='empty'>Cart is empty!</p>}
        { 
          products.length > 0 && products.map((item , index) =>
              <CartItem2 
                  key={index} 
                  index = {index}
                  product={item} 
              />
          )
        }
        <div className='row'>
          <div className='flex spacer'>
            <h4>Total</h4>
            <h4>{currency && currency.symbol} {Total.toFixed(2)}</h4>
          </div>
        </div>
        <div className='flex gap'>
            <Link to={'/cart'} 
                className='button secondary'
                onClick={() => cartToggle(false)}
            >View Bag</Link>
            <Link to={'/checkout'} 
                className='button primary'
                onClick={() => cartToggle(false)}
            >Checkout</Link>
        </div>
      </div>
    )
  }
}
