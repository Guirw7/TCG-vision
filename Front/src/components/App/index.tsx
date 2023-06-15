import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../../components/HomePage';
import SignUpPage from '../../components/SignUpPage';
import SignInPage from '../../components/SignInPage';
import Yugioh from '../../components/Yugioh';
import ContactPage from "../ContactPage";
import PasswordResetPage from "../PasswordResetPage";
import TeamPage from "../TeamPage";

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
    path: "/reset-password",
    element: <PasswordResetPage />
  },
  {
    path: "/signin",
    element: <SignInPage />
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/team",
    element: <TeamPage />,
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
};
