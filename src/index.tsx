import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";

import App from "./App";

const rootElement: HTMLElement = document.getElementById("root") ?? document.createElement('div');
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
