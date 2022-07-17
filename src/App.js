import React, { Fragment, PureComponent } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './componets/Navbar';
import Cart from './pages/Cart'
import CategoryPage from './pages/CategoryPage'
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Navigate to={'/products'} replace/> }/>
          <Route path='/products' element={ <CategoryPage /> }/>
          <Route path='/products/:category' element={ <CategoryPage /> }/>
          <Route path='/product/:id' element={ <ProductPage /> }/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={ <Navigate to={'/products'} replace/>}/>
        </Routes>
      </Fragment>
    )
  }
}
