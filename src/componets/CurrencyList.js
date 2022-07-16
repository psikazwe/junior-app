import React, { Component } from 'react';
import { CartContext } from '../context/Cart/CartContext';

export default class CurrencyList extends Component {
    constructor(){
        super();
        this.state= {
            index: 0,
        }
    }
    static contextType = CartContext;  
    componentDidMount(){
        const {  setCurrency } = this.context;
        setCurrency(this.props.currencies[0])
    }
    render() {
        const {  setCurrency } = this.context;
        return (
            <div className='currency-container'>
                { 
                    this.props.currencies.map( (currency, index) => 
                        <div 
                            className={ index === this.state.index ? 'currency active' : 'currency'}
                            key={index}
                            onClick={ () => {
                                this.props.handle(false)
                                setCurrency(currency);
                                this.setState({
                                    index: index
                                })
                            }}
                        >
                            <p>{currency.symbol}</p>
                            <p>{currency.label}</p>
                        </div>
                    )
                }
            </div>
        )
    }
}
