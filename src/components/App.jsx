import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    api.getUserInfoServer()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(currentCard) {
    setSelectedCard(currentCard);
  }

  function handleCardLike(currentCard) {
    const isLiked = [...currentCard.likes].some(i => i._id === currentUser._id);
    api.toogleLikeServer(currentCard._id, isLiked)
      .then((newCard) => setCards((state) => state.map((c) => c._id === currentCard._id ? newCard : c)))
      .catch((err) => console.log(err))
  }

  function handleCardDelete(currentCard) {
    api.deleteCardServer(currentCard._id)
      .then(() => setCards((state) => state.filter((item) => item._id !== currentCard._id)))
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(dataUser) {
    api.sendUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.sendAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(dataCard) {
    api.addNewCardServer(dataCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  const popupOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard
  useEffect(() => {
    function closePopupEscButton(e) { if(e.key === 'Escape') { closeAllPopups() }};
    function handleClickOverlay (e) { if(e.target.classList.contains('popup_opened')) { closeAllPopups()}};

    if(popupOpen) {
      document.addEventListener('keydown', closePopupEscButton);
      document.addEventListener('mousedown', handleClickOverlay);
      return () => {
        document.removeEventListener('keydown', closePopupEscButton);
        document.removeEventListener('mousedown', handleClickOverlay);
      }
    }
  }, [popupOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            name='remove-card'
            title='Вы уверены?'
            buttonText='Да'
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
