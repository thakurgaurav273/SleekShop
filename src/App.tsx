import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import useSleekStore from './store/Store'
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';

function App() {
  const user = useSleekStore((state) => state.user);
  const protectedRoutes = () => {
    return (
      <Routes>
        <Route path='/cart' element={<Cart />} />
      </Routes>
    )
  }
  const publicRoute = () => {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />        
        <Route path='/' element={<Home />} />
      </Routes>
    )
  }
  return (
    <BrowserRouter>
      {user ? protectedRoutes() : publicRoute()}
    </BrowserRouter>
  )
}

export default App
