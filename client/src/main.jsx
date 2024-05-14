import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './Views/HomePage'
import GraphSelection from './Views/GraphSelection'
import GraphDisplay from './Views/GraphDisplay'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/countries", element: <GraphSelection /> },
  { path: "/graphs", element: <GraphDisplay /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
