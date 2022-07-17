import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import './style/navbar.css';
import './style/products.css';
import './style/cart.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import { BrowserRouter as Router } from 'react-router-dom';
import CartProvider from './context/Cart/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
const httpLink = new HttpLink({
  uri: "http://localhost:4000/"
});
const errorLink = onError(({ networkError }) => {
  if (networkError) {
    root.render(
      <div className='centered-page'>
          <h4>Server failed to connect.</h4>
      </div>
    );
  };
});
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>      
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
