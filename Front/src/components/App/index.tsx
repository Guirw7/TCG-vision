import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../../components/HomePage';
import SignUpPage from '../../components/SignUpPage';
import Yugioh from '../../components/Yugioh';

/*-- Routers --*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    //page temporaire:
    path: "/cards",
    element: <Yugioh />,
  }
]);

export default function App() {
  return (
    <>
    <Header />
    <RouterProvider router={router} />
    <Footer />
    </>
  )
}