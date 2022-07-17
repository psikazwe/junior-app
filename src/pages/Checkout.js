import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/Cart/CartContext'

export default class Checkout extends PureComponent {
    static contextType = CartContext;
  render() {
    const { checkout } = this.context;
    return (
      <div className='centered-page'>
        <Link to={'/'}>
            <button className='button primary full'
                onClick={()=> checkout()}
            >Confirm checkout</button>
        </Link>
      </div>
    )
  }
}
