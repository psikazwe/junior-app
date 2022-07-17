import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../componets/CartItem';
import { CartContext } from '../context/Cart/CartContext';

export default class Cart extends PureComponent {
    static contextType = CartContext;
    render() {
        const { products, removeItem , currency, priceFilter} = this.context;
        let Total = 0;
        let rate = 0.21;
        let quantity = 0;
        if(products){
            products.forEach(product => {
                let price = priceFilter(product.prices);
                Total = Total + (price.amount * product.quantity);
                quantity = quantity + product.quantity;
            });
        }
        return (
            <div className='page'>
                <h1 className='page-title'>Cart</h1>
                { 
                    products.length > 0 && products.map((item , index) =>
                        <CartItem 
                            key={index} 
                            index = {index}
                            product={item} 
                            remove ={removeItem}
                        />
                    )
                }
                { products.length <= 0 && <p className='empty'>Cart is empty!</p>}
                <hr/>
                <div className='row label'>
                    <span>Tax {rate * 100}%: </span>
                    <h4>{ currency && currency.symbol } { (Total * rate).toFixed(2)}</h4>
                </div>
                <div className='row label'>
                    <span>Quantity: <strong></strong></span>
                    <h4>{ quantity }</h4>
                </div>
                <div className='row label'>
                    <span>Total: </span>
                    <h4>{ currency && currency.symbol } { Total.toFixed(2) }</h4>
                </div>
                <div className='row'>
                    <Link to={'/checkout'}><button className='button primary'>order</button></Link>
                </div>
                
            </div>
        )
    }
}
