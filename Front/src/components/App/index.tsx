import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../../components/HomePage';
import SignUpPage from '../../components/SignUpPage';
import LoginPage from '../LoginPage';
import Yugioh from '../../components/Yugioh';
import ContactPage from "../ContactPage";
import PasswordResetPage from "../PasswordResetPage";
import TeamPage from "../TeamPage";
import SearchResultPage from "../SearchResultPage";

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
    path: "/login",
    element: <LoginPage />
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
    path: "/search-result",
    element: <SearchResultPage/>,
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
