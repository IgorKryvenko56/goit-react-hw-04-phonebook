import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormContainer,
  Button,
 } from './ContactForm.styled';

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicateName = contacts.some((contact) => contact.name === name);

    if (isDuplicateName) {
      alert('This contact name already exists in the phone book!');
    } else {
      onSubmit({ name, number });
      setName('');
      setNumber('');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        placeholder="Phone number"
        required
      />
      <Button type="submit">
        Add Contact
      </Button>
    </FormContainer>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContactForm;
