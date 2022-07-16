import React, { useReducer } from 'react'
import { CartContext } from './CartContext'
import { CartReducer } from './CartReducer'

function CartProvider({children}) {
    let initialState= {
        products: [],
        showCart: false,
        showCurrency: false,
        currency: null
    };
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const removeItem = (itemIndex) =>{
        let items = state.products;
        items = items.filter ((i, index) => itemIndex !== index)
        dispatch({type : 'modify', payload: items })
    }
    const addItem = (item, attributes, quantity) =>{
        let items = state.products;
        item = {...item, selectedAttributes : attributes};
        //check if item with the same attribute was selected
        let found = false;
        items.forEach( (element,index) => {
            let { quantity, selectedAttributes, id } = element;
            delete element.quantity;
            if(id === item.id && JSON.stringify(selectedAttributes) === JSON.stringify(attributes)){
                found = true;
                quantity++;
            }
            element = {...element, quantity, selectedAttributes};
            items[index] = element;
        });
        if(!found){
            item = {...item, quantity};
            let newItem = [];
            newItem.push(item);
            let newList = items.concat(newItem);
            dispatch({type : 'modify', payload: newList })            
        }
        else{
            dispatch({type : 'modify', payload: items })   
        }
    }
    const currencyToggle=(stat)=>{
        dispatch({type: 'toggleCurrency', payload: stat})
    }
    const cartToggle = (stat) => {
        dispatch({type: 'toggleCart', payload: stat})
    }
    const setCurrency = (currency) => {
        dispatch({type: 'setCurrency', payload: currency})
    }
    const priceFilter=(prices)=>{
        if(state.currency){
          let price = prices.filter( 
              price => price.currency.label === state.currency.label
            );
          return price[0]     
        }
        return prices[0]
    }
    const setCartItemAttribute=(index, category, attribute)=>{
        let categoryString = category.replace(/ /g,"");
        let attributes = state.products[index].selectedAttributes;
        for( let [key] of Object.entries(attributes)){
          if(key === categoryString ){
            //attribute already present. change the value
            attributes = { ...attributes, [key] : attribute}
          }
        }
        
        let items = state.products;
        let item = items[index];
        item = {...item, selectedAttributes : attributes};
        items[index] = item;
        dispatch({type : 'modify', payload: items })  
    }
    const incrementItemQuantity=(index)=>{
        let items = state.products;
        let item = items[index];
        const { quantity } = item;
        item = {...item, quantity : quantity + 1};
        items[index] = item;
        dispatch({type : 'modify', payload: items })  
    }
    const decrementItemQuantity=(index)=>{
        let items = state.products;
        let item = items[index];
        const { quantity } = item;
        if(quantity === 1){
            removeItem(index)
        }
        else{
            item = {...item, quantity : quantity - 1};
            items[index] = item;
            dispatch({type : 'modify', payload: items })
        }
    }
    const checkout = () =>{
        dispatch({type : 'modify', payload: [] }) 
    }
    return (
        <CartContext.Provider value={{
            products : state.products,
            removeItem,
            addItem,
            showCart: state.showCart,
            cartToggle,
            currency: state.currency,
            setCurrency,
            showCurrency: state.showCurrency,
            currencyToggle,
            priceFilter,
            setCartItemAttribute,
            incrementItemQuantity,
            decrementItemQuantity,
            checkout
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider