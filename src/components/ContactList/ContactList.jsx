import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import PropTypes from 'prop-types';
import {
  ContactListWrapper,
  ListItem,
  DeleteButton,
} from './ContactList.styled';

export function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);

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
