import React, { Component, Fragment } from 'react';
import cart from './../Assets/EmptyCart-black.svg';
import chevron from './../Assets/Chevron.svg';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { CartContext } from './../context/Cart/CartContext';
import MiniCart from '../pages/MiniCart';
import Currency from './Currency';
const getCategories = gql `
    query{
        categories{name}
    }
`;
const Hook = (Component) =>{
    return function WrappedComponent(props){
        const { data  } = useQuery(getCategories);
        return <Component {...props} server={{ data }}/>;
    }
}
class Navbar extends Component {
  constructor(){
    super();
    this.state ={
      index : 0,
      showCurrency: false,
      showLinks: false
    }
  }
  static contextType = CartContext;
  handleToggle(category){
    const { currencyToggle, cartToggle} = this.context;
    this.setState({
      index: category,
    })
    currencyToggle(false);
    cartToggle(false);
  }
  menuToggle(){
    const { cartToggle, currencyToggle } = this.context;
    this.setState({
      showLinks: !this.state.showLinks,
    })
    cartToggle(false);
    currencyToggle(false);
  }
  render() {
    const { data } = this.props.server;
    const { products, showCart, cartToggle, currency, showCurrency, currencyToggle } = this.context;
    let quantity = 0;
    if( products ){
      products.forEach(item => {
        quantity += item.quantity
      });
    }
    return (
      <Fragment>
        <header>
          <nav>
            <div className='menu'>
              <div className='menu-button' onClick={()=> this.menuToggle()}>
                <span/>
                <span/>
                <span/>
              </div>
            </div>
            <div className={this.state.showLinks ? 'links' : 'links hide'}>
                {data && data.categories.map( (link, index) => 
                    <Link 
                        to={'/products/'+link.name}
                        key={index}
                        className={ this.state.index === index ? 'active' : ''}
                        onClick={() => {
                          this.handleToggle(index);
                        }}
                    >
                        {link.name}
                    </Link>)
                }
            </div>
            <div 
              className={showCurrency ? 'currency-button active' : 'currency-button'}
              onClick={()=> {
                  currencyToggle(!showCurrency);
                  cartToggle(false);
                }
              }
            >
              { currency && currency.symbol }
              <img src={chevron} loading='lazy' alt='arrow'/>
            </div>
            <div 
              className='cart-button'
              onClick={() => {
                cartToggle(!showCart);
                currencyToggle(false);
              }}
            >
              <img src={cart} loading='lazy' alt='cart'/>
              <span>{quantity}</span>
            </div>
          </nav>        
        </header>
        <div className={showCurrency ? 'modal active' : 'modal'}>
          <Currency handle={currencyToggle}/>
        </div>
        <div className={showCart ? 'modal active' : 'modal'}>
          <MiniCart />
        </div>
        <div 
          className={showCart || showCurrency || this.state.showLinks ? 'backdrop active': 'backdrop'} 
          onClick={() => {
              cartToggle(false);
              currencyToggle(false);
              this.handleCurrency(false);
            }
          }
        /> 
      </Fragment>

    )
  }
}
export default Hook(Navbar);