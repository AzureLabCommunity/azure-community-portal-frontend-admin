"use client"
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import "./style.css";

export default function EventForm() {
  // Состояние для хранилища выбранного изображения (по умолчанию - изображение ошибки)
  const [selectedImage, setSelectedImage] = useState<string>('/community-portal-frontend-admin/public/textures/invalid-image.svg');
  const [formData, setFormData] = useState({ 
    title: '',
    description: '',
    datetime: '',
    location: '',
  }); // Состояние для хранения данных формы (объект с пустыми полями)
  const isFormValid = useRef(false);  // Ссылка для управления состоянием кнопки "apply"

  // Обработчик изменения изображения
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedImage(URL.createObjectURL(file)); // Создаем URL для выбранного изображения
  };

  // Обработчик изменения любого поля формы
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData({ // Обновляем состояние формы с новым значением для соответствующего поля
      ...formData,
      [name]: value,
    });
  };

  // Эффект обновления состояния кнопки "apply" при изменении данных формы или выбранного изображения
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(Boolean); // Проверяем заполнены ли все поля
    const hasImage = selectedImage !== '/textures/invalid_images.svg'; // Проверяем выбрано ли изображение
    isFormValid.current = allFieldsFilled && hasImage; // Обновляем состояние кнопки (активна, если все поля заполнены и изображение выбрано)
  }, [formData, selectedImage]);
  
  return (
    <>
      <h1>New Event</h1>
      <form className="forms form-option">
        <section className='top'>
          <section className="left">
            <div className="for-input">
              <span>Topic</span>
              <input
                className="inputs"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange} />
              <span className="validation"></span>
            </div>
            <div className="for-input">
              <span>Date/Time</span>
              <input
                className="inputs"
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                onChange={handleInputChange} />
              <span className="validation"></span>
            </div>
            <div className="for-input">
              <span>Tags</span>
              <input
                className="inputs"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange} />
              <span className="validation"></span>
            </div>
            <div className="for-input second">
              <span>Preview</span>
              <textarea
                className="inputs sec-input"
                name="description"
                value={formData.description}
                onChange={handleInputChange} />
              <span className="validation"></span>
            </div>
          </section>
          <section className="right">
            <img src={selectedImage} alt="Selected"/>
            <span className="validation"></span>
            <label className="file-buttons file-button">
              Add a picture +
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleImageChange} />
            </label>
          </section>
        </section>
        <button className='buttons' disabled={!isFormValid.current}>Publish</button>
      </form>
    </>
  );
}