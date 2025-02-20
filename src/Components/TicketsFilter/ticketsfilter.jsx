import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterTickets } from '../../Store/actions';
import './ticketsfilter.scss';

export default function TicketsFilter() {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filterTickets);

  const filterMap = {
    'Самый дешёвый': 'cheapest',
    'Самый быстрый': 'fastest',
    Оптимальный: 'optimal',
  };

  const defaultFilter = 'optimal';

  useEffect(() => {
    if (!selectedFilter) {
      dispatch(setFilterTickets(defaultFilter));
    }
  }, [dispatch, selectedFilter]);

  const handleFilterClick = (filterName) => {
    const filterKey = filterMap[filterName];
    dispatch(setFilterTickets(filterKey));
  };

  const getButtonClassName = (filterName) =>
    `filterButton ${selectedFilter === filterMap[filterName] ? 'selected' : ''}`;

  return (
    <div className="TicketsFilter">
      {Object.keys(filterMap).map((filterName) => (
        <button
          key={filterName}
          onClick={() => handleFilterClick(filterName)}
          className={getButtonClassName(filterName)}
        >
          {filterName}
        </button>
      ))}
    </div>
  );
}
