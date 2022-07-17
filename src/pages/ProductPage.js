import React, {  PureComponent } from 'react';
import ReactHtmlParser from 'html-react-parser';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/Cart/CartContext';
import Attributes from './../componets/Attributes';
const getProduct = gql `
    query($id : String!){
        product(id : $id){
            id,
        	name,
        	inStock,
        	gallery,
        	description,
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
            brand
        }
    }
`;
const Hook = (Component) =>{
    return function WrappedComponent(props){
        const {id} = useParams();
        const { data , loading} = useQuery(
            getProduct, 
            { 
                variables : { id :id || 'all'}
            }
        );
        return <Component {...props} server={{ data, loading}}/>;
    }
}
class ProductPage extends PureComponent {
    constructor(){
        super();
        this.state = {
            imageIndex: 0,
            attributes : {},
            quantity: 1
        }
    }
    static contextType = CartContext;
    imageToggle(index){
        this.setState({
            imageIndex: index
        })
    }
    add(product){
        const { addItem } = this.context;
        addItem(
            product, 
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
    isAttribute(cat,attribute){
        let category = cat.replace(/ /g,"");
        for( let [key, value] of Object.entries(this.state.attributes)){
          if(key === category && value === attribute ){
            return true;
          }
        }
        return false;
    }
    static getDerivedStateFromProps(nextProps, state){
        //set initial attributes
        let attributes = {}
        if(nextProps.server.data && Object.keys(state.attributes).length === 0){ 
            if(nextProps.server.data.product){
                nextProps.server.data.product.attributes.forEach(
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
        }
        return null;
    }
    render() {
        const { data, loading} = this.props.server;
        const { priceFilter } = this.context;
        let price;
        if(data && data.product){
            price = priceFilter(data.product.prices);
        }
        return (
            <div className='page'>
                { data && data.product &&
                    <div className={data.product.inStock ? 'product-grid' : 'product-grid out'}>
                        <div className='product-gallery'>
                            { 
                                data.product.gallery.map( (image, index) =>
                                    <img 
                                        key={index}
                                        src={image}
                                        loading='lazy'
                                        onClick={() => this.imageToggle(index)}
                                        className={ this.state.imageIndex === index ? 'active' : ''}
                                        alt={'image-'+index}
                                    />
                                ) 
                            }
                        </div>
                        <div className='product-gallery-image'>
                            <img 
                                src={data.product.gallery[this.state.imageIndex]}
                                loading='lazy'
                                alt={data.product.gallery[this.state.imageIndex]}
                            />
                        </div>
                        <div className='product-details'>
                            <h2 className='brand'>{data.product.brand}</h2>
                            <h1 className='name'>{data.product.name}</h1>
                            <div>
                                {
                                    data.product.attributes.map( (attribute, key) => 
                                        <Attributes 
                                            attributes={attribute} 
                                            setAttribute={this.selectAttribute.bind(this)}  
                                            isSet={this.isAttribute.bind(this)} 
                                            key={key}
                                        />)
                                }
                            </div>
                            <div className='row'>
                                <h2>Price</h2>
                                { price && <h3>{price.currency.symbol}{price.amount}</h3>}
                            </div>
                            {
                                // data.product.inStock &&
                                <button 
                                    onClick={() => this.add(data.product)}
                                    className='button primary full'
                                >add to cart</button>
                            }
                            <div className='description'>
                                {ReactHtmlParser(data.product.description)}
                            </div>
                        </div>
                    </div>
                }
                { 
                    loading && 
                    <div className='centered-page'>
                        <h4>Fetching...</h4>
                    </div>
                }
                { 
                    data && !data.product && 
                    <div className='centered-page'>
                        <h4>Product not found</h4>
                    </div>
                }
            </div>
        )
    }
}
export default Hook(ProductPage);