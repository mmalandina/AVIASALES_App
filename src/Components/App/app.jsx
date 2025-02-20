import { Provider } from "react-redux";
import store from "../../Store/store";
import Checkboxes from "../Checkboxes";
import TicketsFilter from "../TicketsFilter";
import TicketsList from "../TicketsList";
import ShowMore from "../ShowMore";
import "./app.scss";

export default function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="header">
          <img src="/Logo.svg" alt="Logo" className="logo" />
        </header>
        <main className="main">
          <div className="checkboxes-wrap">
            <Checkboxes />
          </div>
          <div className="tickets-wrap">
            <TicketsFilter />
            <TicketsList />
            <ShowMore />
          </div>
        </main>
      </div>
    </Provider>
  );
}
