import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import SideNav from "./features/aside/aside";
import Content from "./features/content/content";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/:id?",
        element: (
          <>
            <div className="lg:block fixed w-[20.2666rem] inset-0 z-20  top-[3.8125rem] left-[max(0px,calc(50%-48rem))] right-auto pb-10 pl-8 pr-6 overflow-y-auto">
              <SideNav />
            </div>
            <div className="lg:pl-[20.8rem]">
              <main className="relative z-20 max-w-3xl pt-10 xl:max-w-none  h-[calc(100vh-61px)] overflow-y-auto">
                <Content />
              </main>
            </div>
          </>
        ),
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
