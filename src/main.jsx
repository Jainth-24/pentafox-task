import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task1 from "./Task1/index.jsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/task" element={<Task1 />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </QueryClientProvider>
);
