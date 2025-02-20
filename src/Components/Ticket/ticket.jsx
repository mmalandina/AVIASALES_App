import React from 'react';
import PropTypes from 'prop-types';
import Flight from '../Flight';
import './ticket.scss';

export default function Ticket({ id, price, carrier, segments }) {
  const imgUrl = `https://pics.avs.io/99/36/${carrier}.png`;
  const formattedPrice = price.toLocaleString('ru-RU');

  return (
    <div className="ticket">
      <div className="ticketHeader">
        <span>{`${formattedPrice} Р`}</span>
        <img
          src={imgUrl}
          alt={carrier}
          className="carrierLogo"
        />
      </div>
      <div className="ticketBody">
        {segments.map((segment, index) => (
          <Flight
            key={index}
            {...segment}
          />
        ))}
      </div>
    </div>
  );
}

Ticket.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      origin: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      stops: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
