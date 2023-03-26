import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import * as Yup from 'yup';
import 'yup-phone-lite';
import {
  FormWrapper,
  Label,
  AddContactButton,
  ErrorText,
} from './FormikForm.styled';

const SubmitSchema = Yup.object().shape({
  name: Yup.string().required('Enter contact name'),
  number: Yup.string().phone('UA').required('Enter phone number'),
});

export function FormikForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = newContact => {
    const { name: newName } = newContact;
    let isContactExists = contacts.some(({ name }) => name === newName);
    if (isContactExists) {
      return alert(`${newName} is already in contacts!`);
    }
    dispatch(addContact(newContact));
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={SubmitSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit({
            ...values,
            id: nanoid(8),
          });
          resetForm();
        }}
      >
        <FormWrapper>
          <Label htmlFor="name">
            Name:
            <Field type="text" name="name" />
          </Label>
          <ErrorText name="name" component="span"></ErrorText>
          <Label htmlFor="number">
            Number:
            <Field type="tel" name="number" />
          </Label>
          <ErrorText name="number" component="span"></ErrorText>
          <AddContactButton type="submit">Add contact</AddContactButton>
        </FormWrapper>
      </Formik>
    </div>
  );
}

FormikForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
