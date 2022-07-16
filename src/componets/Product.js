import React, { PureComponent } from 'react';
import { CartContext } from '../context/Cart/CartContext';
import cart from './../Assets/EmptyCart.svg'
import { Link } from 'react-router-dom';
export default class Product extends PureComponent {
  constructor(){
    super();
    this.state = {
      price: null,
      attributes : {},
      quantity: 1
    }
  }
  static contextType = CartContext;
  add=()=>{
    this.props.add(
      this.props.product, 
      this.state.attributes, 
      this.state.quantity
    );
  }
  selectAttribute(cat, attribute){
    let category = cat.replace(/ /g,"");
    let isSet = false;
    for( let [key] of Object.entries(this.state.attributes)){
      if(key === category ){
        isSet = true;
        //attribute already present. change the value
        let attributeCopy = this.state.attributes;
        attributeCopy = { ...attributeCopy, [key] : attribute}
        this.setState({
          attributes : attributeCopy,
          product: this.props.server.data
        });
      }
    }
    //if attribute is not set
    if(!isSet){
      let newAttribute = {
        [category] : attribute
      }
      let attributeSet = Object.assign(this.state.attributes, newAttribute);
      this.setState({
        attributes: attributeSet
      })
    }
  }
  static getDerivedStateFromProps(nextProps, state){
    //set initial attributes
    let attributes = {}
    if(Object.keys(state.attributes).length === 0){ 
        nextProps.product.attributes.forEach(
            attr => {
              let category = attr.id.replace(/ /g,"");
              let newAttribute = {
                  [category] : attr.items[0].id
              }
              attributes = Object.assign(newAttribute, attributes);
            }
        ); 
        return{
          attributes
        }        
    }
    return null;
  }
  render() {
    const {  currency, priceFilter } = this.context;
    let price = priceFilter(this.props.product.prices);
    return (
        <div className={ 
          this.props.product.inStock ?  
            'product-container' 
          :
            'product-container disabled'
          }
        >
            <Link to={'/product/'+ this.props.product.id}>
                <div className='product-cover'>
                  <img 
                    src={this.props.product.gallery[0]} 
                    alt={'image'} 
                    loading='lazy'
                  />
                </div>
                <h3 className='product-name'>{this.props.product.name}</h3>
                {
                  currency && 
                    <h3 className='product-price'>
                      {price.currency.symbol}
                      {price.amount}
                    </h3>
                }
            </Link>
            { 
              this.props.product.inStock && 
              <div 
                className='product-hover-cart-button'
                onClick={this.add}
              >
                <img src={cart} alt={cart}/>
              </div>
            }
        </div>
    )
  }
}
