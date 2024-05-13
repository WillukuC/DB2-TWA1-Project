import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './HomePage'
import GraphSelection from './GraphSelection'
import GraphDisplay from './GraphDisplay'
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
