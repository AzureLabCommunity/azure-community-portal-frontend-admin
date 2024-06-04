"use client"
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import "./style.css";

export default function EventForm() {
  // Status for the selected image storage (default is error image)
  const [selectedImage, setSelectedImage] = useState<string>('/community-portal-frontend-admin/public/textures/invalid-image.svg');
  const [formData, setFormData] = useState({ 
    title: '',
    description: '',
    datetime: '',
    location: '',
  }); // State for storing form data (object with empty fields)
  const isFormValid = useRef(false);  // Link to control the state of the "apply" button

  // Обработчик изменения изображения
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedImage(URL.createObjectURL(file)); // Create a URL for the selected image
  };

  // Handler for changing any form field
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData({ // We update the form state with a new value for the corresponding field
      ...formData,
      [name]: value,
    });
  };

  // The effect of updating the state of the "apply" button when the form data or selected image changes
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(Boolean); // Checking if all fields are filled in
    const hasImage = selectedImage !== '/textures/invalid_images.svg'; // Checking if the image is selected
    isFormValid.current = allFieldsFilled && hasImage; // Update the button state (active if all fields are filled in and the image is selected)
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