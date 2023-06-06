import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container, PhonebookImage } from './App.styled';
import phonebookImage from '../asset/phonebook.png';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (contact) => {
    const isDuplicateName = contacts.some((c) => c.name === contact.name);

    if (isDuplicateName) {
      alert('Этот контакт уже есть в списке!');
    } else {
      const newContact = { ...contact, id: nanoid() };
      setContacts((prevContacts) => [...prevContacts, newContact]);
      alert('Contact added successfully!');
    }
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const filterContacts = () => {
    if (filter) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return contacts;
  };

  const filteredContacts = filterContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookImage src={phonebookImage} alt="Phonebook" />
      <ContactForm contacts={filteredContacts} onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </Container>
  );
};

export default App;
