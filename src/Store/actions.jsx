import Api from '../API/api';

export const SET_SEARCH_ID = 'SET_SEARCH_ID';
export const GET_TICKETS_SUCCESS = 'GET_TICKETS_SUCCESS';
export const GET_TICKETS_FAILURE = 'GET_TICKETS_FAILURE';
export const SHOW_MORE_TICKETS = 'SHOW_MORE_TICKETS';
export const TOGGLE_CHECKBOXES = 'TOGGLE_CHECKBOXES';
export const SET_FILTER_TICKETS = 'SET_FILTER_TICKETS';
export const START_LOADING_TICKETS = 'START_LOADING_TICKETS';
export const FINISH_LOADING_TICKETS = 'FINISH_LOADING_TICKETS';
export const SET_ALL_TICKETS_LOADED = 'SET_ALL_TICKETS_LOADED';

export const setSearchId = (searchId) => ({
  type: SET_SEARCH_ID,
  payload: searchId,
});

export const getTicketsSuccess = (tickets) => ({
  type: GET_TICKETS_SUCCESS,
  payload: tickets,
});

export const getTicketsFailure = (error) => ({
  type: GET_TICKETS_FAILURE,
  payload: error,
});

export const showMoreTickets = () => ({
  type: SHOW_MORE_TICKETS,
});

export const toggleCheckboxes = (name) => ({
  type: TOGGLE_CHECKBOXES,
  payload: name,
});

export const setFilterTickets = (filterType) => ({
  type: SET_FILTER_TICKETS,
  payload: filterType,
});

export const startLoadingTickets = () => ({
  type: START_LOADING_TICKETS,
});

export const finishLoadingTickets = () => ({
  type: FINISH_LOADING_TICKETS,
});

export const setAllTicketsLoaded = () => ({
  type: SET_ALL_TICKETS_LOADED,
});

export const fetchTickets = () => async (dispatch) => {
  const api = new Api();
  try {
    dispatch(startLoadingTickets());
    const searchId = await api.getSearchId();
    dispatch(setSearchId(searchId));

    let stop = false;
    while (!stop) {
      try {
        const data = await api.getTickets(searchId);
        dispatch(getTicketsSuccess(data.tickets));
        stop = data.stop;
      } catch (error) {
        dispatch(getTicketsFailure(error.message));
        break;
      }
    }
    if (stop) {
      dispatch(setAllTicketsLoaded());
    }
    dispatch(finishLoadingTickets());
  } catch (error) {
    dispatch(getTicketsFailure(error.message));
    dispatch(finishLoadingTickets());
  }
};
