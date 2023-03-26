import { initialContacts } from 'dataBase';

export const getFilterValue = state => state.filter;
export const getContacts = state => state.contacts;

export const selectTestContacts = state => {
  const contacts = getContacts(state);

  return initialContacts.filter(
    ({ id: newId }) =>
      !contacts
        .reduce((acc, { id: prevId }) => [...acc, prevId], [])
        .includes(newId)
  );
};
