import React from 'react';
import PropTypes from 'prop-types';
import { add, parseISO } from 'date-fns';
import './flight.scss';

export default function Flight({ origin, destination, date, duration, stops }) {
  const timeOfDeparture = parseISO(date).toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const arrivalTime = add(parseISO(date), {
    minutes: duration,
  }).toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const stopsLabel = (() => {
    if (stops.length === 0) {
      return 'без пересадок';
    }
    const labels = { 1: 'пересадка', default: 'пересадки' };
    return labels[stops.length] || labels.default;
  })();

  return (
    <div className="flight">
      <div className="flightInfo">
        <span className="gray-text">{`${origin} – ${destination}`}</span>
        <span>{`${timeOfDeparture} – ${arrivalTime}`}</span>
      </div>
      <div className="flightInfo">
        <span className="gray-text">В ПУТИ</span>
        <span>{`${Math.floor(duration / 60)}ч ${duration % 60}м`}</span>
      </div>
      <div className="flightInfo">
        <span className="gray-text">
          {stops.length > 0 ? `${stops.length} ${stopsLabel}` : stopsLabel}
        </span>
        <span>{stops.join(', ')}</span>
      </div>
    </div>
  );
}

Flight.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
};
