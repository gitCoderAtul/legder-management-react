import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  
import appRouter from './Routing';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';


import { 
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);

 
