import React, { Fragment, PureComponent } from 'react';
import { gql, useQuery } from '@apollo/client';
import CurrencyList from './CurrencyList';
const getCategories = gql `
    query{
        currencies{
            label,
            symbol
        }
    }
`;
const Hook = (Component) =>{
    return function WrappedComponent(props){
        const { data } = useQuery(getCategories);
        return <Component {...props} server={{ data}}/>;
    }
}
class Currency extends PureComponent {
    constructor(){
        super();
    }
    render() {
        const { data} = this.props.server;
        return (
            <Fragment>
                { data && <CurrencyList currencies ={data.currencies} handle={this.props.handle}/>}
            </Fragment>
        )
    }
}
export default Hook(Currency);