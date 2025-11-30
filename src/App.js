import Header from './components/header/Header';
import Hero from './hero/Hero';
import Footer from './components/footer/Footer';
import Modal from './components/modal/Modal';
import {useState} from 'react';
import News from './components/news/News';
import Card from './components/card/Card';
import Pictures from './components/pictures/PIctures';
import './App.css';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [userData, setUserData] = useState(null);

  const openModal = () =>{
    //  setIsModalOpen(true);
    setIsModalOpen(true);
    console.log("Відкрито модальне вікно");
    console.log(isModalOpen);
  }
  const closeModal = () => {
    setIsModalOpen(false)
    console.log("Закрито модальне вікно");
  };

  // const handleSignUp = (userData) => {
  //   setUserData(userData);
  //   console.log(userData); // відправка на бекенд
  // };
  return (
    <div className="App">
      <Header openModal={openModal} />
      {setIsModalOpen && (
      <Modal closeModal={closeModal}  />
      )}
      <Hero/>
      <Card/>
      <News/>
      <Pictures/>
      <Footer/>
    </div>
  );
}

export default App;
