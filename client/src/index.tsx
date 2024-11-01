import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import {Header} from './features/header/header.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        element: <div>app</div>
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
