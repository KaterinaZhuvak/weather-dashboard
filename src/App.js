import Header from './components/header/Header';
import Hero from './hero/Hero';
import Footer from './components/footer/Footer';
import Modal from './components/modal/Modal';
import {useState, useEffect} from 'react';
import News from './components/news/News';
import Card from './components/card/Card';
import SavedCities from './components/recents/SavedCities';
import Pictures from './components/pictures/PIctures';
import './App.css';


function App() {
  //Modal functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSignUp = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    closeModal();
  };

  const signOut = () => {
    const confirmLogout = window.confirm("Do you want to sign out?");

    if (confirmLogout) {
      localStorage.removeItem("user");
      setCurrentUser(null);
    }
  };
  //Card functionality
  const [searchCity, setSearchCity] = useState(""); 
  const [savedCards, setSavedCards] = useState([]);

  // Load user and liked cities from storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const liked = JSON.parse(localStorage.getItem("likedCities")) || [];
    
    if (user) setCurrentUser(user);
    setSavedCards(liked);
  }, []);

  const handleWeatherSearch = (cityName) => {
    setSearchCity(cityName);
  };

  const handleLike = (weatherData) => {
    const updated = [...savedCards, weatherData];
    setSavedCards(updated);
    localStorage.setItem("likedCities", JSON.stringify(updated));
  };
  const handleDelete = (cityName) => {
  const updated = savedCards.filter(card => card.name !== cityName);
  setSavedCards(updated);
  localStorage.setItem("likedCities", JSON.stringify(updated));
};

  return (
    <div className="App">
      <Header openModal={openModal} user={currentUser} onSignOut={signOut}/>
      {isModalOpen && (
        <Modal closeModal={closeModal} onSignUp={handleSignUp} />
      )}
      <Hero onSearch={handleWeatherSearch} />
      
   
  {searchCity && (
  <Card 
    cityName={searchCity} 
    onLike={handleLike} 
    user={currentUser}
  />
)}

{/* Рендерим блок избранного */}
<SavedCities saved={savedCards} user={currentUser} onDelete={handleDelete} />
   
      
      <News/>
      <Pictures/>
      <Footer/> 
    </div>
  );
}

export default App;
