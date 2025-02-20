import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarLoader from 'react-spinners/BarLoader';
import { fetchTickets } from '../../Store/actions';
import Ticket from '../Ticket';

export default function TicketsList() {
  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.tickets);
  const visibleTickets = useSelector((state) => state.visibleTickets);
  const checkboxes = useSelector((state) => state.checkboxes);
  const filterTickets = useSelector((state) => state.filterTickets);
  const loadingTickets = useSelector((state) => state.loadingTickets);

  const [localTickets, setLocalTickets] = useState([]);

  const prevTicketsCountRef = useRef(tickets.length);
  const prevFilterRef = useRef(filterTickets);
  const prevCheckboxesRef = useRef(checkboxes);

  const sortTickets = (ticketsArray, filterType) => {
    switch (filterType) {
      case 'cheapest':
        return [...ticketsArray].sort((a, b) => a.price - b.price);
      case 'fastest':
        return [...ticketsArray].sort((a, b) => {
          const durationA = a.segments.reduce(
            (acc, seg) => acc + seg.duration,
            0
          );
          const durationB = b.segments.reduce(
            (acc, seg) => acc + seg.duration,
            0
          );
          return durationA - durationB;
        });
      case 'optimal':
        return [...ticketsArray].sort((a, b) => {
          const durationA = a.segments.reduce(
            (acc, seg) => acc + seg.duration,
            0
          );
          const durationB = b.segments.reduce(
            (acc, seg) => acc + seg.duration,
            0
          );
          const scoreA = a.price / durationA;
          const scoreB = b.price / durationB;
          return scoreA - scoreB;
        });
      default:
        return ticketsArray;
    }
  };

  const filterByCheckboxes = (ticketsArray) => {
    return ticketsArray.filter((ticket) =>
      ticket.segments.every((segment) => {
        const stopCount = segment.stops.length.toString();
        const checkboxesMap = {
          0: checkboxes.noStops,
          1: checkboxes.oneStop,
          2: checkboxes.twoStops,
          3: checkboxes.threeStops,
        };
        return checkboxesMap[stopCount] ?? false;
      })
    );
  };

  useEffect(() => {
    if (
      prevFilterRef.current !== filterTickets ||
      JSON.stringify(prevCheckboxesRef.current) !== JSON.stringify(checkboxes)
    ) {
      const sorted = sortTickets(tickets, filterTickets);
      const filtered = filterByCheckboxes(sorted);
      setLocalTickets(filtered);
      prevFilterRef.current = filterTickets;
      prevCheckboxesRef.current = checkboxes;
      prevTicketsCountRef.current = tickets.length;
    } else if (tickets.length > prevTicketsCountRef.current) {
      const newTickets = tickets.slice(prevTicketsCountRef.current);
      const sortedNew = sortTickets(newTickets, filterTickets);
      const filteredNew = filterByCheckboxes(sortedNew);
      setLocalTickets((prev) => [...prev, ...filteredNew]);
      prevTicketsCountRef.current = tickets.length;
    }
  }, [tickets, filterTickets, checkboxes]);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className="ticketsList">
      {localTickets.slice(0, visibleTickets).map((ticket, index) => (
        <Ticket
          key={ticket.id ? ticket.id : index}
          {...ticket}
        />
      ))}
      {loadingTickets && (
        <BarLoader
          color="#2196F3"
          width="100%"
        />
      )}
    </div>
  );
}
