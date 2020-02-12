import React from 'react';
import ContactItem from '../contacts/ContactItem';
import '../../style/contacts.scss';
import TextInput from '../inputs/TextInput';

const array = [1, 2, 3, 4, 5];

export default () => (
  <div id="contactsContainer">
    <TextInput placeholder="Buscar un contacto" />
    {array.map((key, index) => (
      <ContactItem key={`key${index}`} />
    ))}
  </div>
);
