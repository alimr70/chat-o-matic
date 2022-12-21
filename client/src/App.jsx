import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import "./index.css";
import Chat from "./Chat";

const App = () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Chat />
  </MantineProvider>
);

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
