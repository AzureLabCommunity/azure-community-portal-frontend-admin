"use client";
import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./style.css";

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  datetime: Yup.string().required('Required'),
  location: Yup.string().required('Required')
});

export default function EventForm() {
  const [selectedImage, setSelectedImage] = useState<string>('/textures/invalid-image.svg');
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };
  
  return (
    <>
      <h1>New Event</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          datetime: '',
          location: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form data', values);
          console.log('Selected image', selectedImage);
        }} >
        {({ isValid }) => (
          <Form className="forms form-option">
            <section className="top">
              <section className="left">
                <div className="for-input">
                  <span>Topic</span>
                  <Field className="inputs" type="text" name="title" />
                  <ErrorMessage name="title" component="span" className="validation" />
                </div>
                <div className="for-input">
                  <span>Date/Time</span>
                  <Field className="inputs" type="datetime-local" name="datetime" />
                  <ErrorMessage name="datetime" component="span" className="validation" />
                </div>
                <div className="for-input">
                  <span>Tags</span>
                  <Field className="inputs" type="text" name="location" />
                  <ErrorMessage name="location" component="span" className="validation" />
                </div>
                <div className="for-input second">
                  <span>Preview</span>
                  <Field className="inputs sec-input" as="textarea" name="description" />
                  <ErrorMessage name="description" component="span" className="validation" />
                </div>
              </section>
              <section className="right">
                <div className="image-container">
                  <Image className='image' src={selectedImage} alt="Selected" layout="fill" objectFit="contain" />
                </div>
                <span className="validation"></span>
                <label className="file-buttons file-button">
                  Add a picture +
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
              </section>
            </section>
            <button className='buttons' type="submit" disabled={!isValid}>
              <Image src="/textures/exit-white.svg" alt="Publish" width={16} height={16} />
              Publish
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}