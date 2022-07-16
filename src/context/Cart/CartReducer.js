export const CartReducer = ( state, action) => {
    switch(action.type){
        case 'modify': return {...state, products: action.payload};
        case 'toggleCart' : return {...state, showCart : action.payload};
        case 'toggleCurrency' : return {...state, showCurrency : action.payload};
        case 'setCurrency' : return {...state, currency : action.payload};
        default: return state;
    }
}