import { initialContacts } from 'dataBase';

export const getFilterValue = state => state.filter;
export const getContacts = state => state.contacts;

export const selectVisibleContacts = state => {
  const contacts = getContacts(state);
  const filter = getFilterValue(state);

  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

export const selectTestContacts = state => {
  const contacts = getContacts(state);

  return initialContacts.filter(
    ({ id: newId }) =>
      !contacts
        .reduce((acc, { id: prevId }) => [...acc, prevId], [])
        .includes(newId)
  );
};
