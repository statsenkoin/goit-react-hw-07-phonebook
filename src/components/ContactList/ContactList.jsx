import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilterValue } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import {
  ContactListWrapper,
  ListItem,
  DeleteButton,
} from './ContactList.styled';

export function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

  const filterContactsByName = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = filterContactsByName();

  const dispatch = useDispatch();

  const onClick = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ContactListWrapper>
      {visibleContacts.map(({ id, name, number }) => {
        return (
          <ListItem key={id}>
            <span>{name}</span>
            <span>{number}</span>
            <DeleteButton type="button" onClick={() => onClick(id)}>
              Delete
            </DeleteButton>
          </ListItem>
        );
      })}
    </ContactListWrapper>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
