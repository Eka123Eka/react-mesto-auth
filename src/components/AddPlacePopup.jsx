import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    nameRef.current.value = ''
    linkRef.current.value = ''
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm name='add-photo' title='Новое место' isOpen={isOpen}
      onClose={onClose} onSubmit={handleSubmit} buttonText='Добавить'>
      <label className="popup__label">
        <input className="popup__input-field" name="place-input" type="text" placeholder="Назовите место"
          minLength="2" maxLength="30" ref={nameRef} required />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__input-field" name="urlImage-input" type="url"
          placeholder="Вставьте ссылку на фото места" ref={linkRef} required />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
