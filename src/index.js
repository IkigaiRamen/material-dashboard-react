
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { ContextStore } from './ContextStore';
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
  <ContextStore>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
    </ContextStore>
  </BrowserRouter>,
  document.getElementById("root")
);
