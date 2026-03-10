import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AppProvider } from './hooks/AppContext';
import './index.css'

const Main = () => (
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)