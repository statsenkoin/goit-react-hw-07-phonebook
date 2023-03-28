// import { initialContacts } from 'dataBase';

// {
//   contacts: {
//     items: [],
//     isLoading: false,
//     error: null
//   },
//   filter: ""
// }

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilterValue = state => state.filter;

export const selectVisibleContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilterValue(state);

  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

// export const selectTestContacts = state => {
//   const contacts = getContacts(state);

//   return initialContacts.filter(
//     ({ id: newId }) =>
//       !contacts
//         .reduce((acc, { id: prevId }) => [...acc, prevId], [])
//         .includes(newId)
//   );
// };
