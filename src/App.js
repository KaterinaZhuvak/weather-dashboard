import Header from './components/header/Header';
import Hero from './hero/Hero';
import Footer from './components/footer/Footer';
import Modal from './components/modal/Modal';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Modal/>
      <Hero/>
      <Footer/>
    </div>
  );
}

export default App;
