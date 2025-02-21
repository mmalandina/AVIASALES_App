import {
  SET_SEARCH_ID,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAILURE,
  SHOW_MORE_TICKETS,
  TOGGLE_CHECKBOXES,
  SET_FILTER_TICKETS,
  START_LOADING_TICKETS,
  FINISH_LOADING_TICKETS,
} from "./actions";

const initialState = {
  searchId: "",
  tickets: [],
  visibleTickets: 5,
  loadingTickets: false,
  error: null,
  checkboxes: {
    all: true,
    noStops: true,
    oneStop: true,
    twoStops: true,
    threeStops: true,
  },
  filterTickets: "optimal",
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ID:
      return { ...state, searchId: action.payload };

    case GET_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      };

    case GET_TICKETS_FAILURE:
      return { ...state, error: action.payload };

    case SHOW_MORE_TICKETS:
      return { ...state, visibleTickets: state.visibleTickets + 5 };

    case TOGGLE_CHECKBOXES: {
      if (action.payload === "all") {
        const newValue = !state.checkboxes.all;
        return {
          ...state,
          checkboxes: {
            all: newValue,
            noStops: newValue,
            oneStop: newValue,
            twoStops: newValue,
            threeStops: newValue,
          },
        };
      }
      const newCheckboxes = {
        ...state.checkboxes,
        [action.payload]: !state.checkboxes[action.payload],
      };
      const { noStops, oneStop, twoStops, threeStops } = newCheckboxes;
      newCheckboxes.all = noStops && oneStop && twoStops && threeStops;
      return {
        ...state,
        checkboxes: newCheckboxes,
      };
    }

    case SET_FILTER_TICKETS:
      return { ...state, filterTickets: action.payload };

    case START_LOADING_TICKETS:
      return { ...state, loadingTickets: true };

    case FINISH_LOADING_TICKETS:
      return { ...state, loadingTickets: false };

    default:
      return state;
  }
};

export default ticketsReducer;
