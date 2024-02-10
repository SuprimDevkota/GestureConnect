import App from "./App.tsx";
import "./index.css";

import store from "./store";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

store.subscribe(() => console.log(store.getState()));
