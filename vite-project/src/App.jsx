import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login and Signup/Login.jsx";
import Signup from "./Components/Login and Signup/Signup.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/Home",
      element: <Home />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
