import { HashRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import NavBar from './components/NavBar';
import Home from './pages/Home'
import ProductsDetail from './pages/ProductsDetail'
import Loader from './components/Loader';
import Login from './pages/Login';
import Purchases from './pages/Purchases';
import Cart from './components/Cart';
import Protect from './components/Protect';
import './App.css';

function App() {


  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
     {
      isLoading && <Loader/>
    }
    
    <HashRouter>
      <div className="App" >
      
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

          <Route element={<Protect />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>

        </Routes>
      </div>
    </HashRouter>
    
    </>
  )
}

export default App
