import React, { PureComponent } from 'react';
import { CartContext } from '../context/Cart/CartContext';
import Attributes from './../componets/Attributes';
import caretLeft from './../Assets/CaretLeft.svg';
import caretRight from './../Assets/CaretRight.svg';

export default class CartItem2 extends PureComponent {
    constructor(){
        super();
        this.state = {
            imageIndex: 0,
        }

    }
    static contextType = CartContext;
    selectAttribute(category, attribute){
        const { setCartItemAttribute } = this.context;
        setCartItemAttribute(this.props.index, category, attribute)
    }
    isAttribute(category,attribute){
        let categoryString = category.replace(/ /g,"");
        for( let [key, value] of Object.entries(this.props.product.selectedAttributes)){
          if(key === categoryString && value === attribute ){
            return true;
          }
        }
        return false;
    }
    render() {
        const {  priceFilter, incrementItemQuantity, decrementItemQuantity } = this.context;
        let price = priceFilter(this.props.product.prices);
        return (
            <div className='mini-cart-item'>
                <div className='mini-cart-details'>
                    <h1 className='name'>{this.props.product.name}</h1>
                    <div className='row'>
                        { price && <h3>{price.currency.symbol}{price.amount}</h3>}
                    </div>
                    {
                        this.props.product.attributes.map( (attribute, key) => 
                            <Attributes 
                                attributes={attribute} 
                                setAttribute={this.selectAttribute.bind(this)}  
                                isSet={this.isAttribute.bind(this)} 
                                key={key}
                            />
                        )
                    }
                </div>
                <div className='mini-cart-controller'>
                    <div className='cart-btn'
                        onClick={()=>{incrementItemQuantity(this.props.index)}}
                    >+</div>
                    <div className='cart-btn b-0'>{this.props.product.quantity}</div>
                    <div className='cart-btn'
                        onClick={()=>{decrementItemQuantity(this.props.index)}}
                    >-</div>
                </div>
                <div className='mini-cart-image'>
                    { 
                        <img 
                            src={this.props.product.gallery[this.state.imageIndex]}
                            loading='lazy'
                            alt={'image'}
                        />
                    }
                </div>
            </div>
        )
    }
}
