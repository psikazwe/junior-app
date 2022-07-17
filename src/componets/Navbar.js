import React, { Component, Fragment } from 'react';
import cart from './../Assets/EmptyCart-black.svg';
import chevron from './../Assets/Chevron.svg';
import logo from './../Assets/a-logo.png';
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
    this.menuToggle(false)
  }
  menuToggle(stat){
    const { cartToggle, currencyToggle, showCart, showCurrency } = this.context;
    this.setState({
      showLinks: stat,
    })
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
            <div className='logo flex alignCenter justifyCenter'>
              <Link to={'/'}><img src={logo} alt={'logo'} /></Link>
            </div>
            <div className='menu flex alignCenter'>
              <div className='menu-button' onClick={()=> {
                  this.menuToggle(!this.state.showLinks)
                  cartToggle(false);
                  currencyToggle(false);
                }}>
                <span/>
                <span/>
                <span/>
              </div>
            </div>
            <div className='flex gap alignCenter justifyRight'>
              <div 
                className={showCurrency ? 'currency-button active' : 'currency-button'}
                onClick={()=> {
                    currencyToggle(!showCurrency);
                    cartToggle(false);
                    this.menuToggle(false);
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
                  this.menuToggle(false);
                }}
              >
                <img src={cart} loading='lazy' alt='cart'/>
                <span>{quantity}</span>
              </div>
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
          className={showCart || showCurrency  ? 'backdrop active': 'backdrop'} 
          onClick={() => {
              cartToggle(false);
              currencyToggle(false);
              this.menuToggle(false);
            }
          }
        /> 
      </Fragment>

    )
  }
}
export default Hook(Navbar);