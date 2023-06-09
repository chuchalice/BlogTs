import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { setupStore } from "./store/index";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root") as HTMLElement;
const store = setupStore();
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
