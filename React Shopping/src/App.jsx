import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import SearchItem from './components/SearchItem';
import Cart from './components/Cart';
import { items } from './components/Data';
import Login from './components/Login';

const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <>
      <Router>
        <Navbar cart={cart} setData={setData} />
        <Routes>
          {/* Protecting routes, only accessible after login */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} />} />
              <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
              <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} />} />
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login setAuth={setAuth} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
