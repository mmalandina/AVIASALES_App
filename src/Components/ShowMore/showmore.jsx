import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMoreTickets } from '../../Store/actions';
import './showmore.scss';

export default function ShowMore() {
  const dispatch = useDispatch();
  const loadingTickets = useSelector((state) => state.loadingTickets);
  const checkboxes = useSelector((state) => state.checkboxes);
  const areAllCheckboxesFalse = Object.values(checkboxes).every(
    (value) => !value
  );

  const handleShowMoreClick = () => {
    dispatch(showMoreTickets());
  };

  if (loadingTickets || areAllCheckboxesFalse) {
    return null;
  }

  return (
    <button
      onClick={handleShowMoreClick}
      className="showMoreButton"
    >
      ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
    </button>
  );
}
