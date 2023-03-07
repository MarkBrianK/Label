import './App.css';
import Home from './Components/Home'
import About from './Components/About';
import Product from './Components/Products';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
