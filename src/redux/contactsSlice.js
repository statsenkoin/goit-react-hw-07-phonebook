import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
    addTestData(state, action) {
      return [...state, ...action.payload];
    },
  },
});

export const { addContact, deleteContact, addTestData } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
