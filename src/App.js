import React, { Fragment, PureComponent } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './componets/Navbar';
import Cart from './pages/Cart'
import CategoryPage from './pages/CategoryPage'
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
        </Routes>
      </Fragment>
    )
  }
}
