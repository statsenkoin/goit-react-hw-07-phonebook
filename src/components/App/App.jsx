import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import PropTypes from 'prop-types';
import { Filter, ContactList, FormikForm } from 'components';
import {
  Layout,
  Title,
  Notification,
  ContactsTitle,
  ContactListBox,
} from './App.styled';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Layout>
      <Title>Phonebook</Title>
      <FormikForm />
      <ContactsTitle>Contacts</ContactsTitle>
      {contacts.length ? (
        <ContactListBox>
          <Filter />
          <ContactList />
        </ContactListBox>
      ) : (
        <Notification>No any contacts in phonebook</Notification>
      )}
      {isLoading && !error && <h2>Loading...</h2>}
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
