import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilterValue } from 'redux/selectors';
import PropTypes from 'prop-types';
import { FilterWrapper, FilterInput } from './Filter.styled';

export function Filter() {
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const onFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FilterWrapper>
      Find contacts by name
      <FilterInput type="text" value={filter} onChange={onFilter} />
    </FilterWrapper>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
};
