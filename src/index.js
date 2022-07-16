import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import './style/navbar.css';
import './style/products.css';
import './style/cart.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import CartProvider from './context/Cart/CartProvider';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
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
