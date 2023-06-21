import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";



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
import ErrorPage from "../ErrorPage";

/*-- Routers --*/

/* Méthode 6.4 mais qui ne fonctionne pour pour la redirection
______________________________________________________________
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
  },
  {
    path: "*",
    element: <ErrorPage />
  },
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

*/

export default function App() {
  return (
    <>
    <Header />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    <Footer />
    </>
  )
};

