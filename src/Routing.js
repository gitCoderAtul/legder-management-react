import React from 'react'
import {
    createBrowserRouter, 
  } from "react-router-dom"; 
import Users from './components/userdetails/Users'; 
import AddDetails from './components/userdetails/AddDetails';
import App from './App';
import MainComponent from './components/MainComponent';
import ParticularsComp from './components/particular/ParticularsComp';
import SearchDetails from './components/search/SearchDetails';
  
 

  const appRouter = createBrowserRouter([
     
    {
        path: "/",
        element: <App />, 
        children: [
            {path:"" , element:<MainComponent />},  
            {path:"add-user" , element:<Users />},   
            {path:"add-details" , element:<AddDetails />},  
            {path:"add-particular" , element:<ParticularsComp/>},  
            {path:"search-details" , element:<SearchDetails/>},  
        ],
      },
    ]);
 

export default appRouter