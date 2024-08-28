// This file is the entry point for the React application, 
// where the root component is rendered into the DOM.



import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AppProvider } from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// This line renders the React application 
// into the div with the ID root in the HTML document.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // This component is a wrapper that helps detect potential issues 
  // in an application by running additional checks and warnings during development.
  <React.StrictMode>

    {/* This wraps the entire application, providing global state management 
    using the custom context and reducer from store.tsx.*/}
    <AppProvider>

      {/* This component provides routing functionality in the application, 
      enabling navigation between different pages. */}
      <BrowserRouter>
        
        {/* The Routes component from React Router 
        is used to define the application's route hierarchy. */}
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
)
