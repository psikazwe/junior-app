import React, { PureComponent } from 'react';
import {useParams} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Product from '../componets/Product';
import { CartContext } from '../context/Cart/CartContext';

const getProducts = gql `
    query($category : String!){
        category(input: { title :$category}){
          name,
          products{ 
            id, 
            name, 
            brand,
            inStock,
            gallery,
            prices{
                  amount,
                  currency{
                    label,
                    symbol
                  }
            },
            attributes{
                id,
                name,
                type,
                items{
                    id,
                    displayValue,
                    value
                }
            },
          }
        }
    }
`;
const Hook = (Component) =>{
    return function WrappedComponent(props){
        const {category} = useParams();
        const { data } = useQuery(
            getProducts, 
            { 
              variables : { category :category || 'all'}
            }
        );
        return <Component {...props} server={{ data }}/>;
    }
}
class CategoryPage extends PureComponent {
  static contextType = CartContext;
  render() {
    const { data } = this.props.server;
    const { addItem } = this.context;
    return (
      <div className='page'>
        { data && <div> 
            <h1 className='page-title'>{data.category.name}</h1>
            <div className='products'>
              {
                data.category.products.map(
                  (product, index) => 
                  <Product 
                    key={index} 
                    product = { product }
                    add = { addItem }
                  />)
              }
            </div>
          </div>
        }
      </div>
    )
  }
}
export default Hook(CategoryPage);