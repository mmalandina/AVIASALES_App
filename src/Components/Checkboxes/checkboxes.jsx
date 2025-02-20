import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckboxes } from '../../Store/actions';
import './checkboxes.scss';

export default function Checkboxes() {
  const dispatch = useDispatch();
  const checkboxes = useSelector((state) => state.checkboxes);

  const checkboxItems = [
    { name: 'all', label: 'Все', value: 'all' },
    { name: 'noStops', label: 'Без пересадок', value: '0' },
    { name: 'oneStop', label: '1 пересадка', value: '1' },
    { name: 'twoStops', label: '2 пересадки', value: '2' },
    { name: 'threeStops', label: '3 пересадки', value: '3' },
  ];

  const handleCheckboxChange = (name) => {
    dispatch(toggleCheckboxes(name));
  };

  return (
    <div className="checkboxes">
      <h3 className="checkboxesTitle">Количество пересадок</h3>
      {checkboxItems.map(({ name, label }) => (
        <label
          key={name}
          className="checkboxItem"
        >
          <input
            type="checkbox"
            checked={checkboxes[name]}
            onChange={() => handleCheckboxChange(name)}
            className="filterItemInput"
          />
          {label}
        </label>
      ))}
    </div>
  );
}
