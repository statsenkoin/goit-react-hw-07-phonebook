import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, selectTestContacts } from 'redux/selectors';
import { addTestData } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
// import { initialContacts } from 'dataBase';
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
  const testContacts = useSelector(selectTestContacts);
  const dispatch = useDispatch();

  const addTestContacts = () => dispatch(addTestData(testContacts));

  return (
    <Layout>
      <button type="button" onClick={addTestContacts}>
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
