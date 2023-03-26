import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addTestData } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import { initialContacts } from 'dataBase';
import { Filter, ContactList, FormikForm } from 'components';
import {
  Layout,
  Title,
  Notification,
  ContactsTitle,
  ContactListBox,
} from './App.styled';

export function App() {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();
  const addTestContactsList = () => {
    /**
     * initialContacts as test data may be added several times
     * It checks items and prevents adding if some of initialContacts
     * are in contacts
     */
    const newTestContactsList = initialContacts.filter(
      ({ id: newId }) =>
        !contacts
          .reduce((acc, { id: prevId }) => [...acc, prevId], [])
          .includes(newId)
    );
    dispatch(addTestData(newTestContactsList));
  };

  return (
    <Layout>
      <button type="button" onClick={addTestContactsList}>
        Add test data
      </button>
      <Title>Phonebook</Title>
      <FormikForm></FormikForm>
      <ContactsTitle>Contacts</ContactsTitle>
      {contacts.length ? (
        <ContactListBox>
          <Filter />
          <ContactList />
        </ContactListBox>
      ) : (
        <Notification>No any contacts in phonebook</Notification>
      )}
    </Layout>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
