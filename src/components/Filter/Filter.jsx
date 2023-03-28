import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilterValue } from 'redux/selectors';
import PropTypes from 'prop-types';
import { FilterWrapper, FilterInput } from './Filter.styled';

export function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterValue);

  const onFilter = e => dispatch(setFilter(e.target.value));

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
